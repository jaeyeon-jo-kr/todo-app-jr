import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function parseQuery(){
  const queryStr = document.location.search
  const paramStrs = queryStr.substring(1).split('&');
  console.debug(paramStrs)
  const resultMap = {}
  paramStrs.forEach((paramStr) => {
    const [key, val] = paramStr.split('=')
    resultMap[key] = val
  })

  return resultMap
}

function parsePath(){
  return document.location.pathname.split('/',30).slice(1).map(str=> '/'+str)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const paths = parsePath()
const query = parseQuery()
root.render(
  <React.StrictMode>
    <App paths={paths} query={query}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
