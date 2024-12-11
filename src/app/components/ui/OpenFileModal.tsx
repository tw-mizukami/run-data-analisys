import React, { useState } from "react";
import CsvFileUploader from "./CsvFileUploader";
import ConvertCsvToChartData from "../ConvertCsvToChartData";
import { runDataChartType } from "@/app/types/runDataChartType";

export const OpenFileModal = ({ onClose }: { onClose: () => void }) => {
    const [data, setData] = useState<runDataChartType[] | null>(null);
    const[error, setError] = useState<string | null>(null); 
    
    const handleFileUpload = async (file: File) => {
        onClose();
        try {
            const runData = await ConvertCsvToChartData(file);
            setData(runData);
            setError(null); // 成功時はエラーをクリア
            onClose(); // モーダルを閉じる
        } catch (err: unknown) {
            onClose(); // モーダルを閉じた後にアラートを表示
            setTimeout(() => {
                if (err instanceof Error) {
                    alert(`Failed to parse CSV file: ${err.message}. Please check the file format.`);
                } else {
                    alert("Failed to parse CSV file. An unknown error occurred.");
                }
            }, 300);
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
             role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="sm:max-w-lg sm:w-full bg-gray-500 rounded-lg shadow-xl">
                <div className="flex justify-between items-center py-3 px-4 border-b">
                    <h3 id="modal-title" className="text-lg font-bold">
                        Open File
                    </h3>
                    <button
                        type="button"
                        className="text-gray-100 hover:text-gray-600"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <CsvFileUploader onFileUpload={handleFileUpload} />
                
            </div>
        </div>
        
            
    );
};