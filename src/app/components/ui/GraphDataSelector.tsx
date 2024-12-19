// グラフのデータを選択するボタン（C#アプリから取得したデータ、ファイルから読み込んだデータ）

'use client';

import React, { useState } from "react";
import Button from "@/app/components/ui/Button";
import { OpenFileModal } from "./OpenFileModal";

export const GraphDataSelector = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-row space-x-4 mt-4 mb-4">
            <Button
                label="Show Realtime Data"
                size="md"
                assign="primary"
                onClick={() => {}}
            />
            <Button
                label="Open File"
                size="md"
                assign="primary"
                onClick={openModal}
            />
            { isModalOpen && ( <OpenFileModal  onClose={closeModal} /> ) }
        </div>
    );
};
