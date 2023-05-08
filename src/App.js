import React, { useState } from "react";
import {
  BrowserRouter,
  Router,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import TaskForm from "./combonents/Taskform";
import EditForm from "./combonents/EditForm";
import TaskList from "./combonents/TaskList";

const Home = (props) => {
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
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div className="navbar">
        <h1 className="header">Task List</h1>

        <button className="add-btn" onClick={() => navigate("/newform")}>
          +
        </button>

        <div className="internal-links">
          <a className="link" href="#Incomplete-tasks">
            Incomplete
          </a>
          <a className="link" href="#completed-tasks">
            complete
          </a>
        </div>
      </div>

      <TaskList data={data} refetch={refetch} />
    </div>
  );
};
function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="editform" element={<EditForm />} />
        <Route path="newform" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
