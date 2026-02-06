<h1>Codebase Explainer / RepoTalks</h1>

<img src="https://photos.app.goo.gl/gMhaLpGNNyBNxCqm9" alt="Project Screenshot" width="600">

<p><strong>Codebase Explainer</strong> (also called <strong>RepoTalks</strong>) is a full-stack monorepo web application that allows users to:</p>

<ul>
  <li>Authenticate via GitHub OAuth</li>
  <li>Connect to GitHub repositories</li>
  <li>Create chat sessions for repositories</li>
  <li>Visualize repository structure as an interactive tree</li>
  <li>Query repository contents with RAG-powered insights (AI-assisted)</li>
</ul>

<p>The repo contains a <strong>Flask backend</strong> and a <strong>React + TypeScript + Vite frontend</strong>.</p>

<hr>

<h2>Project Structure</h2>
<pre>
codebase-explainer/
├── backend/               &lt;!-- Flask backend API --&gt;
├── frontend/              &lt;!-- React + Vite frontend --&gt;
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

<p>Create a <code>.env</code> file in <code>backend/</code>:</p>
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
npm install</code></pre>

<p>Create <code>.env</code> in <code>frontend/</code>:</p>
<pre><code>VITE_FRONT_API=http://localhost:5000/repotalks</code></pre>

<p>Run frontend dev server:</p>
<pre><code>npm run dev</code></pre>

<p>Build for production:</p>
<pre><code>npm run build</code></pre>

<hr>

<h2>Deployment</h2>

<h3>Backend (Render)</h3>
<ul>
  <li>Root Directory: <code>backend</code></li>
  <li>Build Command: <code>pip install -r requirements.txt</code></li>
  <li>Start Command: <code>gunicorn wsgi:app</code></li>
  <li>Environment variables: Same as <code>.env</code></li>
</ul>

<h3>Frontend (Render / Static Site)</h3>
<ul>
  <li>Root Directory: <code>frontend</code></li>
  <li>Build Command: <code>npm install && npm run build</code></li>
  <li>Publish Directory: <code>dist/</code></li>
  <li>Environment variable: <code>VITE_FRONT_API</code> pointing to deployed backend</li>
</ul>

<hr>

<h2>GitHub OAuth Setup</h2>
<ol>
  <li>Create a GitHub OAuth App:
    <ul>
      <li>Homepage URL: <code>http://localhost:3000</code></li>
      <li>Authorization callback URL: <code>http://localhost:5000/repotalks/auth/github-callback</code></li>
    </ul>
  </li>
  <li>Store credentials in <code>.env</code> (backend) or Render environment variables.</li>
  <li>Frontend will redirect to <code>/auth/login</code> to start OAuth flow.</li>
</ol>

<hr>

<h2>Common Issues</h2>
<ul>
  <li>Login issues: Ensure <code>SESSION_COOKIE_SECURE=True</code> in production and callback URLs match deployed URLs.</li>
  <li>Frontend 404: Ensure publish directory (<code>frontend/dist</code>) is correct.</li>
  <li>API 401 Unauthorized: Check GitHub OAuth credentials and session handling.</li>
</ul>

<hr>

<h2>Quick Start Summary</h2>
<ol>
  <li>Clone repo</li>
  <li>Setup backend and frontend</li>
  <li>Run backend (<code>localhost:5000</code>) and frontend (<code>localhost:3000</code>)</li>
  <li>Login via GitHub and start creating repo chats</li>
  <li>Deploy backend and frontend on Render or another hosting provider</li>
</ol>

<hr>

<h2>License</h2>
<p>MIT License © Amritpritpal Singh</p>
