import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "I want to learn React Js.",
    tags: ["web", "js", "react"],
    priority: "High",
    isFavourite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  }

  function handleEdit(task) {
    // From here, we have to populate the task modal with edit task via passing the task as props.
    // But we can't pass the props from here, as the task is comming as a parameter inside this function.
    // So to this, we will make another state and store this parameter into that state.
    // Therefore, the state can be passed as props in the addModaltask

    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  // Closing modal
  function handleClose() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  // Deleting
  function handleDelete(id) {
    const filterd = tasks.filter((item) => item.id !== id);
    setTasks(filterd);
  }

  // Delete all
  function handleDeleteAll() {
    setTasks([]);
  }

  // Favourite in the list
  function handleFav(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavourite = !newTask[taskIndex].isFavourite;
    setTasks(newTask);
  }
  // Search
  function handleSearch(searchTask) {
    const searchRes = tasks.filter((item) =>
      item.title.toLowerCase().includes(searchTask.toLowerCase())
    );
    setTasks(searchRes);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleClose}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            handleDeleteAll={handleDeleteAll}
          />
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFav={handleFav}
          />
        </div>
      </div>
    </section>
  );
}
