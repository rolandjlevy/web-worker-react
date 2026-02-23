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
