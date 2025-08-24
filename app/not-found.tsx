export default function NotFound() {
    return (
      <main style={{ padding: "4rem", textAlign: "center" }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/auth" style={{ color: "#0070f3" }}>
          Go to Login
        </a>
      </main>
    );
  }