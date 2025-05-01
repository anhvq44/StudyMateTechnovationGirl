import React from "react";
import { Calendar, Edit2, Trash2, Check, Save, X } from 'lucide-react';
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

function TaskItem({ taskName, dueDate = null, completed = false, onEdit, onToggle, onDelete, taskId, categoryColour = null, categoryName = null, updateProgress }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(taskName);
  const [editedDate, setEditedDate] = useState(dueDate || '');

  const handleSave = () => {
    onEdit(editedName, editedDate, taskId)

    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleToggle = () => {
    onToggle(taskId, completed);

    updateProgress && updateProgress()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3 w-110 hover:shadow-md transition-shadow duration-200 z-20" >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 gap-3">
          <button
            onClick={handleToggle}
            className={`w-5 h-5 rounded border ${completed
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-gray-300 hover:border-blue-500'
              } flex items-center justify-center transition-colors duration-200`}
            aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {completed && <Check size={14} />}
          </button>

          {isEditing ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-2 py-1 text-lg border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Task name"
                autoFocus
                required
              />
              <input
                type="date"
                value={editedDate ? editedDate : ""}
                onChange={(e) => setEditedDate(e.target.value)}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          ) : (
            <div>
              <div className={`mb-1 bg-transparent`}>
                <span className={`text-lg font-medium ${completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{taskName}</span>
                
                {categoryColour && (
                   <TooltipProvider>
                     <Tooltip>
                       <TooltipTrigger asChild>
                       <span className="w-4 h-4 ml-4 rounded-full cursor-pointer inline-block" style={{ backgroundColor: categoryColour }}></span>
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
              {dueDate && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200"
                aria-label="Save changes"
              >
                <Save size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors duration-200"
                aria-label="Cancel editing"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                aria-label="Edit task"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(taskId)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                aria-label="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem