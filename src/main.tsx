import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Note: StrictMode is intentionally omitted; React 18's double-invoke in dev
// causes WebGL contexts to mount/unmount twice, which destabilizes R3F canvases.
createRoot(document.getElementById('root')!).render(<App />);
