from langchain_community.document_loaders import GithubFileLoader
from flask import session
from rag.clean import clean_docs
from dotenv import load_dotenv
import os

load_dotenv()

def fetch_repo(data):
    repo = data["repo"]
    branch = data["branch"]
    
    loader = GithubFileLoader(
        repo=repo,
        branch=branch,
        access_token=os.getenv("ACCESS_TOKEN"),
        recursive=True, 
        file_filter=lambda path: "readme" in path.lower()

    )
    documents = loader.load()
    return {"documents":documents,"user_id":data["user_id"]}


# from flask import session
# from langchain_community.document_loaders import GithubFileLoader

# # get user token from session
# user_token = session.get('github_oauth_token')

# if user_token:
#     loader = GithubFileLoader(
#         repo="Enigmatic-01/Ai-Agent",
#         branch="main",
#         access_token=user_token,  # 👈 user token here
#         recursive=True,
#         file_filter=lambda path: "readme" in path.lower()
#     )

#     documents = loader.load()
#     print(documents)
# else:
#     # user not logged in
#     print("User is not authenticated with GitHub")
