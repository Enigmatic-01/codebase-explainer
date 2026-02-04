from flask import Flask, request, Response, jsonify,Blueprint
from rag.rag_pipelines import embed_repo
chat = Blueprint(import_name=__name__,name="chat")



chat.route("")
def new_chat():
    data = request.get_json()
    staust = embed_repo(data)
    return staust

chat.route("")
def load_chat():
    