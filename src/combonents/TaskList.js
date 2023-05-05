import React from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
function TaskList(props) {
  const navigate = useNavigate();

  const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: Float!) {
      deleteTask(id: $deleteTaskId)
    }
  `;
  const [deleteTask] = useMutation(DELETE_TASK);
  return (
    <div className="grid-container">
      {props.data.getTasks.map((task) => (
        <div className="grid" key={task.id}>
          <h2>{task.title}</h2>

          <p>{task.description}</p>

          <p>{task.completion === "complete" ? "Complete" : "Incomplete"}</p>
          <button
            onClick={async () => {
              await deleteTask({
                variables: { deleteTaskId: parseFloat(task.id) },
              });
              await props.refetch();
            }}
          >
            delete
          </button>
          <button onClick={() => navigate("/editform")}>edit</button>
        </div>
      ))}
    </div>
  );
}
export default TaskList;
