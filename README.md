<h1>Codebase Explainer / RepoTalks</h1>

<!-- Project Image -->
<img src="https://res.cloudinary.com/dw7njmzdl/image/upload/v1770372299/kxs0f42be5dltyu3jrdq.png" alt="Project Screenshot" width="600">

<p><strong>Codebase Explainer</strong> (also called <strong>RepoTalks</strong>) is a full-stack web application that allows users to explore GitHub repositories interactively. Users can authenticate via GitHub, create repository-specific chats, visualize repo structure, and query contents with AI-powered insights.</p>

<p>Check it live here: <a href="https://codebase-explainer-1.onrender.com/" target="_blank">https://codebase-explainer-1.onrender.com/</a></p>

<hr>

<h2>Project Structure</h2>
<pre>
codebase-explainer/
├── backend/               &lt;!-- Flask backend API --&gt;
├── frontend/              &lt;!-- React + TypeScript + Vite frontend --&gt;
├── README.md              &lt;!-- This file --&gt;
└── .gitignore
</pre>

<hr>

<h2>Features</h2>
<ul>
  <li>GitHub OAuth login: Secure authentication</li>
  <li>Repository chat: Create chats tied to repositories</li>
  <li>Tree visualization: Explore repository structure interactively</li>
  <li>RAG-powered insights: AI-driven repository queries</li>
  <li>Monorepo-friendly: Separate frontend and backend deployments</li>
</ul>

<hr>

<h2>Tech Stack</h2>
<ul>
  <li>Backend: Flask, Gunicorn, Supabase, OpenAI, LangChain, Chroma</li>
  <li>Frontend: React, TypeScript, Vite, Tailwind CSS</li>
  <li>Deployment: Render (Python + Static Site)</li>
  <li>Authentication: GitHub OAuth</li>
</ul>

<hr>

<h2>Setup Instructions</h2>

<h3>1. Clone the repository</h3>
<pre><code>git clone https://github.com/Enigmatic-01/codebase-explainer.git
cd codebase-explainer</code></pre>

<h3>2. Backend Setup</h3>
<pre><code>cd backend
pip install -r requirements.txt</code></pre>

<p>Create a <code>.env</code> file in <code>backend/</code> with your credentials:</p>
<pre><code>
SECRET_KEY=your_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/repotalks/auth/github-callback
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
CHROMA_API_KEY=your_chroma_key
CHROMA_TENANT=your_chroma_tenant
CHROMA_DATABASE=your_chroma_database
FRONT_API=http://localhost:3000
</code></pre>

<p>Run backend locally:</p>
<pre><code>export FLASK_APP=app:create_app
export FLASK_ENV=development
flask run --port 5000</code></pre>

<p>Production with Gunicorn:</p>
<pre><code>gunicorn wsgi:app</code></pre>

<h3>3. Frontend Setup</h3>
<pre><code>cd ../frontend
npm install
</code></pre>

<p>Create <code>.env</code> in frontend:</p>
<pre><code>VITE_FRONT_API=http://localhost:5000/repotalks</code></pre>

<p>Run frontend dev server:</p>
<pre><code>npm run dev</code></pre>

<p>Build frontend for production:</p>
<pre><code>npm run build</code></pre>

<hr>

<h2>Deployment</h2>
<p>The project is currently deployed on Render:</p>
<ul>
  <li>Live Link: <a href="https://codebase-explainer-1.onrender.com/" target="_blank">https://codebase-explainer-1.onrender.com/</a></li>
  <li>Backend: Flask + Gunicorn</li>
  <li>Frontend: React + Vite (static site)</li>
</ul>

<hr>

<h2>License</h2>
<p>MIT License © Amritpritpal Singh</p>
