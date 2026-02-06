import os
from flask import Blueprint, request, jsonify, session
from config.supabase_config import supabase
from rag.rag_pipelines import embedd_data
import requests
from urllib.parse import urlparse


chat = Blueprint("chat", __name__, url_prefix="/repotalks/chats")




def fetch_repo_tree(owner_repo: str, branch: str = "main"):
    """
    Fetch recursive repo tree from GitHub API
    """
    owner, repo = owner_repo.split("/")

    url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"

    headers = {
        "Accept": "application/vnd.github+json"
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception(f"GitHub API error: {response.text}")

    data = response.json()

    # Only keep relevant fields to reduce size
    simplified_tree = [
        {
            "path": item["path"],
            "type": item["type"],  # blob or tree
            "size": item.get("size")
        }
        for item in data.get("tree", [])
    ]

    return simplified_tree


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
    branch = data.get("branch", "main")

    # 🔥 Fetch repo tree
    try:
        repo_tree = fetch_repo_tree(url, branch)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    # Save chat + repo tree
    chat_res = supabase.table("chat").insert({
        "user_id": user_id,
        "url": url,
        "title": url.split("/")[-1][:15]
    }).execute()

    chat = chat_res.data[0]

    supabase.table("repo_tree").insert({
        "chat_id": chat["chat_id"],
        "tree": repo_tree
    }).execute()


    # Optional RAG embedding
    embedd_data({
        "repo": url,
        "branch": branch,
        "chat_id": chat["chat_id"]
    })

    return jsonify({
        "id": chat["chat_id"],
        "url": chat["url"],
        "title": chat["title"],
        
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
        .select("role, content, message_id")
        .eq("chat_id", chat_id)
        .order("created_at")
        .execute()
    ).data

    return jsonify({
        "id": chat["chat_id"],
        "url": chat["url"],
        "title": chat["title"],
        
        "messages": [
            {
                "role": m["role"],
                "text": m["content"],
                "msg_id": m["message_id"]
            }
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

@chat.route("/<chat_id>/tree", methods=["GET"])
def get_chat_tree(chat_id):
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    repo = (
        supabase.table("repo_tree")
        .select("tree")
        .eq("chat_id", chat_id)
        .single()
        .execute()
    )
   
    
    if not repo.data:
        return jsonify({"error": "Tree not found"}), 404

    return jsonify({
        "chat_id": chat_id,
        "structure": repo.data["tree"]
    })
