<h1>Backend - Codebase Explainer / RepoTalks</h1>

<p>The <strong>backend</strong> of Codebase Explainer is built with <strong>Flask</strong> and provides the API for:</p>
<ul>
<li>User authentication via GitHub OAuth</li>
<li>Repository chat management</li>
<li>Repository tree visualization</li>
<li>RAG-powered query of repository contents</li>
</ul>

<p>It connects with the React frontend via REST APIs and handles all secure operations.</p>

<hr>

<h2>Project Structure</h2>
<pre>
backend/
├── app.py               <!-- Flask application factory -->
├── wsgi.py              <!-- WSGI entry for production servers -->
├── routes/              <!-- Flask Blueprints for auth, chat, RAG -->
│   ├── auth.py
│   ├── chat.py
│   └── rag.py
├── extensions.py        <!-- Extensions (DB, CORS, etc.) -->
├── config/              <!-- Configuration files -->
│   └── config.py
├── requirements.txt     <!-- Python dependencies -->
└── .env                 <!-- Environment variables (not committed) -->
</pre>

<hr>

<h2>Dependencies</h2>
<p>Install backend dependencies using:</p>
<pre><code>pip install -r requirements.txt</code></pre>

<ul>
<li>Flask</li>
<li>Flask-CORS</li>
<li>Gunicorn</li>
<li>GitHub-Flask</li>
<li>Supabase</li>
<li>OpenAI, LangChain, Chroma</li>
<li>RAG pipelines for repository data</li>
</ul>

<hr>

<h2>Environment Variables</h2>
<p>Create a <code>.env</code> file in <code>backend/</code> with:</p>
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

<hr>

<h2>Run Locally</h2>
<p>Development mode:</p>
<pre><code>
cd backend
export FLASK_APP=app:create_app
export FLASK_ENV=development
flask run --port 5000
</code></pre>

<p>Production using Gunicorn:</p>
<pre><code>gunicorn wsgi:app</code></pre>

<hr>

<h2>API Endpoints</h2>
<table>
<thead>
<tr>
<th>Feature</th>
<th>Endpoint</th>
<th>Method</th>
</tr>
</thead>
<tbody>
<tr><td>Get all chats</td><td>/repotalks/chats</td><td>GET</td></tr>
<tr><td>Create chat</td><td>/repotalks/chats</td><td>POST</td></tr>
<tr><td>Get repo tree</td><td>/repotalks/chats/&lt;chat_id&gt;/tree</td><td>GET</td></tr>
<tr><td>GitHub OAuth login</td><td>/repotalks/auth/login</td><td>GET</td></tr>
<tr><td>GitHub OAuth callback</td><td>/repotalks/auth/github-callback</td><td>GET</td></tr>
</tbody>
</table>

<hr>

<h2>GitHub OAuth Integration</h2>
<ol>
<li>Create a GitHub OAuth App:</li>
<ul>
<li>Homepage URL: <code>http://localhost:3000</code></li>
<li>Authorization callback URL: <code>http://localhost:5000/repotalks/auth/github-callback</code></li>
</ul>
<li>Store credentials in <code>.env</code> or Render environment variables.</li>
<li>Frontend will redirect to <code>/auth/login</code> to start OAuth flow.</li>
</ol>

<hr>

<h2>Deployment on Render</h2>
<p>Backend deployment configuration:</p>
<ul>
<li>Root Directory: <code>backend/</code></li>
<li>Language: Python 3</li>
<li>Build Command: <code>pip install -r requirements.txt</code></li>
<li>Start Command: <code>gunicorn wsgi:app</code></li>
<li>Port: default (Render assigns automatically)</li>
<li>Environment variables: same as <code>.env</code></li>
</ul>

<hr>

<h2>Common Issues</h2>
<ul>
<li>Login issues after deployment: Ensure <code>SESSION_COOKIE_SECURE=True</code> in production and callback URLs match deployed URLs</li>
<li>API 401 Unauthorized: Check GitHub OAuth credentials and session handling</li>
<li>CORS errors: Ensure <code>Flask-CORS</code> is configured to allow frontend origin</li>
</ul>

<hr>

<h2>Summary</h2>
<p>
Backend framework: Flask<br>
Responsibilities: OAuth login, repository chat, tree visualization, RAG queries<br>
Dev URL: http://localhost:5000<br>
Deployment: Gunicorn on Render or any Python server<br>
Connected to: React frontend via REST API
</p>
