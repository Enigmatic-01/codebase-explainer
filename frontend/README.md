<h1>Frontend - Codebase Explainer / RepoTalks</h1>

<p>The <strong>frontend</strong> of Codebase Explainer is built with <strong>React + TypeScript + Vite</strong>. It provides the UI for authentication, repository chats, and interactive repository visualization.</p>

<hr>

<h2>Project Structure</h2>
<pre>
frontend/
├── components/          <!-- React components (Chat, RepoTree, Auth, etc.) -->
├── .env                 <!-- Environment variables for Vite -->
├── .gitignore           <!-- Git ignore rules -->
├── App.tsx              <!-- Main app component, routes setup -->
├── README.md            <!-- Frontend README -->
├── index.css            <!-- Global styles -->
├── index.html           <!-- HTML entry point -->
├── index.tsx            <!-- React DOM entry point -->
├── metadata.json        <!-- Optional metadata for project / repo -->
├── package-lock.json    <!-- NPM lock file -->
├── package.json         <!-- NPM dependencies & scripts -->
├── tailwind.config.js   <!-- Tailwind CSS configuration -->
├── treeBuilder.ts       <!-- Logic to build repo tree structure -->
├── tsconfig.json        <!-- TypeScript configuration -->
├── types.ts             <!-- TypeScript type definitions -->
├── vite-env.d.ts        <!-- Vite environment definitions -->
├── vite.config.ts       <!-- Vite config file -->
└── render.yaml          <!-- Render deployment configuration -->
</pre>

<hr>

<h2>Dependencies</h2>
<ul>
<li>React + TypeScript</li>
<li>Vite (fast dev server and build tool)</li>
<li>Tailwind CSS (utility-first CSS framework)</li>
<li>React Router DOM (routing)</li>
<li>Axios or Fetch API (backend communication)</li>
</ul>

<p>Install dependencies:</p>
<pre><code>npm install</code></pre>

<hr>

<h2>Environment Variables (.env)</h2>
<p>Create a <code>.env</code> file in <code>frontend/</code>:</p>
<pre><code>
VITE_FRONT_API=http://localhost:5000/repotalks
</code></pre>
<p><strong>Note:</strong> Vite requires environment variables to start with <code>VITE_</code> to expose them to the frontend.</p>

<hr>

<h2>Running the Frontend Locally</h2>
<pre><code>
npm run dev
</code></pre>
<p>Frontend runs at <strong>http://localhost:3000</strong> and connects to backend APIs at <strong>http://localhost:5000/repotalks</strong>.</p>

<hr>

<h2>Build for Production</h2>
<pre><code>
npm run build
</code></pre>
<p>Output folder: <code>frontend/dist/</code></p>

<hr>

<h2>Routing and App Component</h2>
<p>The <code>App.tsx</code> file sets up routing between pages:</p>
<pre><code>
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RepoChat from './components/RepoChat';
import Login from './components/Login';

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

<h2>Repository Tree Logic</h2>
<p>The <code>treeBuilder.ts</code> file contains logic for converting repository files/folders into an interactive tree view used in the UI.</p>

<hr>

<h2>TypeScript Support</h2>
<ul>
<li><code>tsconfig.json</code>: TypeScript compiler options</li>
<li><code>vite-env.d.ts</code>: Vite environment type definitions</li>
<li><code>types.ts</code>: Custom TypeScript types for repo data, chats, and API responses</li>
</ul>

<hr>

<h2>Tailwind CSS</h2>
<p>Configured in <code>tailwind.config.js</code> to provide utility classes for responsive, modern UI design.</p>

<hr>

<h2>Deployment (Render)</h2>
<p>The frontend is configured for deployment with <code>render.yaml</code>:</p>
<ul>
<li>Build command: <code>npm install && npm run build</code></li>
<li>Publish directory: <code>dist/</code></li>
<li>Environment variables: <code>VITE_FRONT_API</code> pointing to deployed backend</li>
</ul>

<hr>

<h2>Common Issues</h2>
<ul>
<li>404 after deployment: Ensure <code>dist/</code> is set as publish directory</li>
<li>API 401 Unauthorized: Verify session storage and backend OAuth credentials</li>
<li>Environment variables not applied: Ensure <code>VITE_</code> prefix and restart dev server</li>
</ul>

<hr>

<h2>Summary</h2>
<p>
Frontend framework: React + TypeScript + Vite<br>
Responsibilities: OAuth login, repo selection, chat UI, tree visualization, API calls<br>
Dev URL: http://localhost:3000<br>
Build output: frontend/dist/<br>
Deployment: Static hosting (Render) connecting to Flask backend
</p>
