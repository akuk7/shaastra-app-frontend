import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, FormLabel } from "@chakra-ui/react";
import "./Form.css";

function EditForm() {
  const navigate = useNavigate();

  const location = useLocation();
  const deta = location.state;
  console.log(deta.id);
  const GET_TASK = gql`
    query GetTask($getTaskId: Float!) {
      getTask(id: $getTaskId) {
        completed
        description
        id
        title
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(GET_TASK, {
    variables: { getTaskId: parseFloat(deta.id) },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (data) {
      setTitle(data.getTask.title);
      setDescription(data.getTask.description);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    }
  }, [data]);

  const EDIT_TASK = gql`
    mutation Mutation(
      $title: String!
      $description: String!
      $editTaskId: Float!
    ) {
      editTask(title: $title, description: $description, id: $editTaskId) {
        completed
        description
        id
        title
      }
    }
  `;

  const [editTask] = useMutation(EDIT_TASK);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description);
    await editTask({
      variables: {
        editTaskId: parseFloat(data.getTask.id),
        title,
        description,
      },
    });
    refetch();
    navigate("/");
    // refetch();
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
export default EditForm;
