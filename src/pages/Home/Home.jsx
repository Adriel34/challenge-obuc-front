import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Board from "./Board/Board";
import { useEffect, useState } from "react";
import { useCrudTask } from "../../hooks/task.hook";
import { useCrudUser } from "../../hooks/user.hook";
import Categories from "./Categories/categories";



export default function Home() {
  const [currentTab, setCurrentTab] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  const [tasksTableData, setTasksTableData] = useState({
    headers: [
      { label: "Responsible", column: "assignedTo" },
      { label: "Description", column: "description" },
      { label: "Status", column: "status" },
    ],
    rows: [],
  });

  const { getTasksByUser, getCategories } = useCrudTask();
  const {getUser} = useCrudUser()


  const handleGetAllTasksByUser = async () => {
    const categories = await getCategories.mutateAsync();
    setCategories(categories.data.map(item => ({
    id: item.id,
    label: item.name,
    value: item.name
    })))
    const user = await getUser.mutateAsync();
    setUser(user.data);
    const allTasks = await getTasksByUser.mutateAsync(user.data.id);
    setTasks(allTasks.data);
  };

  useEffect(() => {
    handleGetAllTasksByUser();
  }, []);

  useEffect(() => {
    setTasksTableData(prev => ({
      ...prev,
      rows: tasks,
    }));
  }, [tasks]);

  const statusOptions = [
    { id: 1, value: "pending", label: "Pending" },
    { id: 2, value: "inProgress", label: "In Progress" },
    { id: 3, value: "completed", label: "Completed" },
    { id: 4, value: "archived", label: "Archived" }
  ];
  

  const tabs = {
    board: (
      <Board
        status={statusOptions}
        user={user}
        categories={categories}
        tasks={tasksTableData}
        setTasks={setTasks}
      />
    ),
    tags: <Categories/>,
  };
  
  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
