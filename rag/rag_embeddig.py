from uuid import uuid4
from rag.rag_vector_store import get_vectorstore_for_user

def embedd_repo(data):
    vectorstore=  get_vectorstore_for_user(data["user_id"])
    uuids = [str(uuid4()) for _ in range(len(data["documents"]))]
    try:
        vectorstore.add_documents(documents=data["documents"], ids=uuids)
        return {"status":"successfull"}
    except Exception as e:
        return {"status":e}
        
        