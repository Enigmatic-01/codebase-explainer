from flask import Blueprint, request, jsonify, session
from config.supabase_config import supabase
from rag.rag_pipelines import embedd_data

chat = Blueprint("chat", __name__, url_prefix="/api/chats")


from urllib.parse import urlparse

def extract_owner_repo(url: str) -> str:
    """
    Extracts 'owner/repo' from a GitHub URL.
    """
    parsed = urlparse(url)
    parts = parsed.path.strip("/").split("/")

    if len(parts) < 2:
        raise ValueError("Invalid GitHub repository URL")

    owner, repo = parts[0], parts[1]
    return f"{owner}/{repo}"


@chat.route("", methods=["GET"])
def list_chats():
    if "user" not in session:
        return jsonify([])

    user_id = session["user"]["id"]

    res = (
        supabase.table("chat")
        .select("chat_id, title, url, created_at")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    # Frontend expects id
    return jsonify([
        {
            "id": c["chat_id"],
            "url": c["url"],
            "title": c["title"]
        }
        for c in res.data
    ])

@chat.route("", methods=["POST"])
def create_chat():
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    user_id = session["user"]["id"]
    data = request.get_json()

    url = extract_owner_repo(data.get("url"))
    branch = data.get("branch")
    print(branch)
    chat_res = supabase.table("chat").insert({
        "user_id": user_id,
        "url": url,
        "title": url.split("/")[-1][:15]
    }).execute()

    chat = chat_res.data[0]

    # Optional RAG embedding
    embedd_data({
        "repo": url,
        "branch":branch,
        "user_id": str(user_id)
    })
    print(url)

    return jsonify({
        "id": chat["chat_id"],
        "url": chat["url"],
        "title": chat["title"]
    })


@chat.route("/<chat_id>", methods=["GET"])
def get_chat(chat_id):
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    chat = (
        supabase.table("chat")
        .select("chat_id, url, title")
        .eq("chat_id", chat_id)
        .single()
        .execute()
    ).data

    messages = (
        supabase.table("message")
        .select("role, content")
        .eq("chat_id", chat_id)
        .order("created_at")
        .execute()
    ).data

    return jsonify({
        "id": chat["chat_id"],
        "url": chat["url"],
        "messages": [
            {"role": m["role"], "text": m["content"]}
            for m in messages
        ]
    })

@chat.route("/<chat_id>", methods=["DELETE"])
def delete_chat(chat_id):
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    supabase.table("chat").delete().eq("chat_id", chat_id).execute()
    return jsonify({"status": "deleted"})


@chat.route("/<chat_id>/messages", methods=["POST"])
def add_message(chat_id):
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400

    supabase.table("message").insert({
        "chat_id": chat_id,
        "role": "user",
        "content": text
    }).execute()

    return jsonify({"status": "ok"})