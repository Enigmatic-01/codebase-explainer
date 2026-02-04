from langchain_openai import OpenAIEmbeddings,ChatOpenAI
from dotenv import load_dotenv
from rag.rag_tools import web_search
load_dotenv()

embedding_model = OpenAIEmbeddings()
base_llm = ChatOpenAI(
    temperature=0
)

def get_llm(tool_enabled):
    if tool_enabled:
        return base_llm.bind_tools([web_search])
    return base_llm