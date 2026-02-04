from langchain_community.document_loaders import GithubFileLoader
from flask import session
from rag.rag_text_cleaner import clean_docs
from dotenv import load_dotenv
import os
from flask import session
from langchain_community.document_loaders import GithubFileLoader

load_dotenv()

def fetch_data(data):
    
    user_token = session.get('github_oauth_token')
    if user_token:
        repo = data["repo"]
        branch = data["branch"]
        
        loader = GithubFileLoader(
            repo=repo,
            branch=branch,
            recursive=True, 
            access_token=user_token, 
            
            file_filter=lambda path: "readme" in path.lower()

        )
        documents = loader.load()
        return {"documents":documents,"chat_id":data["chat_id"]}
    else:
    # user not logged in
        print("User is not authenticated with GitHub")


