import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';

function Input({ label, type = "text", className = "", ...props }, ref) {
    const id = useId();
    return (
        <div className="mb-4">
            {label && (
                <label 
                    htmlFor={id} 
                    className={clsx(
                        "block text-sm font-bold mb-2",
                        "text-gray-700 dark:text-gray-300" // Light and dark mode text color
                    )}
                >
                    {label}
                </label>
            )}
            <input 
                ref={ref}
                className={clsx(
                    "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
                    "text-gray-700 dark:text-gray-300",  // Light and dark mode text color
                    "bg-white dark:bg-gray-800",  // Light and dark mode background color
                    "border-gray-300 dark:border-gray-600",  // Light and dark mode border color
                    "focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",  // Focus ring
                    className
                )} 
                type={type} 
                id={id} 
                {...props} 
            />
        </div>
    );
}

export default forwardRef(Input);
