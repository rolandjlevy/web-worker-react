import { useEffect, useRef, useState } from "react";

export function useWorker(workerUrl) {
  const workerRef = useRef(null);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    workerRef.current = new Worker(workerUrl, { type: "module" });

    workerRef.current.onmessage = (event) => {
      const { result, error } = event.data;
      setRunning(false);
      if (error) setError(error);
      else setResult(result);
    };

    return () => workerRef.current.terminate();
  }, [workerUrl]);

  const run = (fn, payload) => {
    setRunning(true);
    setError(null);
    setResult(null);

    workerRef.current.postMessage({
      fnString: fn.toString(),
      payload,
    });
  };

  return { run, result, running, error };
}
