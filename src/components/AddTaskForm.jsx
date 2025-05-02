import React from "react";
import { supabase } from "../supabase_config";
import { useState, useEffect } from "react";
import { Plus, Icon, X } from 'lucide-react';
import { useUser } from "../context/UserContext";

function AddTaskForm({ closeOverlay, insertToCurrentList }) {
    const user = useUser()

    // Selected goal or general of the task
    const [selectedGoal, setSelectedGoal] = useState("general");
    const isCategoryDisabled = (selectedGoal !== "general"); //check if the task belong to general to disable category

    // Selected date
    const [selectedDate, setSelectedDate] = useState('')

    // Goals list
    const [goalsList, setGoalsList] = useState([])

    // Task Info
    const [taskInfoForm, setTaskInfoForm] = useState({
        task_name: '',
    })

    // Handle change in task form
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { id, value } = e.target
        setTaskInfoForm(prev => ({
            ...prev,
            [id]: value
        }));
        if (error) setError('');
    }

    // Category stuffs
    const [newCategoryColor, setNewCategoryColor] = useState('')
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase.from("categories").select("*");
            if (error) {
                console.error("Error fetching categories:", error.message);
            } else {
                setCategories(data);
            }
        };

        const fetchGoals = async () => {
            const { data, error } = await supabase
                .from("goals")
                .select("*")
            if (error) {
                console.log("Error:", error.message, error.code, error.details)
            }
            else {
                setGoalsList(data)
            }
        }

        fetchGoals()
        fetchCategories();
    }, []);

    // Handle add task
    const handleAddTask = async (e) => {
        e.preventDefault();

        const updatedTaskInfo = {
            ...taskInfoForm,
            user_id: user?.id,
            completed: false,
            category_id: selectedCategory ? selectedCategory : null,
            due_date: selectedDate ? selectedDate : null,
            goal_id: selectedGoal === "general" ? null : selectedGoal,

        };


        // Finishoff the taskinfo form
        await setTaskInfoForm(updatedTaskInfo)

        // Insert row to table
        const { data, error } = await supabase
            .from("tasks")
            .insert([updatedTaskInfo])
            .select()
        if (error) {
            console.log(error.message, error.details, error.hint);
        }
        else if (!error && data) {
            const insertedTask = data[0]
            const matchedGoal = insertedTask.goal_id
                ? goalsList.find(goal => goal.id === insertedTask.goal_id)
                : null;

            const taskWithGoal = {
                ...insertedTask,
                goals: matchedGoal || {}
            };
            await insertToCurrentList([taskWithGoal])
        }

        closeOverlay()
    }

    // Handle add categories
    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (newCategory.trim()) {

            // Get info for the row
            const { data: { user }, errorGetUser } = await supabase.auth.getUser();
            if (errorGetUser) {
                console.error("Error fetching user:", errorGetUser.message);
            }
            const categoriesInfo = {
                user_id: user?.id,
                name: newCategory,
                colour: newCategoryColor,
            }

            const { data, error } = await supabase
                .from('categories')
                .insert([categoriesInfo])
                .select()
            if (error) {
                console.log(error.message, error.code);
            }
            else {
                setCategories([...categories, data[0]]);
                setSelectedCategory(data[0].id);
                setNewCategory("");

                setIsAddingCategory(false);
            }
        }
    };



    return (
        <div className="space-y-4">
            {/* Taskname input */}
            <div>
                <label htmlFor="task_name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="task_name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F327D] focus:ring-[#2F327D] bg-gray-50 p-2"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={taskInfoForm.task_name}
                    required
                />
            </div>
            {/* Goal selected box */}
            <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                    Goal
                </label>
                <select
                    id="goal_id"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F327D] focus:ring-[#2F327D] bg-gray-50 p-2 pr-8"
                    onChange={(e) => { setSelectedGoal(e.target.value) }}
                    value={selectedGoal}
                    required
                >
                    <option value={null} key={null}>General</option>
                    {goalsList.map((goal) => (
                        <option key={goal.id} value={goal.id}>
                            {goal.goal_name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Category */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <div className="mt-1 relative">
                    {isAddingCategory ? (
                        // Adding category
                        <form onSubmit={handleAddCategory} className="flex gap-2">
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#2F327D] focus:ring-[#2F327D] bg-gray-50 p-2"
                                    placeholder="Enter new category"
                                    autoFocus
                                    required
                                    disabled={isCategoryDisabled}
                                />
                                <input
                                    type="color"
                                    value={newCategoryColor}
                                    onChange={(e) => setNewCategoryColor(e.target.value)}
                                    className="h-10 w-10 rounded cursor-pointer"
                                    disabled={isCategoryDisabled}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`px-3 py-2 bg-[#3e42a3] text-white rounded-md hover:bg-[#2F327D] ${isCategoryDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isCategoryDisabled}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAddingCategory(false);
                                    setNewCategory('');
                                }}
                                className="p-2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </form>
                    ) : (
                        // Select category
                        <div className="flex gap-2">
                            <select
                                id="category"
                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F327D] focus:ring-[#2F327D] bg-gray-50 p-2 pr-8
                                            ${isCategoryDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isCategoryDisabled}
                                onChange={(e) => { setSelectedCategory(e.target.value) }}
                                value={selectedCategory}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {(category.name)}
                                    </option>
                                ))}
                            </select>
                            {/* Add category button */}
                            <button
                                type="button"
                                onClick={() => { if (!isCategoryDisabled) { setIsAddingCategory(true) } }}
                                className={`px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-1 ${isCategoryDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Plus className="h-4 w-4" />
                                New
                            </button>
                        </div>
                    )}
                </div>

            </div>
            {/* Due date input */}
            <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mt-1">
                    Due Date
                </label>
                <input
                    type="date"
                    id="due_date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F327D] focus:ring-[#2F327D] bg-gray-50 p-2"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    value={selectedDate}
                    required
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4">
                {/* Cancel button */}
                <button
                    onClick={() => setIsOverlayOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
                {/* Save button */}
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-[#3e42a3] rounded-md hover:bg-[#2F327D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleAddTask}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddTaskForm