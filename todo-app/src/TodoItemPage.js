import {
  Children,
  useEffect,
  useReducer,
  useState,
  createContext
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onSubmitItemChange, onSubmitItemDelete, onFetchItemsLoad, onSubmitItemAdd } from "./TodoItems";

const IsEnabledContext = createContext(true);

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
      return action.items;
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
          const result = onChangeTask({ ...item, title: event.target.value });
          console.debug(result);
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

function Description({ item, onChangeTask }) {
  const [description, setDescription] = useState(item.description);
  console.debug("show description", item);
  useEffect(() => {
    setDescription(item.description);
  }, [item.description]);

  return (
    <>
      <label htmlFor={"desc-" + item.id}>Todo Description</label>
      <br />
      <textarea
        id={"desc-" + item.id}
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={description}
      ></textarea>
      <br />
      <input
        type="button"
        value="Save"
        onClick={(e) => {
          onChangeTask({ ...item, description });
        }}
      ></input>
    </>
  );
}

function Details({ item, detailActivated, onChangeTask }) {
  return detailActivated ? (
    <>
      <br />
      <Description item={item} onChangeTask={onChangeTask}></Description>
    </>
  ) : (
    <></>
  );
}

function Item({ item, onChangeTask, onDeleteTask, editFocus, setEditFocus }) {
  const [detailActivated, setDetailActivated] = useState(false);

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
      <input
        type="button"
        value={detailActivated ? "▲" : "▼"}
        onClick={() => setDetailActivated(!detailActivated)}
      ></input>
      <input
        type="button"
        value="delete"
        // class="delete-button"
        onClick={() => onDeleteTask(item)}
      ></input>
      <Details
        item={item}
        detailActivated={detailActivated}
        onChangeTask={onChangeTask}
      ></Details>
    </>
  );
}

function ItemList({ items, onChangeTask, onDeleteTask }) {
  const [editFocus, setEditFocus] = useState(null);

  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id} id={"item-" + item.id}>
            <Item
              item={item}
              onChangeTask={onChangeTask}
              onDeleteTask={onDeleteTask}
              editFocus={editFocus}
              setEditFocus={setEditFocus}
            />
          </li>
        );
      })}
    </ul>
  );
}

function WrapLoadingScreen({ children, isLoading }) {
  return isLoading ? (
    <div className="block-screen" inert="true">
      {Children.only(children)}
    </div>
  ) : (
    Children.only(children)
  );
}

function ItemAdd({ handleAddItem }) {
  const [newTitle, setNewTitle] = useState("");
  function onSuccess(item){
    return (result) => {
      const newItem = {...item, id:result}
      handleAddItem(newItem)
    }
  }
  function afterError(error){
    console.error(error);
  }

  return (
    <>
      <input type="text" 
        onChange={(e) => setNewTitle(e.target.value)} />
      <input
        type="button"
        value="Add todo item"
        onClick={(e) => {
          const newItem = { title: newTitle, toggled: false };
          onSubmitItemAdd(
            {item:newItem,
              onSuccess:onSuccess(newItem),
              onError:afterError});
        }}
      />
    </>
  );
}

function TodoItemBody() {
  const [items, dispatch] = useReducer(itemReducer, []);
  const [isLoading, setIsLoading] = useState(false);

  function handleInitItems(items) {
    dispatch({ type: "initialized", items: items });
    setIsLoading(false);
  }
  function handleAddItem(item) {
    dispatch({ type: "added", item: item });
  }

  function handleChangeItem(item) {
    onSubmitItemChange({item})
    dispatch({ type: "changed", item: item });
  }
  function handleDeleteItem(item) {
    onSubmitItemDelete({item});
    dispatch({ type: "deleted", item: item });
  }
  function handleClearItems() {
    dispatch({ type: "cleared" });
  }
  useEffect(()=> {
    setIsLoading(true);
    onFetchItemsLoad({onSuccess: handleInitItems})
  },[])


  return (
    <>
      <h1>Todo Item test</h1>
      <ItemAdd handleAddItem={handleAddItem} />
      <br />
      {isLoading ? (
        <div>now Loading...</div>
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

function TodoItemPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IsEnabledContext.Provider value={!isLoading}>
      <WrapLoadingScreen isLoading={isLoading}>
        <TodoItemBody isLoading={isLoading} setIsLoading={setIsLoading} />
      </WrapLoadingScreen>
    </IsEnabledContext.Provider>
  );
}

export default TodoItemPage;
