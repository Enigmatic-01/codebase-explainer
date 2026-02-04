from rag.rag_vector_store import get_vector_store_for_user

def get_semantic_search(data):
    query = data["query"]
    
    vector_store = get_vector_store_for_user(data["chat_id"])
    retriever = vector_store.as_retriever(k=2)
    context = retriever.invoke(query)
    context = "\n\n".join(doc.page_content for doc in context)
    return {"context":context,"history":data["history"],"query":query,"tool_enabled":data["tool_enabled"]}

