from langchain_chroma import Chroma
from rag.rag_models import embedding_model as embeddings
from dotenv import load_dotenv

from config.chroma_config import chroma_client

load_dotenv()


def get_vector_store_for_user(chat_id: str):
    """
    Create or load a Chroma vectorstore for a specific user.
    This runs ONLY when user_id is available.
    """
    

    

    vectorstore = Chroma(
        client=chroma_client,
        collection_name=chat_id,
        embedding_function=embeddings,
    )
   

    
    return vectorstore