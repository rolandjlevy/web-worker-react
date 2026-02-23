// this web worker listens for messages containing a function as a string and its payload,
// executes the function, and posts the result back to the main thread

self.onmessage = (event) => {
  const { fnString, payload } = event.data;
  try {
    const fn = new Function(`return (${fnString})`)();
    const result = fn(payload);
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
