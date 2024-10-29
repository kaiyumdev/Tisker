/* eslint-disable no-unused-vars */
import { useState } from 'react'
import SearchTask from './SearchTask'
import TaskActions from './TaskActions'
import TaskList from './TaskList'
import AddTaskModal from './AddTaskModal'

const TaskBoard = () => {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Learn React",
        'description': "I want to Learn React such than I can treat it like my slave and make it do whatever I want to do.",
        'tags': ["Web", "React", "js"],
        "priority": "High",
        "isFavorite": false
    }
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [toUpdateTask, setToUpdateTask] = useState(null);

    const handleAddTask = (newTask, isAdd) => {
        if (isAdd) {
            console.log('adding new task...', newTask);
            setTasks([...tasks, newTask]);
        } else {
            const updatedTask = tasks.map((task) => {
                if (task.id === newTask.id) {
                    return newTask;
                }
                return task;
            })
            setTasks(updatedTask);
        }
        setShowAddModal(false);
    }

    const handleEditTask = (task) => {
        setToUpdateTask(task);
        setShowAddModal(true);
    }
    return (
        <section className="mb-20" id="tasks">
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask></SearchTask>
                </div>
                {showAddModal && <AddTaskModal onSave={handleAddTask} toUpdateTask={toUpdateTask}></AddTaskModal>}
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions onAddClick={() => setShowAddModal(true)}></TaskActions>
                    <TaskList tasks={tasks} onEdit={handleEditTask}></TaskList>
                </div>
            </div>
        </section>
    )
}

export default TaskBoard