// add imports
import { NewTodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

const Todos = () => {
  return (
    <main>
      <h1>Todo List</h1>
      <NewTodoInput />
      <TodoList />
    </main>
  );
};
export default Todos;
