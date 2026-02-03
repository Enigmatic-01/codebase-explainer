from rag.fetch import fetch_repo
from rag.clean import clean_docs
from rag.embbed import emmbed_repo
from langchain_core.runnables import RunnableLambda
embed_pipeline = RunnableLambda(fetch_repo)|RunnableLambda(clean_docs)|RunnableLambda(emmbed_repo)
result =  embed_pipeline.invoke({"repo":"Enigmatic-01/Rag-Service-Api","branch":"main","user_id":"12345"})
print(result)