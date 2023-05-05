import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function TaskForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [completion, setCompletion] = useState("incomplete");
  const navigate = useNavigate();

  const CREATE_TASK = gql`
    mutation CreateTask($title: String!, $description: String!) {
      createTask(title: $title, description: $description) {
        title
      }
    }
  `;
  const [createTask, { loading, error }] = useMutation(CREATE_TASK);
  const onSubmit = (e) => {
    e.preventDefault();

    createTask({ variables: { title, description } })
      .then(() => {
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.log(error));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        {/* <label>
          Completion:
          <br />
          <label>
            <input
              type="radio"
              value="incomplete"
              checked={completion === "incomplete"}
              onChange={(e) => setCompletion(e.target.value)}
            />
            Incomplete
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="complete"
              checked={completion === "complete"}
              onChange={(e) => setCompletion(e.target.value)}
            />
            Complete
          </label>
        </label>
        <br /> */}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
export default TaskForm;
