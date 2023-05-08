import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel } from "@chakra-ui/react";
function TaskForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [completion, setCompletion] = useState("incomplete");
  const navigate = useNavigate();
  const GET_TASKS = gql`
    query GetTasks {
      getTasks {
        id
        title
        description
        completed
      }
    }
  `;
  const { data, refetch } = useQuery(GET_TASKS);

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
        refetch();
      })
      .catch((error) => console.log(error));

    navigate("/");
  };

  return (
    <body className="route">
      <div className="form">
        <form onSubmit={onSubmit}>
          <FormControl isRequired>
            <FormLabel className="label">Title</FormLabel>

            <input
              type="text"
              value={title}
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="label">Description:</FormLabel>

            <textarea
              id="desc"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </FormControl>

          <button className="form-button" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </body>
  );
}
export default TaskForm;
