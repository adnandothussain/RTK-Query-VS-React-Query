import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, Fragment } from "react";
import {
  Todo,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../services/api/todos.service";

export const TodoList: FC = () => {
  const { isLoading, data, isError, error, isSuccess } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deletTodo] = useDeleteTodoMutation();

  const onCompleted = (e: any, todo: Todo) => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  const onDelete = (id: number) => {
    deletTodo(id);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error as any}</p>;
  }

  if (isSuccess && data) {
    return (
      <Fragment>
        {data.map(({ id, title, completed, userId }, index) => (
          <article key={`todos_${id}_${userId}_${index}`}>
            <div className="todo">
              <input
                type="checkbox"
                checked={completed}
                id={id.toString()}
                onChange={(e) =>
                  onCompleted(e, { id, title, completed, userId })
                }
              />
              <label htmlFor={id.toString()}>{title}</label>
            </div>
            <button className="trash" onClick={() => onDelete(id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </article>
        ))}
      </Fragment>
    );
  }
  return null;
};
