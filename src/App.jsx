import { useWorker } from './hooks/useWorker';
import data from './largeData.json';
import './App.css';

function transformData(records) {
  const start = performance.now();
  const result = records
    .filter((r) => r.price > 50)
    .map((r) => ({ ...r, priceWithVAT: r.price * 1.2 }))
    .reduce((acc, r) => acc + r.priceWithVAT, 0);
  // Artificial delay: 5 seconds
  while (performance.now() - start < 5000) {}
  return result;
}

export default function App() {
  const workerUrl = new URL('./workers/generic.worker.js', import.meta.url)
    .href;
  const { run, result, running, error } = useWorker(workerUrl);

  return (
    <main
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: 20,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Web Worker Demo (CodeSandbox)</h1>

      <p>
        The result represents the sum of the prices (with VAT added) for all
        items in largeData.json where the price is greater than &pound;50.
      </p>

      <button className="btn" onClick={() => run(transformData, data)}>
        {running ? (
          <>
            Processing… <div className="loader" aria-label="Loading" />
          </>
        ) : (
          'Process JSON'
        )}
      </button>

      <p>
        Result: {result !== null ? `£${result.toFixed(2)}` : 'No result yet'}
      </p>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <input
        style={{ padding: '5px' }}
        placeholder="Try typing while processing…"
      />
    </main>
  );
}
