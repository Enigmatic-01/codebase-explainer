from rag.v_store import get_vectorstore_for_user

def get_semantic_search(data):
    query = data["query"]
    
    vector_store = get_vectorstore_for_user(data["user_id"])
    retriever = vector_store.as_retriever(k=2)
    context = retriever.invoke(query)
    context = "\n\n".join(doc.page_content for doc in context)
    return {"context":context,"history":data["history"],"query":query,"tool_enabled":data["tool_enabled"]}

