from rag.rag_data_fetchers import fetch_data
from rag.rag_text_cleaner import clean_docs
from rag.rag_embeddig import embedd_repo
from langchain_core.runnables import RunnableLambda
from rag.rag_retrievers import get_semantic_search
from rag.rag_models import  get_llm
from rag.rag_prompts import prompt as raw_prompt
from langchain_core.messages import ToolMessage
from rag.rag_tools import web_search

# result =  embed_pipeline.invoke({"repo":"Enigmatic-01/Rag-Service-Api","branch":"main","user_id":"12345"})


def embedd_data(data):
    embed_pipeline = RunnableLambda(fetch_data)|RunnableLambda(clean_docs)|RunnableLambda(embedd_repo)
    return embed_pipeline.invoke(data)
    

def handle_tool_call(response):
    tool_messages = []

    for call in response.tool_calls:
        if call["name"] == "web_search":
            result = web_search.invoke(call["args"]["query"])

            tool_messages.append(
                ToolMessage(
                    tool_call_id=call["id"],
                    content=result
                )
            )

    return tool_messages

def query_result(data):
    model = get_llm(data["tool_enabled"])
   
    base_chain = (
        RunnableLambda(get_semantic_search)
        | raw_prompt
    )

    messages = base_chain.invoke(data)
    response = model.invoke(messages)
   
    if response.tool_calls:
        tool_messages = handle_tool_call(response)

        
        final_stream = model.stream(
            [response, *tool_messages]
        )
        return final_stream

    return model.stream(messages)
# for chunk in query_result({
#     "query": "What is the use of langchain in his repo?",
#     "history": [],
#     "tool_enabled": False,
#     "user_id":"12345"
# }):
#     print(chunk.content, end="", flush=True)

        
        



