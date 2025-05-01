import React from "react";
import { supabase } from "../supabase_config";
import { useState, useEffect } from "react";
import { Plus, Icon, X } from 'lucide-react';
import { useUser } from "../context/UserContext";

function AddGoalForm({closeOverlay}) {
    const user = useUser()

    // Task Info
    const [goalInfoForm, setGoalInfoForm] = useState({
        goal_name: '',
    })

    // Selected date and description
    const [selectedDate, setSelectedDate] = useState('');
    const [description, setDescription] = useState('')

    // Handle change in task form
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { id, value } = e.target
        setGoalInfoForm(prev => ({
            ...prev,
            [id]: value
        }));
        if (error) setError('');
    }

    const handleAddGoal = async(e) => {
        e.preventDefault()
        // Finish up the form
        const submitGoalInfoForm = {
            ...goalInfoForm,
            categories_id: selectedCategory ? selectedCategory : null,
            progress: 0,
            user_id: user?.id,
            due_date: selectedDate ? selectedDate : null,
            description: description ? description : null,
        }

        setGoalInfoForm(submitGoalInfoForm)

        // Insert row to table
        const {data, error} = await(supabase)
        .from("goals")
        .insert([submitGoalInfoForm])
        .select()
        // Handle error
        if(error){
            console.log("Error:", error.message, error.code, error.details, error.hint)
        }
        closeOverlay()
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

        fetchCategories();
    }, []);

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
                <label htmlFor="goal_name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="goal_name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F327D] focus:ring-[#2F327D] bg-gray-50 p-2"
                    placeholder="Enter name"
                    onChange={handleChange}
                    value={goalInfoForm.goal_name}
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2"
                    placeholder="Enter description"
                    onChange={(e) => {setDescription(e.target.value)}}
                    value={description}
                />
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
                                />
                                <input
                                    type="color"
                                    value={newCategoryColor}
                                    onChange={(e) => setNewCategoryColor(e.target.value)}
                                    className="h-10 w-10 rounded cursor-pointer"
                                />
                            </div>
                            <button
                                type="submit"
                                className={`px-3 py-2 bg-[#3e42a3] text-white rounded-md hover:bg-[#2F327D]`}
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
                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F327D] focus:ring-[#2F327D] bg-gray-50 p-2 pr-8`}
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
                                onClick={() => setIsAddingCategory(true) }
                                className={`px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-1`}
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
                    onChange={(e) => {setSelectedDate(e.target.value)}}
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
                    onClick={handleAddGoal}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddGoalForm