"use client";

import React, { useState } from 'react';

interface CsvFileUploaderProps {
  onFileUpload: (file: File) => void;
}

function CsvFileUploader({ onFileUpload }: CsvFileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneStyle = isDragging ? 'border-dashed border-2 border-blue-500 p-4' : 'p-4';

  // ファイルのチェックとアップロード処理
  const processFile = (file: File | null) => {
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Only CSV files are supported.');
    }
  };

  // ドラッグオーバー時の処理
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // ドラッグが離れたときの処理
  const handleDragLeave = () => setIsDragging(false);

  // ドロップ時の処理
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    processFile(event.dataTransfer.files[0]);
  };

  // ファイル選択時の処理
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files?.[0] || null);
  };

  return (
    <div>
      <div
        className={`${dropZoneStyle} bg-gray-100 text-gray-700 text-center rounded-md`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>ここにCSVファイルをドラッグ＆ドロップしてください</p>
        <input type="file" accept=".csv" onChange={handleFileSelect} />
      </div>
    </div>
  );
}

export default CsvFileUploader;
