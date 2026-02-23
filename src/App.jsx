import { useWorker } from './hooks/useWorker';
import data from './largeData.json';
import './App.css';

// This function will be stringified and sent to the worker
function transformData(records) {
  const start = performance.now();
  const result = records
    .filter((r) => r.price > 50)
    .map((r) => ({ ...r, priceWithVAT: r.price * 1.2 }))
    .reduce((acc, r) => acc + r.priceWithVAT, 0);
  // Artificial delay: 3 seconds
  while (performance.now() - start < 3000) {}
  return result;
}

export default function App() {
  const workerUrl = new URL('./workers/generic.worker.js', import.meta.url)
    .href;
  const { run, result, running, error } = useWorker(workerUrl);

  return (
    <main className="main">
      <h1>Demo showing the use of a Web Worker</h1>
      <p>
        This component uses a Web Worker to calculate the sum of prices for
        items over £50 in a 20,000-record dataset. Offloading the computation
        keeps the UI responsive, so you can interact with the app while
        processing runs in the background. Here is an example record from the
        dataset:
      </p>

      <pre className="code">{JSON.stringify(data[0], null, 2)}</pre>

      <button className="btn" onClick={() => run(transformData, data)}>
        {running ? (
          <div className="processing">
            Processing… <div className="loader" aria-label="Loading" />
          </div>
        ) : (
          'Process JSON'
        )}
      </button>

      <p>
        Result:{' '}
        {!!result
          ? `${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(result.toFixed(2))}`
          : 'pending'}
      </p>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <input
        style={{ padding: '5px', fontSize: '16px', width: '300px' }}
        placeholder="Try typing while processing..."
      />
    </main>
  );
}
