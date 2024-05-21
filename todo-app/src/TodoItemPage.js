import { useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "./util";

const api_url = "http://localhost:8080/api/todo-item";

async function submitItemAdd(item) {
  const formData = new FormData();
  formData.append("title", item.title);
  formData.append("toggled", false);
  return await fetch(api_url + "/new", { method: "POST", body: formData })
    .then((result) => {
      console.debug("submit new data result : ", result);
      return result.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
    });
}

function submitItemDelete(item) {
  const formData = new FormData();
  formData.append("id", item.id);
  fetch(api_url + "/delete", { method: "POST", body: formData })
    .then((result) => {
      console.debug("delete success");
    })
    .catch((result) => {
      console.debug(result);
    });
}

function submitItemChange(item) {
  const formData = new FormData();
  formData.append("id", item.id);
  formData.append("title", item.title);
  formData.append("description", item.description);
  formData.append("toggled", item.toggled);
  fetch(api_url + "/update", { method: "POST", body: formData })
    .then((result) => {
      console.debug("update success");
    })
    .catch((result) => {
      console.debug(result);
    });
}

async function loadItems() {
  const items = fetch(api_url + "/all")
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
  return await items;
}

function itemReducer(items, action) {
  switch (action.type) {
    case "added": {
      if (items.find((item) => item.id === action.item.id)) {
        return items;
      } else {
        return [
          ...items,
          {
            ...action.item,
            id: action.item.id,
          },
        ];
      }
    }
    case "changed": {
      return items.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        } else {
          return item;
        }
      });
    }
    case "deleted": {
      return items.filter((item) => item.id !== action.item.id);
    }
    case "cleared": {
      return [];
    }
    case "initialized": {
      const initItems = loadItems();
      console.debug("init item : ", initItems);
      return initItems;
    }
    default:
      throw Error("unknown action" + action.type);
  }
}

function EditedTitle({ item, setEditFocus, onChangeTask }) {
  return (
    <input
      type="text"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setEditFocus(null);
          onChangeTask({ ...item, title: event.target.value });
        }
      }}
      onBlur={() => setEditFocus(null)}
      defaultValue={item.title}
      size={16}
      maxLength={16}
    ></input>
  );
}

function UntoggledItemTitle({ item, setEditFocus }) {
  return (
    <div
      className="untoggled-item"
      onClick={() => {
        setEditFocus(item.id);
      }}
      id="title"
    >
      {item.title}
    </div>
  );
}
function ToggledItemTitle({ item, setEditFocus }) {
  return (
    <label
      htmlFor={"item-" + item.id}
      className="toggled-item"
      onClick={() => {
        console.debug("set edit focus : ", item.id);
        setEditFocus(item.id);
      }}
      id="title"
    >
      <s>{item.title}</s>&nbsp;✔
    </label>
  );
}

function NotEditedTitle({ item, setEditFocus }) {
  return item.toggled ? (
    <ToggledItemTitle item={item} setEditFocus={setEditFocus} />
  ) : (
    <UntoggledItemTitle item={item} setEditFocus={setEditFocus} />
  );
}

function ItemTitle({ item, onChangeTask, editFocus, setEditFocus }) {
  return editFocus === item.id ? (
    <EditedTitle
      item={item}
      setEditFocus={setEditFocus}
      onChangeTask={onChangeTask}
    />
  ) : (
    <NotEditedTitle item={item} setEditFocus={setEditFocus} />
  );
}

function toDateTimeLocalString(datetime) {
  const year = datetime.getFullYear();
  const month = datetime.getMonth();
  const date1 = datetime.getDate();
  const hour = datetime.getHours();
  const minute = datetime.getMinutes();
  const monthStr = (month < 10 ? "0" : "") + month;
  const date1Str = (date1 < 10 ? "0" : "") + date1;
  const hourStr = (hour < 10 ? "0" : "") + hour;
  const minuteStr = (minute < 10 ? "0" : "") + minute;
  return (
    year + "-" + monthStr + "-" + date1Str + "T" + hourStr + ":" + minuteStr
  );
}

function Alarm() {
  const [alarmTime, setAlarmTime] = useState(toDateTimeLocalString(new Date()));

  useEffect(() => {
    let time = toDateTimeLocalString(new Date());
    setAlarmTime(time);
  }, []);

  return (
    <input
      type="datetime-local"
      value={alarmTime}
      onChange={(e) => {
        setAlarmTime(e.target.value);
      }}
    ></input>
  );
}

function Description({item, onChangeTask}){
  const [description, setDescription] = useState(item.description)
  console.debug('show description', item)
  useEffect(()=>{
    setDescription(item.description)
  }, [item.description])

  return <>
  <label htmlFor={"desc-" + item.id}>Todo Description</label>
  <br/>
  <textarea id={"desc-" + item.id} 
  onChange={e => setDescription(e.target.value)}
  defaultValue={description}
  ></textarea>
  <br/>
  <input type="button" value="Save"
  onClick={e => {onChangeTask({...item, description})}}
  ></input>
  </>
}

function Details({item, detailActivated, onChangeTask}){
   return detailActivated? (<><br/>
   <Description item={item} onChangeTask={onChangeTask}></Description></>) : <></>;
}



function Item({ item, onChangeTask, onDeleteTask, editFocus, setEditFocus }) {
  const [detailActivated,setDetailActivated] = useState(false);
  
  return (
        <>
        <input
        id={"toggle-" + item.id}
        type="checkbox"
        checked={item.toggled}
        onChange={(e) => {
          console.debug("change toggle item", item.toggled);
          setEditFocus(null);
          onChangeTask({ ...item, toggled: !item.toggled });
        }}
        value={item.title}
      ></input>
      <ItemTitle
        item={item}
        onChangeTask={onChangeTask}
        editFocus={editFocus}
        setEditFocus={setEditFocus}
      ></ItemTitle>
      <input type="button" value={detailActivated?"▲":"▼"}
      onClick={() => setDetailActivated(!detailActivated)}></input>
      <input
        type="button"
        value="delete"
        // class="delete-button"
        onClick={() => onDeleteTask(item)}
      ></input>
      <Details item={item} detailActivated={detailActivated} onChangeTask={onChangeTask}></Details>
      </>
  );
}

function ItemList({ items, onChangeTask, onDeleteTask }) {
  const [editFocus, setEditFocus] = useState(null);
  
  return (
    <ul>
      {items.map((item) =>
      {return (
        <li key={item.id} id={"item-" + item.id}>
            <Item item={item} onChangeTask={onChangeTask} onDeleteTask={onDeleteTask} editFocus={editFocus} setEditFocus={setEditFocus}/>
         </li>)})}
    </ul>
  );
}

function OnError({error}){
  useEffect(()=>{
    toast("There is an error.")
  },[error])
  return (<ToastContainer/>)
}

function TodoItemPage(){
    const [items, dispatch] = useReducer(itemReducer, []);
    const [newTitle, setNewTitle] = useState("");
    const { isLoading, error, result } = useFetch(api_url + "/all");
    function handleAddItem(item) {
      dispatch({ type: "added", item: item });
    }
  
    function handleChangeItem(item) {
      submitItemChange(item);
      dispatch({ type: "changed", item: item });
    }
    function handleDeleteItem(item) {
      submitItemDelete(item);
      dispatch({ type: "deleted", item: item });
    }
    function handleClearItems() {
      dispatch({ type: "cleared" });
    }
  
    useEffect(() => {
      handleClearItems();
      if (result) {
        result.json().then((result) => 
            {console.debug('load item', result);
            result.map(handleAddItem)});
      }
      return () => handleClearItems();
    }, [result]);
    //const {isLoading, result, error} = useFetch(api_url + "/all");
  
  
    return (
      <>
        <h1>Todo Item test</h1>
        <input
          type="text"
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
        ></input>
        <input
          type="button"
          value="Add todo item"
          onClick={(e) => {
            submitItemAdd({ title: newTitle, toggled: false }).then((id) =>
              handleAddItem({
                id: id,
                title: newTitle,
                toggled: false,
              })
            );
          }}
        ></input>
        <br />
        {isLoading ? (
          <div>now Loading...</div>
        ) : error ? (
          <OnError error={error}/>
        ) : (
          <ItemList
            items={items}
            onChangeTask={handleChangeItem}
            onDeleteTask={handleDeleteItem}
          />
        )}
      </>
    );
}

export default TodoItemPage;