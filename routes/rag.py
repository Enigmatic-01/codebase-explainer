from flask import Flask, request, Response, jsonify,Blueprint
from rag.pipelines import query_result
rag = Blueprint(import_name=__name__,name="rag")



@rag.route("/query", methods=["POST"])
def query_stream():
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "Missing 'query'"}), 400

    query = data["query"]
    history = data.get("history", [])
    tool_enabled = data.get("tool_enabled", False)
    print(tool_enabled)
    user_id=data["user_id"]
    def event_stream():
        try:
            for chunk in query_result({
                "query": query,
                "history": history,
                "tool_enabled": tool_enabled,
                "user_id":user_id
            }):
                if hasattr(chunk, "content") and chunk.content:
                    # SSE format
                    yield f"data: {chunk.content}\n\n"

            # Signal completion
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
