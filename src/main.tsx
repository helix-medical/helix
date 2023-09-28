import { createRoot } from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import * as serviceWorkerRegistration from './config/service-worker-registration';
import Helix from './helix';

// disable console.log in production
if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<Helix />);

// PWA Service Worker
serviceWorkerRegistration.register();
