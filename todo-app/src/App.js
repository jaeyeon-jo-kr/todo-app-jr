import "./App.css";
import TodoItemPage from "./TodoItemPage";


function App({paths, query}) {
  const [head, ...tail] = paths
  switch(head){
    case "/todo":
      return (<TodoItemPage paths={tail} query={query}/>)
    default:
      return (<></>);
  }
  
}

export default App;
