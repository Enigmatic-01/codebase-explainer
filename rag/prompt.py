from langchain_core.prompts import (
    HumanMessagePromptTemplate,
    MessagesPlaceholder
)
from langchain_classic.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage

prompt = ChatPromptTemplate.from_messages([
    SystemMessage(content="""
You are a helpful assistant.

RULES:
- Use the provided context as the primary source of truth.
- If the context fully answers the question, answer using only the context.
- If the context is partially relevant or insufficient, you may use your general knowledge to complete the answer.
- If tool usage is enabled, you may use tool-provided information when needed.
- Do NOT hallucinate facts. If you are unsure, say so clearly.
- Prefer clarity and correctness over brevity.
"""),
    MessagesPlaceholder(variable_name="history"),
    HumanMessagePromptTemplate.from_template("""
Context:
{context}

Tool usage enabled: {tool_enabled}

Question:
{query}
""")
])