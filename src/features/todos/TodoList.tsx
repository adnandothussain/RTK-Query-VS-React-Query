import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, Fragment } from "react";
import { Todo } from "../../services/api/todos.service";

export const TodoList: FC = () => {
  const { isLoading, data, isError, error, isSuccess } = {
    isLoading: false,
    data: [],
    isError: false,
    error: "",
    isSuccess: false,
  };

  const onCompleted = (e: any, todo: Todo) => {};

  const onDelete = (id: number) => {};

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error as any}</p>;
  }

  if (isSuccess && data.length) {
    return (
      <Fragment>
        {data.map(({ id, title, completed, userId }, index) => (
          <article key={`todos_${id}_${userId}_${index}`}>
            <div className="todo">
              <input
                type="checkbox"
                checked={completed}
                id={id}
                onChange={(e) =>
                  onCompleted(e, { id, title, completed, userId })
                }
              />
              <label htmlFor={id}>{title}</label>
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
