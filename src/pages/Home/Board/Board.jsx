/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import OptionSelect from "../../../components/OptionSelect/OptionSelect";
import Table from "../../../components/Table/Table";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
} from "@mui/material";
import { useCrudTask } from "../../../hooks/task.hook";

export default function Board({ tasks, user, categories, setTasks, status }) {
  const { createNewTask } = useCrudTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clearNewTask = {
    description: "",
    status: "",
    assignedTo: "",
  };
  const [newTask, setNewTask] = useState(clearNewTask);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filtredTasks, setFiltredTasks] = useState([]);


  const handleCloseModal = () => setIsModalOpen((prev) => !prev);
  const handleOpenModal = () => setIsModalOpen((prev) => !prev);

  useEffect(() => {
    setFiltredTasks(tasks.rows)
  }, [tasks]);

  const handleDeleteRow = useCallback(
    async (id) => {
      if (!tasks.rows.length) {
        return;
      }
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [tasks.rows.length, setTasks]
  );

  const handleSubmit = async () => {
    try {
      await createNewTask.mutateAsync({
        assignedTo: newTask.assignedTo,
        description: newTask.description,
        status: newTask.status,
        user_id: user?.id,
        category_id: newTask.category,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterTasks = (event) => {
    const { value } = event.target;
    setSelectedTags(value)
    const filteredCategories = categories.filter((category) =>
      value.includes(category.label)
    );
  
    const filteredCategoryIds = filteredCategories.map((category) => category.id);
  
    const filteredTasks = tasks.rows.filter((task) =>
      filteredCategoryIds.includes(task.category_id)
    );
    setFiltredTasks(filteredTasks);
    return filteredTasks;
  };

  return (
    <div id="board-wrapper">
      <Box display="flex" justifyContent="space-between">
        <Button onClick={handleOpenModal}>
          <FaPlus />
          Add Task
        </Button>

        <Select
          multiple
          displayEmpty
          value={selectedTags}
          onChange={handleFilterTasks}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected.length === 0 ? "Filter By Category" : selected.join(", ")
          }
          sx={{ minWidth: 200, marginLeft: 2, marginBottom: 2 }}
        >
          {categories.map((tag) => (
            <MenuItem key={tag.id} value={tag.label}>
              <Checkbox checked={selectedTags.includes(tag.label)} />
              <ListItemText primary={tag.label} />
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Table task={filtredTasks} handleDeleteRow={handleDeleteRow} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Add new task`}
        handleSubmit={handleSubmit}
        setNewTask={setNewTask}
      >
        <InputText
          label="Responsible"
          placeholder={"Insert task responsible"}
          required={true}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, assignedTo: e.target.value }))
          }
        />

        <InputText
          label="Description"
          placeholder={"Insert description"}
          required={true}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <OptionSelect
          label="Status"
          required={true}
          placeholder={"Select status"}
          options={status}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, status: e.target.value }))
          }
        />
        <OptionSelect
          label="Category"
          required={true}
          placeholder={"Select Category"}
          options={categories}
          onChange={(e) => {
            const category = categories.find(
              (item) => item.label === e.target.value
            );
            setNewTask((prev) => ({ ...prev, category: category.id }));
          }}
        />
      </Modal>
    </div>
  );
}

Board.propTypes = {
  status: PropTypes.array.isRequired,
  tasks: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
};
