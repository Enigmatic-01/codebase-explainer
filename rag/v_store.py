from langchain_chroma import Chroma
from rag.models import embedding_model as embeddings
from dotenv import load_dotenv

from config.config_chroma_db import chroma_client

load_dotenv()


def get_vectorstore_for_user(user_id: str):
    """
    Create or load a Chroma vectorstore for a specific user.
    This runs ONLY when user_id is available.
    """
    uid = user_id or "demo_user"

    

    vectorstore = Chroma(
        client=chroma_client,
        collection_name=user_id,
        embedding_function=embeddings,
    )
   

    
    return vectorstore