export default function Home() {
  return (
    <main>
      <h1>Speak Credible API</h1>
      <p>This project exposes two endpoints:</p>
      <ul>
        <li><code>GET /api/ping</code> — health check</li>
        <li><code>POST /api/analyze</code> — accepts <code>multipart/form-data</code> with a <code>file</code> field and returns JSON</li>
      </ul>
    </main>
  );
}
