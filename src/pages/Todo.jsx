import React from "react";
import NavBar from "../components/NavBar";
import { GoalCardWithGraph, GeneralCard } from "../components/GoalCard";
import { Plus, Trophy, CalendarPlus, BotMessageSquare, Icon, X } from 'lucide-react';
import { useState, useEffect } from "react";
import Overlay from "../components/Overlay";
import AddTaskForm from "../components/AddTaskForm";
import AddGoalForm from "../components/AddGoalForm";
import { supabase } from "../supabase_config";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function ToDoPage() {
    const user = useUser()
    const navigate = useNavigate()

    // Loading
    const [loading, setLoading] = useState(true);

    // Get Today Date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];


    const handleChange = (e) => {
        const { id, value } = e.target
        setExtraInfoForm(prev => ({
            ...prev,
            [id]: value
        }));
        if (error) setError('');
    }

    // Check if overlay is open
    const [isOpen, setIsOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [activeForm, setActiveForm] = useState('');

    // Add new task button activation
    const AddNewTask = () => {
        setActiveForm('new_task')
        setIsOverlayOpen(true)
    }

    // Goals and tasks list
    const [taskList, setTaskList] = useState([]);
    const [goals, setGoals] = useState([])

    // Save edit
    const handleSaveEdit = async (editedName, editedDate, taskId) => {
        const { data, error } = await supabase
            .from('tasks')
            .update({
                task_name: editedName,
                due_date: editedDate === "" ? null : editedDate
            })
            .eq('id', taskId)
            .select()

        if (error) {
            console.log("Error message:", error.message)
        }
    }

    // Handle delete task
    const handleDelete = async (taskId) => {
        const { data, error } = await supabase
            .from('tasks')
            .update({
                deleted: true
            })
            .eq('id', taskId)
            .select()

        if (error) {
            console.log("Error message:", error.message)
        }

        setTaskList(taskList.filter(task => task.id !== taskId));
    }

    // Fetch tasks
    useEffect(() => {
        const fetchTasksList = async () => {
            const { data, error } = await supabase
                .from("tasks")
                .select("id, task_name, completed, due_date, goal_id, category_id, goals(id, goal_name, categories_id, progress, description, categories(name, colour)), categories(id, name, colour)")
                .eq("deleted", false)
            if (error) {
                console.log("Error:", error.message, error.id, error.hint, error.details)
            }
            else {
                setTaskList(data)
            }
            setLoading(false);
        }
        fetchTasksList()
    }, []);

    // Insert new task to current task list
    const handleInsertTask = (data) => {
        setTaskList(prevTasks => [...prevTasks, ...data]);
    }

    // Save toggling
    const handleToggleTask = async (taskId, currentComplete) => {
        const { data, error } = await supabase
            .from('tasks')
            .update({
                completed: !currentComplete,
                finishedDate: !currentComplete ? formattedDate : null
            })
            .eq('id', taskId)
            .select()

        if(!currentComplete){
            const { error } = await supabase.rpc('add_coins', {
                uid: user?.id,
                amount: 10,
            });
        }

        if (error) {
            console.log("Error message:", error.message)
        }

        setTaskList(taskList.map(task =>
            task.id === taskId ? { ...task, completed: !currentComplete } : task,
        ));
    }

    // Action buttons
    const actionsButtonItems = [
        { icon: CalendarPlus, text: "Add new task", action: AddNewTask },
        { icon: Trophy, text: "Create new goal", action: (e) => setIsOverlayOpen(true) },
        { icon: BotMessageSquare, text: "Ask for advice", action: (e) => navigate('/chatbot') }
    ]

    // Render task grouped by goals
    const renderTasks = () => {
        const groupedTasks = taskList.reduce((acc, task) => {
            if (task.goal_id) {
                if (!acc[task.goal_id]) {
                    acc[task.goal_id] = {
                        goal_name: task.goals.goal_name,
                        tasks: []
                    };
                }
                acc[task.goal_id].tasks.push(task);
            } else {
                // For general tasks without goals
                if (!acc["general"]) {
                    acc["general"] = {
                        goal_name: "General Tasks",
                        tasks: []
                    };
                }
                acc["general"].tasks.push(task);
            }

            return acc;
        }, {});

        return Object.keys(groupedTasks).map(goalId => {
            const goalData = groupedTasks[goalId];
            const categoryColor = goalData.tasks[0]?.goals?.categories?.colour || null;
            const categoryName = goalData.tasks[0]?.goals?.categories?.name || null;
            return (
                <div key={goalId}>
                    {goalId === "general" ? (
                        <GeneralCard key={"general"}
                            taskList={goalData.tasks}
                            handleSaveEdit={handleSaveEdit}
                            handleToggle={handleToggleTask}
                            handleDelete={handleDelete}
                        />
                    ) : (
                        <GoalCardWithGraph key={goalId} goalName={goalData.goal_name} goalId={goalId}
                            progress={Number(goalData.tasks[0]?.goals?.progress) || 0} 
                            taskList={goalData.tasks}
                            categoryColour={categoryColor}
                            categoryName={categoryName}
                            handleSaveEdit={handleSaveEdit}
                            handleToggle={handleToggleTask}
                            handleDelete={handleDelete}
                        />
                    )}
                </div>

            );
        });
    }

    return (
        <>
            <NavBar></NavBar>
            <main className="ml-20 w-[calc(100%-5rem)] min-h-screen grid grid-cols-2 gap-4 p-5 ">
                {loading ? <p>Loading...</p> : renderTasks()}
                <div className="fixed bottom-6 right-6">
                    {/* Secondary Actions */}
                    <div className={`absolute bottom-full right-0 mb-4 space-y-3 transition-all duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        {actionsButtonItems.map(({ icon: Icon, text, action }) => (
                            <div className="group flex items-center justify-end gap-2" key={text}>
                                <div className="bg-[#3e42a3] text-[#FFD9A0] px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
                                    {text}
                                </div>
                                <button
                                    className="flex items-center justify-center w-12 h-12 bg-[#3e42a3] text-white rounded-full shadow-lg hover:bg-[#2F327D] transform hover:scale-105 transition-all duration-200"
                                    aria-label="Search tasks"
                                    onClick={action}>
                                    <Icon size={20} />
                                </button>
                            </div>

                        ))}
                    </div>

                    {/* Main Action Button */}
                    <button
                        className={`flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${isOpen ? 'bg-[#fbb751] rotate-45' : 'bg-[#3e42a3]'
                            }`}
                        aria-label="Show actions"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Plus size={24} />
                    </button>
                </div>
                <Overlay
                    isOpen={isOverlayOpen}
                    onClose={() => { setIsOverlayOpen(false); setActiveForm('') }}
                    title={activeForm === 'new_task' ? 'Add New Task' : 'Create New Goal'}
                >
                    {activeForm === 'new_task' ? (
                        <AddTaskForm closeOverlay={() => setIsOverlayOpen(false)} insertToCurrentList={handleInsertTask} />
                    ) : (
                        <AddGoalForm closeOverlay={() => setIsOverlayOpen(false)} />
                    )}

                </Overlay>
            </main>
        </>
    )
}

export default ToDoPage