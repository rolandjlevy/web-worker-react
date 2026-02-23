import { useWorker } from "./hooks/useWorker";
import data from "./largeData.json";

function transformData(records) {
  const start = performance.now();
  const result = records
    .filter((r) => r.price > 10)
    .map((r) => ({ ...r, priceWithVAT: r.price * 1.2 }))
    .reduce((acc, r) => acc + r.priceWithVAT, 0);
  while (performance.now() - start < 1500) {}
  return result;
}

export default function App() {
  const { run, result, error, isRunning } = useWorker(transformData);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Web Worker Demo (CodeSandbox)</h1>

      <button className="btn" onClick={() => run(data)}>
        {isRunning ? "Processing…" : "Process JSON"}
      </button>

      <p>Result: {result ?? "No result yet"}</p>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <input
        style={{ padding: "5px" }}
        placeholder="Try typing while processing…"
      />
    </div>
  );
}
