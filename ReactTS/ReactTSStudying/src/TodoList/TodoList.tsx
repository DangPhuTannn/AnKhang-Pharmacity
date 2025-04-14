import { Grid2 } from "@mui/material";
import "./todoList.css";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useReducer, useRef, useState } from "react";

type Todo = {
  id: number;
  title: string;
  nameMember: string;
  date: string;
  isDone: boolean;
};

type Action =
  | { type: "add"; payload: Todo }
  | { type: "delete"; payload: { id: number } }
  | { type: "done"; payload: { id: number } };
const initialState: Todo[] = [];

const formatterVN = new Intl.DateTimeFormat("vi-VN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          isDone: false,
          nameMember: action.payload.nameMember,
          date: action.payload.date,
        },
      ];
    case "delete":
      return [...state].filter((eachTodo) => eachTodo.id != action.payload.id);
    case "done":
      return [...state].map((eachTodo) =>
        action.payload.id == eachTodo.id
          ? { ...eachTodo, isDone: !eachTodo.isDone }
          : { ...eachTodo }
      );
    default:
      return [...state];
  }
};

export default function TodoList() {
  const [todoList, dispatch] = useReducer(reducer, initialState);
  const countId = useRef(1);
  const [title, setTitle] = useState("");
  const [member, setMember] = useState("");
  const [date, setDate] = useState("");
  const handleAdd = () => {
    if (
      !title ||
      title.trim().length == 0 ||
      !member ||
      member.trim().length == 0 ||
      !date ||
      date.trim().length == 0
    ) {
      alert("You have to write something!!!");
      return;
    }
    dispatch({
      type: "add",
      payload: {
        id: countId.current,
        title,
        nameMember: member,
        date: formatterVN.format(new Date(date)).replace(/\//g, "."),
        isDone: false,
      },
    });
    countId.current += 1;
    setTitle("");
    setMember("");
    setDate("");
  };
  const handleDelete = (id: number) => {
    dispatch({
      type: "delete",
      payload: { id },
    });
  };

  const handleDone = (id: number) => {
    dispatch({
      type: "done",
      payload: { id },
    });
  };

  return (
    <div className="TodoContainer">
      <div className="storeTitle">
        <div className="titleTodo">
          <h2>My To Do List</h2>
        </div>
        <Grid2 container>
          <Grid2 size={3}>
            <input
              type="text"
              className="inputTodo"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </Grid2>
          <Grid2 size={3}>
            <input
              type="text"
              className="inputTodo"
              placeholder="Member..."
              value={member}
              onChange={(e) => setMember(e.target.value)}
            ></input>
          </Grid2>
          <Grid2 size={3}>
            <input
              type="date"
              className="inputTodo"
              placeholder="Member..."
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </Grid2>
          <Grid2 size={3}>
            <div className="buttonTodo" onClick={handleAdd}>
              Add
            </div>
          </Grid2>
        </Grid2>
      </div>
      <ul className="listTodo">
        {todoList.map(({ id, title, isDone, nameMember, date }) => (
          <li
            className={`eachTodo ${isDone && "isDone"}`}
            onClick={() => handleDone(id)}
            key={id}
          >
            {isDone && <DoneIcon className="doneIcon" />}
            {`${title} - ${nameMember} - ${date}`}
            <CloseIcon className="closeIcon" onClick={() => handleDelete(id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
