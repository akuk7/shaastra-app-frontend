import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
function TaskList(props) {
  const navigate = useNavigate();
  const COMPLETE_TASK = gql`
    mutation MarkTaskComplete($markTaskCompleteId: Float!) {
      markTaskComplete(id: $markTaskCompleteId)
    }
  `;
  const INCOMPLETE_TASK = gql`
    mutation MarkTaskIncomplete($markTaskIncompleteId: Float!) {
      markTaskIncomplete(id: $markTaskIncompleteId)
    }
  `;
  const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: Float!) {
      deleteTask(id: $deleteTaskId)
    }
  `;
  const [deleteTask] = useMutation(DELETE_TASK);
  const [markTaskComplete] = useMutation(COMPLETE_TASK);
  const [markTaskIncomplete] = useMutation(INCOMPLETE_TASK);

  return (
    <div>
      <div id="Incomplete-tasks" className="top-section">
        <div className="heading-box">
          <h1 className="heading">Incomplete Tasks</h1>
        </div>
        <div className="grid-container">
          {props.data.getTasks.map((task) => {
            if (!task.completed) {
              return (
                <div className="grid" key={task.id}>
                  <div className="title">
                    <h2>{task.title}</h2>
                  </div>
                  <div className="description">
                    <p>{task.description}</p>
                  </div>
                  <div className="bottom">
                    <div className="incomplete">
                      <label for="checkbox" className="label">
                        Completed
                      </label>
                      <input
                        type="checkbox"
                        id="checkbox"
                        checked={task.completed}
                        onChange={
                          task.completed === false
                            ? async () => {
                                await markTaskComplete({
                                  variables: {
                                    markTaskCompleteId: parseFloat(task.id),
                                  },
                                });
                                await props.refetch();
                              }
                            : async () => {
                                await markTaskIncomplete({
                                  variables: {
                                    markTaskIncompleteId: parseFloat(task.id),
                                  },
                                });
                                await props.refetch();
                              }
                        }
                      />
                    </div>
                    <div className="buttons">
                      <button
                        className="delete"
                        onClick={async () => {
                          await deleteTask({
                            variables: { deleteTaskId: parseFloat(task.id) },
                          });
                          await props.refetch();
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="edit"
                        onClick={() => {
                          const deta = { id: task.id };
                          navigate("/editform", { state: deta });
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div id="completed-tasks">
        <div className="heading-box">
          <h1 className="heading">Complete Tasks</h1>
        </div>
        <div className="grid-container">
          {props.data.getTasks.map((task) => {
            if (task.completed) {
              return (
                <div className="grid" key={task.id}>
                  <div className="title">
                    <h2>{task.title}</h2>
                  </div>
                  <div className="description">
                    <p>{task.description}</p>
                  </div>
                  <div className="bottom">
                    <div className="complete">
                      <label for="checkbox" className="label">
                        Completed
                      </label>
                      <input
                        type="checkbox"
                        id="checkbox"
                        checked={task.completed}
                        onChange={
                          task.completed === false
                            ? async () => {
                                await markTaskComplete({
                                  variables: {
                                    markTaskCompleteId: parseFloat(task.id),
                                  },
                                });
                                await props.refetch();
                              }
                            : async () => {
                                await markTaskIncomplete({
                                  variables: {
                                    markTaskIncompleteId: parseFloat(task.id),
                                  },
                                });
                                await props.refetch();
                              }
                        }
                      />
                    </div>
                    <div className="buttons">
                      <button
                        className="delete"
                        onClick={async () => {
                          await deleteTask({
                            variables: { deleteTaskId: parseFloat(task.id) },
                          });
                          await props.refetch();
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="edit"
                        onClick={() => {
                          const deta = { id: task.id };
                          navigate("/editform", { state: deta });
                        }}
                      >
                        edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
export default TaskList;
