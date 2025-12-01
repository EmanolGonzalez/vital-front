import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setAccessToken } from './lib/apiClient'

// Dev helper: if a token is provided via Vite env, set it automatically for local development.
// Use `ilumina_token` as the canonical localStorage key so AuthContext picks it up.
const devToken = import.meta.env.VITE_DEV_TOKEN as string | undefined;
if (devToken && devToken.length > 0) {
	setAccessToken(devToken);
	try { localStorage.setItem('ilumina_token', devToken); } catch {}
} else {
	// If token was stored in localStorage (manually pasted), apply it to api client
	try {
		// support legacy key 'token' as well
		const stored = localStorage.getItem('ilumina_token') ?? localStorage.getItem('token');
		if (stored) setAccessToken(stored);
	} catch {}
}

createRoot(document.getElementById("root")!).render(<App />);
