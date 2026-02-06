<h1>Codebase Explainer / RepoTalks - Frontend</h1>

<p>The <strong>frontend</strong> of Codebase Explainer (RepoTalks) is built with <strong>React + Vite</strong>. It provides the user interface for authentication, repository chats, and interactive repository visualization.</p>

<hr>

<h2>Project Structure</h2>
<pre>
frontend/
├── public/                 <!-- Static assets -->
│   └── favicon.ico
├── src/
│   ├── assets/             <!-- Images, icons, styles -->
│   ├── components/         <!-- React components -->
│   │   ├── Chat/
│   │   ├── RepoTree/
│   │   └── Auth/
│   ├── pages/              <!-- React pages -->
│   │   ├── Home.jsx
│   │   ├── RepoChat.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   ├── main.jsx            <!-- Entry point -->
│   └── api/                <!-- Backend API utils -->
├── index.html
├── package.json
├── vite.config.js
└── ...
</pre>

<hr>

<h2>Dependencies</h2>
<ul>
<li>React</li>
<li>Vite</li>
<li>React Router DOM</li>
<li>Axios / Fetch</li>
<li>Tailwind CSS (optional)</li>
<li>Chakra UI / Material UI (optional)</li>
</ul>

<p>Install dependencies:</p>
<pre><code>npm install</code></pre>

<hr>

<h2>Environment Variables</h2>
<p>Create a <code>.env</code> file in <code>frontend/</code>:</p>
<pre><code>
VITE_FRONT_API=http://localhost:5000/repotalks
</code></pre>
<p><strong>Note:</strong> Vite requires env variables to start with <code>VITE_</code> to expose them to the frontend.</p>

<hr>

<h2>Run Locally</h2>
<pre><code>
cd frontend
npm run dev
</code></pre>
<p>Frontend runs at <strong>http://localhost:3000</strong> and connects to backend APIs at <strong>http://localhost:5000/repotalks</strong>.</p>

<h2>Build for Production</h2>
<pre><code>
npm run build
</code></pre>
<p>Output folder: <code>frontend/dist/</code></p>

<hr>

<h2>GitHub OAuth Integration</h2>
<ol>
<li>Redirect users to backend login: <code>window.location.href = `${FRONT_API}/auth/login`</code></li>
<li>Backend redirects to frontend after login with session token.</li>
<li>Store session (cookie/localStorage) for authenticated API calls.</li>
</ol>

<p>Required OAuth App settings:</p>
<ul>
<li>Homepage URL: <code>http://localhost:3000</code></li>
<li>Authorization callback URL: <code>http://localhost:5000/repotalks/auth/github-callback</code></li>
</ul>

<hr>

<h2>API Interaction</h2>
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

<h2>Routing Example</h2>
<pre><code>
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RepoChat from './pages/RepoChat';
import Login from './pages/Login';

function App() {
  return (
    &lt;Router&gt;
    &lt;Routes&gt;
      &lt;Route path="/" element=&lt;Home /&gt; /&gt;
      &lt;Route path="/chat/:id" element=&lt;RepoChat /&gt; /&gt;
      &lt;Route path="/login" element=&lt;Login /&gt; /&gt;
    &lt;/Routes&gt;
    &lt;/Router&gt;
  );
}

export default App;
</code></pre>

<hr>

<h2>Deployment</h2>
<ul>
<li>Build frontend: <code>npm run build</code></li>
<li>Deploy <code>frontend/dist/</code> to static hosting (Render, Netlify, Vercel)</li>
<li>Set <code>VITE_FRONT_API</code> to point to deployed backend</li>
<li>Ensure CORS is configured on backend to allow frontend origin</li>
</ul>

<hr>

<h2>Common Issues</h2>
<ul>
<li>404 after deployment: Check <code>dist</code> is set as publish directory</li>
<li>API 401 Unauthorized: Verify session storage and backend OAuth credentials</li>
<li>Environment variables not applied: Ensure <code>VITE_</code> prefix is used and dev server is restarted</li>
</ul>

<hr>

<h2>Summary</h2>
<p>
Frontend framework: React + Vite<br>
Responsibilities: OAuth login, repo selection, chat UI, tree visualization, API calls<br>
Dev URL: http://localhost:3000<br>
Build output: frontend/dist/<br>
Deployment: Static hosting connecting to Flask backend
</p>
