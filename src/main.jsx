import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/base.css';
import './styles/sections.css';
import './styles/story.css';
import './styles/night.css';
import './styles/features.css';
import './styles/studio.css';
import './styles/end.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
