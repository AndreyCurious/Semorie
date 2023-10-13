import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import "./index.css"

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line
  root.render(await init());
};

app();