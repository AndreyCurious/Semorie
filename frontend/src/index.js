import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root')); // eslint-disable-line
  root.render(await init());
};

app();