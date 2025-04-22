
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("Application initialization started");

// Add global error handler with more detailed logging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  console.error('Error message:', event.error?.message);
  console.error('Error stack:', event.error?.stack);
});

// Add unhandled promise rejection handler with more detailed logging
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  console.error('Rejection message:', event.reason?.message);
  console.error('Rejection stack:', event.reason?.stack);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find the root element');
  document.body.innerHTML = '<div style="color: red; margin: 20px; font-family: sans-serif;"><h2>Critical Error</h2><p>Failed to find root element. Please check your HTML structure.</p></div>';
  throw new Error('Failed to find the root element');
}

// Wrap the initialization in a try-catch block to capture any errors
try {
  console.log("Attempting to render React app");
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log("React app successfully mounted");
} catch (error) {
  console.error("Failed to render React app:", error);
  // Display detailed error to user
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="color: red; margin: 20px; font-family: sans-serif;">
        <h2>Application Error</h2>
        <p>Sorry, the application failed to load. Please try refreshing the page.</p>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
        <details>
          <summary>Error Details</summary>
          <pre>${error instanceof Error ? error.stack : 'No stack trace available'}</pre>
        </details>
      </div>
    `;
  }
}
