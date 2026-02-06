from flask import request, Response, jsonify, Blueprint
from rag.rag_pipelines import query_result
from config.supabase_config import supabase

rag = Blueprint("rag", __name__, url_prefix="/repotalks/rag")



@rag.route("/query", methods=["POST"])
def post_query():
    """
    Save the user's query message and return chat_id.
    """
    data = request.get_json()
    if not data or "query" not in data or "user_id" not in data:
        return jsonify({"error": "Missing 'query' or 'user_id'"}), 400

    query = data["query"]
    user_id = data["user_id"]
    chat_id = data.get("chat_id")

    # Create chat if it doesn't exist
    if not chat_id:
        chat_res = supabase.table("chat").insert({
            "user_id": user_id,
            "title": query[:50]  # use first 50 chars as title
        }).execute()
        chat_id = chat_res.data[0]["chat_id"]

    # Save user's message
    supabase.table("message").insert({
        "chat_id": chat_id,
        "role": "user",
        "content": query
    }).execute()

    return jsonify({"chat_id": chat_id})

@rag.route("/query", methods=["GET"])
def query_stream():
    chat_id = request.args.get("chat_id")
    user_id = request.args.get("user_id")

    if not chat_id or not user_id:
        return "Missing chat_id or user_id", 400

    # Load conversation history from DB
    history_res = supabase.table("message") \
        .select("*") \
        .eq("chat_id", chat_id) \
        .order("created_at", desc=False) \
        .execute()
    history = history_res.data
    user_messages = [m for m in history if m["role"] == "user"]
    query = user_messages[-1]["content"] if user_messages else ""


    
    user_messages = [m for m in history if m["role"] == "user"]
    query = user_messages[-1]["content"] if user_messages else ""
    

    def event_stream():

        ai_response = ""
        try:
            for chunk in query_result({
                "query": query,
                "history": history,
                "tool_enabled": False,
                "chat_id": chat_id
            }):
                
                if hasattr(chunk, "content") and chunk.content:
                    ai_response += chunk.content
                    yield f"data: {chunk.content}\n\n"

            # Save AI response to DB
            supabase.table("message").insert({
                "chat_id": chat_id,
                "role": "ai",
                "content": ai_response
            }).execute()

            yield "event: end\ndata: [DONE]\n\n"

        except Exception as e:
            yield f"event: error\ndata: {str(e)}\n\n"

    return Response(
        event_stream(),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
