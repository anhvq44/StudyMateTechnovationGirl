import React, { useEffect } from "react";
import RoundProgressBar from "./RoundProgressBar";
import TaskItem from "./TaskItem";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { supabase } from "../supabase_config";

function GoalCardWithGraph({ goalName, progress, taskList, categoryColour, categoryName, handleSaveEdit, handleToggle, handleDelete, goalId }) {
    // Calculate progress
    const completedTasks = taskList.filter(task => task.completed).length;
    const totalTasks = taskList.length;
    const progressCalculation = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="bg-white shadow-md p-5 mb-5 w-fit h-fit flex-col items-center justify-center rounded-xl grid-cols-subgrid border-solid border-2 border-[#5459ba]" >
            <div className="font-semibold text-2xl text-center flex items-center justify-center">
                <p className="w-fit">{goalName}</p>
                {categoryColour && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="w-4 h-4 ml-4 rounded-full cursor-pointer" style={{ backgroundColor: categoryColour }}></span>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                align="center"
                                className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg">
                                {categoryName}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <RoundProgressBar percentage={progressCalculation} radius={40} color={"#FFD166"} size={"w-full h-35"}></RoundProgressBar>
            {taskList.length > 0 ? (
                taskList.map(task => (
                    <TaskItem key={task.id} taskName={task.task_name} dueDate={task.due_date} completed={task.completed} onEdit={handleSaveEdit} taskId={task.id} onToggle={handleToggle} onDelete={handleDelete}></TaskItem>
                ))
            ) : (
                <p className="text-gray-400 text-lg text-center w-fit">No task for this goal yet!</p>
            )}

        </div>
    )
}

function GeneralCard({ taskList, handleSaveEdit, handleToggle, handleDelete}) {
    return (
        <div className="bg-white shadow-md p-5 w-fit h-fit flex-col items-center justify-center rounded-xl grid-cols-subgrid border-solid border-2 border-[#5459ba]">
            <h1 className="font-semibold text-2xl text-center">General</h1>
            {taskList.length > 0 ? (
                taskList.map(task => (
                    <TaskItem key={task.id} taskName={task.task_name} completed={task.completed} dueDate={task.due_date} onEdit={handleSaveEdit} taskId={task.id} onToggle={handleToggle} categoryColour={task.categories?.colour} categoryName={task.categories?.name} onDelete={handleDelete}></TaskItem>
                ))
            ) : (
                <p className="text-gray-400 text-lg text-center w-fit">No task</p>
            )}
        </div>
    )
}   

export { GoalCardWithGraph, GeneralCard }