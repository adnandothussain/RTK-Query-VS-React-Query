// add imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useGetTodosQuery } from "../../services/api/todos.servie";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const { isLoading, data, isError, error, isSuccess } = useGetTodosQuery();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //addTodo
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
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
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  // Define conditional content
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error as any}</p>;
  } else if (isSuccess && data) {
    content = data.map(({ id, title, completed, userId }) => (
      <article key={id}>
        <div className="todo">
          <input
            type="checkbox"
            checked={completed}
            id={id.toString()}
            onChange={() => {}}
          />
          <label htmlFor={id.toString()}>{title}</label>
        </div>
        <button className="trash" onClick={() => {}}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </article>
    ));
  }
  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
