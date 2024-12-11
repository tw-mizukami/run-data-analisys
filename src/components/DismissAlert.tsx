
//
// アラートメッセージを表示し、ユーザーが閉じることができる通知コンポーネント
//
"use client"; 

import React, { useState } from 'react';

type AlertProps = {
    message: string;
    type?: "success" | "error" | "info";
    size?: "large" | "middle" | "small";
};

export const DismissAlert: React.FC<AlertProps> = ({ message, type = "info", size = "middle" }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false); // アラートを非表示にする
    };

  if (!isVisible) return null; // 非表示にする
    
    const alertStyles = {
        success: "bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500",
        error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500",
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500",
    };
 
    const sizeStyles = {
        large: "p-6 text-lg",
        middle: "p-4 text-base",
        small: "p-2 text-sm",
    };

    return (
       <div
            id="dismiss-alert"
            className={`hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300  ${sizeStyles[size]} ${alertStyles[type]} rounded-lg w-full`}
            role="alert"
            tabIndex={-1}
            aria-labelledby="hs-dismiss-button-label"
        >
            <div className="flex">
                <div className="shrink-0">
                    <svg
                        className="shrink-0 size-4 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                </div>
                <div className="ms-2">
                    <h3 id="hs-dismiss-button-label" className="font-medium">
                        {message}
                    </h3>
                </div>
                <div className="ps-3 ms-auto">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="inline-flex rounded-lg p-1.5"
                        >
                            <span className="sr-only">Dismiss</span>
                            <svg
                                className="shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
};
