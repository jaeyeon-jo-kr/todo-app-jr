import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.tsx';
import TodoItemPage from "./TodoItemPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/todo",
    element:<TodoItemPage/>
  }
]);

const queryClient = new QueryClient(
  {
    defaultOptions:{
      queries:{
        queryFn: async ({queryKey : [url]}) =>{
          const result = await axios.get('http://localhost:8080/api'+ url)
          console.debug(result)
          return result;
        }
      }
    }
  }
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
