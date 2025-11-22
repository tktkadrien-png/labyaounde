"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
          <h2>Something went wrong!</h2>
          <p>{error.message}</p>
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
