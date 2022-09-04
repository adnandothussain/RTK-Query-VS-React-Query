import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAddTodoMutation } from "../../services/api/todos.service";
import { useCallback } from "react";

type NewTodoInputProps = {};

export const NewTodoInput: FC<NewTodoInputProps> = () => {
  const [newTodo, setNewTodo] = useState("");
  const [addTodo] = useAddTodoMutation();

  const onSumbit = useCallback(
    (e: any) => {
      e.preventDefault();
      addTodo({
        title: newTodo,
        userId: 1,
      });
    },
    [newTodo]
  );

  return (
    <form onSubmit={onSumbit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit" disabled={!newTodo.trim().length}>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
};
