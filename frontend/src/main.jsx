import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './output.css'

// Add Debug Log
console.log('Current API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Unregister Service Worker if it exists (to fix caching issues)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
    }).catch(error => {
        console.error(error.message);
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
