import React from "react";
import { X } from "lucide-react";

function Overlay({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-2xl transform rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="mt-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Overlay