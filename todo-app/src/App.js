import "./App.css";
import TodoItemPage from "./TodoItemPage";
import { useQuery } from "@tanstack/react-query";

function App() {
  const response = useQuery({
    queryKey: ["/todo-item/all"]
  })

  console.debug('response : ', response);
  return (
    <>

    <br/>
    
    <br/>
    
    <br/>
        <br/>
    <div>Hello World!</div>
    </>
  
);
}

export default App;
