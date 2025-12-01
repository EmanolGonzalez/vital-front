import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setAccessToken } from './lib/apiClient'

// Dev helper: if a token is provided via Vite env, set it automatically for local development.
// Use `ilumina_token` as the canonical localStorage key so AuthContext picks it up.
const devToken = import.meta.env.VITE_DEV_TOKEN as string | undefined;
if (devToken && devToken.length > 0) {
	// For dev only: set token in memory (do not persist to localStorage)
	setAccessToken(devToken);
} else {
	// no persistent token by default in memory-only mode
}

createRoot(document.getElementById("root")!).render(<App />);
