import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Routes';
import './index.css'
import AuthProvider from './AuthProvider/AuthProvider';
import { QueryClient,  QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from '../ThemeContext';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider> {/* ThemeProvider যোগ করা হলো */}
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
