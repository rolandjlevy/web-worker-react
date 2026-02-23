# Web Workers demo

> This project demonstrates how to use Web Workers in a React application to handle heavy computations without blocking the main UI thread.

> The `useWorker()` hook runs expensive functions in a background thread via `generic.worker.js`, keeping the app responsive even with large data.

### About Web Workers

> Web Workers are a browser feature that lets JavaScript run in background threads, separate from the main UI thread. They allow you to run expensive or long‑running code without freezing the page.

- Web Workers are:  
  background threads in the browser that run JavaScript off the main UI thread so heavy work doesn’t freeze the page.

- They exist because:  
  JavaScript is single‑threaded and the main thread handles everything (rendering, layout, input, JS execution).

- Their purpose is:  
  to stop the browser from freezing, lagging, dropping frames, or ignoring user input when CPU‑heavy tasks run.

- They work by:  
  running code in a separate thread and communicating with the main thread using message passing (postMessage / onmessage).

- They solve the problem of:  
  long‑running or expensive JavaScript blocking the UI and making the page feel unresponsive.

- Their limitations are:  
  they cannot access the DOM, cannot use window or document, cannot share variables with the main thread, and must communicate via messages.

- You should use them when:
  a task takes more than ~50ms, processes large data, performs heavy loops or math, or would otherwise block the UI.

### Links

- Working example in [codesandbox](https://codesandbox.io/p/github/rolandjlevy/web-worker-react/main)
- Web Workers explained in [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- How to use Web Workers [dev.to article](https://dev.to/aaron_rose_0787cc8b4775a0/the-secret-life-of-javascript-the-clone-2k1l)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
