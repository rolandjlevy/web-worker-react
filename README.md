# Web Workers Demo

This project demonstrates how to use Web Workers in a React application to handle heavy computations without blocking the main UI thread.

## Why Use Web Workers?

JavaScript runs on a single thread, so heavy computations can freeze the UI and make your app unresponsive. Web Workers solve this by running code in a background thread, keeping the UI smooth and interactive.

## How This Project Works

- The `useWorker()` hook provides an easy way for React components to offload expensive computations to a Web Worker (`generic.worker.js`).
- Functions and data are sent to the worker, which processes them in the background and returns results asynchronously.
- This approach is especially useful for processing large datasets or running CPU-intensive tasks.

## When to Use Web Workers

Use Web Workers when:

- A task takes more than ~50ms
- You need to process large data
- You perform heavy loops or math
- You want to avoid blocking the UI

## How Web Workers Work

- Web Workers are background threads in the browser.
- They communicate with the main thread using message passing (`postMessage` / `onmessage`).
- They cannot access the DOM, `window`, or `document`, and cannot share variables with the main thread.

## Limitations

- No access to DOM or browser APIs like `window` or `document`
- Communication is only via messages
- Cannot share variables directly with the main thread

## Useful Links

- [Working example in CodeSandbox](https://codesandbox.io/p/github/rolandjlevy/web-worker-react/main)
- [Web Workers explained (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [How to use Web Workers (dev.to)](https://dev.to/aaron_rose_0787cc8b4775a0/the-secret-life-of-javascript-the-clone-2k1l)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) (uses Babel for Fast Refresh)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) (uses SWC for Fast Refresh)
