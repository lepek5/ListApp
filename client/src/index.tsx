import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const lista = ReactDOM.createRoot(
  document.getElementById('lista') as HTMLElement
);
lista.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </React.StrictMode>
);