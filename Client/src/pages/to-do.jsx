import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSave, FaTimes, FaSearch, FaCheck, FaClipboardList, FaClock, FaCalendarAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Todo = () => {
    const navigate = useNavigate();

    //edit
    const [editingId, setEditingId] = useState(null);
    const [editTodo, setEditTodo] = useState({ task: "", 
        priority: "", 
        time: "", 
        date: "" });

    const updateToDo = async (id) => {
        try {
            const userid = localStorage.getItem("user");
            await axios.put(`http://localhost:8000/api/editToDo/${id}/${userid}`, editTodo, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setEditingId(null);
            toast.success("Task updated successfully");
            fetchToDo();
        } catch (error) {
            console.error("Error updating ToDo:", error);
            alert("Failed to update ToDo");
        }
    };

    //logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const [toDo, setToDo] = useState([])
    const [newTodo, setNewTodo] = useState({
        task: "",
        priority: "",
        time: "",
        date: "",
    });
    console.log(newTodo);
    const AddNewToDo = async (e) => {
        console.log("new ToDO::::::", newTodo);
        e.preventDefault();
        const userid = localStorage.getItem("user")
        console.log("user idddddd", userid)
        try {
            // const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:8000/api/addNewToDo/${userid}`,
                newTodo,
                { headers: {
                    "Content-Type": "application/json", },
                }
            );

            setNewTodo({
                task: "",
                priority: "",
                time: "",
                date: "",
            })
            fetchToDo();
            toast.success("Task added successfully");
        } catch (error) {
            console.error("Error submitting New Event:", error);
            toast.error("Failed to add New TODO");
        }
    };

    useEffect(() => {
        fetchToDo();
    }, []);


    const fetchToDo = async () => {
        console.log('fetch To Do');
        try {
            // const token = localStorage.getItem("token");
            const userid = localStorage.getItem("user")
            console.log("user idddddd", userid)
            const response = await axios.get(`http://localhost:8000/api/fetchToDo/${userid}`, {
                // headers: { Authorization: `Bearer ${token}` },
            });
            const reversedData = [...response.data].reverse();
            setToDo({ data: reversedData });
            console.log("to do :::", reversedData);
        } catch (error) {
            console.error("Error fetching to-dos:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
            }
        }
    };


    // filter and search
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTodos = toDo?.data?.filter(todo => {
        const statusMatch = statusFilter === "All" || todo.status === statusFilter;
        const searchMatch = todo.task.toLowerCase().includes(searchQuery.toLowerCase());
        return statusMatch && searchMatch;
    });

    //state of displaying percentage
    const totalTasks = toDo?.data?.length || 0;
    const completedTasks = toDo?.data?.filter(todo => todo.status === "Completed").length;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    //to do delete
    const handleDeleteToDo = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This task will be permanently deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        if (!result.isConfirmed) return;
        try {
            // const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8000/api/deleteToDo/${id}`, {
                // headers: {
                //     // Authorization: `Bearer ${token}`,
                // },
            });
            Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            fetchToDo();
        } catch (error) {
            console.error("Error deleting ToDo:", error);
            Swal.fire('Error!', 'Failed to delete the task.', 'error');
        }
    };
    //status update
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            // const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:8000/api/updateTodoStatus/${id}`,
                { status: newStatus },
                // { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchToDo();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (


        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen p-4 md:p-8 text-white">
            <ToastContainer />
            <Navbar onLogout={handleLogout} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 mt-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        My ToDo List
                    </h1>
                </div>

                {/* Add Task  */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-blue-300">Add New Task</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
                        <input type="text" value={newTodo.task || ""}
                            onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
                            placeholder="enter a new task?"
                            className="col-span-2 border border-gray-700 rounded-lg px-4 py-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select value={newTodo.priority || ""}
                            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                            className="border border-gray-700 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Priority</option>
                            <option value="Low" className="text-green-400">Low</option>
                            <option value="Medium" className="text-yellow-400">Medium</option>
                            <option value="High" className="text-red-400">High</option>
                        </select>
                        <input type="time" value={newTodo.time || ""}
                            onChange={(e) => setNewTodo({ ...newTodo, time: e.target.value })}
                            className="border border-gray-700 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input type="date" value={newTodo.date || ""}
                            onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
                            className="border border-gray-700 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={AddNewToDo}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                    >
                        Add Task
                    </button>
                </div>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    {/* Filter  */}
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Filter:</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Tasks</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                {/* search */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tasks..."
                            className="block pl-10 pr-4 py-2 w-64 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {totalTasks > 0 && (
                        <div className="flex items-center gap-2 ml-auto w-[200px]">
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all"
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-white text-lg whitespace-nowrap">{completionPercentage}%  Completed</span>
                        </div>
                    )}
                </div>
                {/* Task List */}
                <div className="space-y-4">
                    {filteredTodos?.length > 0 ? (
                        filteredTodos.map((item, index) => (
                            <div
                                key={index}
                                    className={`group relative p-5 min-h-[140px] rounded-xl border-l-4 transition-all duration-300
                                    ${item.status === "Completed" ? "border-green-500 bg-gray-800/50" : ""}
                                    ${item.status === "In Progress" ? "border-yellow-500 bg-gray-800/30" : ""}
                                    ${item.status === "Not Started" ? "border-gray-600 bg-gray-800/20" : ""}
                                    hover:bg-gray-800/70 hover:shadow-lg
                                `}
                            >
                                {/* Completed Checkmark */}
                                {item.status === "Completed" && (
                                    <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                        <FaCheck className="text-white text-sm" />
                                    </div>
                                )}

                                <div className={`pl-10 pr-3 ${item.status === "Completed" ? "opacity-80" : ""}`}>
                                    {editingId === item._id ? (
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
                                            <input type="text" value={editTodo.task} onChange={(e) => setEditTodo({ ...editTodo, task: e.target.value })}
                                                className="col-span-2 border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <select value={editTodo.priority}
                                                onChange={(e) => setEditTodo({ ...editTodo, priority: e.target.value })}
                                                className="border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="Low" className="text-green-400">Low</option>
                                                <option value="Medium" className="text-yellow-400">Medium</option>
                                                <option value="High" className="text-red-400">High</option>
                                            </select>
                                            <input type="time" value={editTodo.time}
                                                onChange={(e) => setEditTodo({ ...editTodo, time: e.target.value })}
                                                className="border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input type="date" value={editTodo.date}
                                                onChange={(e) => setEditTodo({ ...editTodo, date: e.target.value })}
                                                className="border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            <div className="flex-1">
                                                <h3 className={`text-lg font-medium ${item.status === "Completed" ? "line-through text-gray-400" : "text-white"}`}>
                                                    {item.task}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-400">
                                                    <span className="flex items-center">
                                                        <FaClock className="mr-1" /> {item.time}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <FaCalendarAlt className="mr-1" />
                                                        {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium
                                                ${item.priority === "High" ? "bg-red-900/50 text-red-400" : ""}
                                                ${item.priority === "Medium" ? "bg-yellow-900/50 text-yellow-400" : ""}
                                                ${item.priority === "Low" ? "bg-green-900/50 text-green-400" : ""}
                                                   `}>
                                                    {item.priority}
                                                </span>
                                                <select value={item.status}
                                                    onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500
                                                    ${item.status === "Not Started" ? "bg-gray-700 text-gray-300" : ""}
                                                    ${item.status === "In Progress" ? "bg-yellow-900/50 text-yellow-300" : ""}
                                                    ${item.status === "Completed" ? "bg-green-900/50 text-green-300" : ""}
                                                    `}
                                                >
                                                    <option value="Not Started" disabled={item.status === "Completed"}>Not Started</option>
                                                    <option value="In Progress" disabled={item.status === "Completed"}>In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* edit and delete */}
                                <div className="pl-10 mt-3 bottom-9 right-3 flex gap-2">
                                    {editingId === item._id ? (
                                        <>
                                            <button onClick={() => updateToDo(item._id)} title="Save"
                                                className="px-3 py-1 rounded-lg bg-green-500/90 hover:bg-green-600 text-white shadow-md hover:shadow-green-500/30 transition-all transform hover:scale-105 text-sm"
                                            >
                                                Save
                                            </button>
                                            <button onClick={() => setEditingId(null)} title="Cancel"
                                                className="px-3 py-1 rounded-lg bg-gray-500/90 hover:bg-gray-600 text-white shadow-md hover:shadow-gray-500/30 transition-all transform hover:scale-105 text-sm"
                                            >
                                                <FaTimes className="inline-block mr-1 text-xs" />
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setEditingId(item._id);
                                                    setEditTodo({ task: item.task, priority: item.priority, time: item.time, date: item.date.split("T")[0],});
                                                }}
                                                className="p-1 rounded-lg bg-blue-500/90 hover:bg-blue-600 text-white shadow-md hover:shadow-blue-500/30 transition-all transform hover:scale-105"
                                                title="Edit"
                                            >
                                                {/* <FaEdit className="text-xs" /> */}
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteToDo(item._id)}
                                                className="p-1.5 rounded-lg bg-red-500/90 hover:bg-red-600 text-white shadow-md hover:shadow-red-500/30 transition-all transform hover:scale-105"
                                                title="Delete"
                                            >
                                              delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <FaClipboardList className="text-3xl text-gray-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-400">No tasks found</h3>
                            <p className="text-gray-500 mt-1">Add a new task to get started</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Todo
