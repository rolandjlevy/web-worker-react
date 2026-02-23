import { useEffect, useRef, useState } from 'react';

export function useWorker(workerUrl) {
  const workerRef = useRef(null);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!workerUrl || typeof workerUrl !== 'string') {
        throw new Error('Invalid worker URL');
      }
      workerRef.current = new Worker(workerUrl, { type: 'module' });
      workerRef.current.onmessage = (event) => {
        const { result, error } = event.data;
        setRunning(false);
        if (error) {
          setError(error);
        } else {
          setResult(result);
        }
      };
      workerRef.current.onerror = (e) => {
        setRunning(false);
        setError('Worker failed to load: ' + e.message);
      };
    } catch (e) {
      setError(e.message);
      setRunning(false);
    }
    return () => workerRef.current && workerRef.current.terminate();
  }, [workerUrl]);

  const run = (fn, payload) => {
    setError(null);
    setResult(null);
    setRunning(true);
    try {
      workerRef.current.postMessage({
        fnString: fn.toString(),
        payload,
      });
    } catch (e) {
      setRunning(false);
      setError('Failed to post message to worker: ' + e.message);
    }
  };

  return { run, result, running, error };
}
