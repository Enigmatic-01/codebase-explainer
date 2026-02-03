import re
from langchain_core.runnables import RunnableLambda
from langchain_core.documents import Document

def clean_text_fn(text) :
    """
    Cleans text by:
    - removing newlines
    - removing emojis
    - removing special characters
    """
    if not text:
        return ""

    # 1. Remove newlines and extra spaces
    text = text.replace("\n", " ").replace("\r", " ").strip()

    # 2. Remove emojis
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"
        "\U0001F300-\U0001F5FF"
        "\U0001F680-\U0001F6FF"
        "\U0001F1E0-\U0001F1FF"
        "\U00002700-\U000027BF"
        "\U0001F900-\U0001F9FF"
        "\U00002600-\U000026FF"
        "\U00002B00-\U00002BFF"
        "]+",
        flags=re.UNICODE
    )
    text = emoji_pattern.sub("", text)

    # 3. Remove all special characters except letters, numbers, and spaces
    text = re.sub(r"[^A-Za-z0-9 ]+", "", text)

    # 4. Collapse multiple spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()


clean_text = RunnableLambda(clean_text_fn)



def clean_docs(data):
    documents = data["documents"]
    clean_data = []

    for doc in documents:
        path = doc.metadata.get("path")
        print(f"Processing: {path}")

        content = clean_text.invoke(doc.page_content)

        if not content:
            continue

        folder = "/".join(path.split("/")[:-1]) if path else None

        clean_data.append(
            Document(
                page_content=content,
                metadata={
                    "path": path,
                    "folder": folder,
                    "repo": doc.metadata.get("repo"),
                    "branch": doc.metadata.get("branch"),
                }
            )
        )

    return {"documents":clean_data,"user_id":data["user_id"]}
