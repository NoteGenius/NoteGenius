// Updated RecentHistoryCard.tsx

import React, { useState } from "react";
import { Card, CardHandler } from "@/Core/CardHandler";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { RecentHistoryEvent } from "@/Core/ChatEvents";

interface RecentHistoryCardProps {
    card: Card;
    isCurrent: boolean;
}

const RecentHistoryCard: React.FC<RecentHistoryCardProps> = ({ card, isCurrent }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const [isHovered, setIsHovered] = useState(false);

    /** if card is clicked, set the chat to that card */
    const handleClick = () => {
        if (!isEditing) {
            CardHandler.GetInstance().currentCard = card;
        }
        new RecentHistoryEvent().Dispatch();
    };

    /** Handles the deleting functionality */
    const handleDelete = () => {
        CardHandler.GetInstance().RemoveCard(card);
        new RecentHistoryEvent().Dispatch();
    };

    /** Handles the editing functionality */
    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    /**
     * Every time the title is changed, this will update the title
     */
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // Handles saving the title
    const handleSave = () => {
        card.SetTitle(title);
        new RecentHistoryEvent().Dispatch();
        setIsEditing(false);
    };

    /** 
     * will handle save if the enter key is pressed
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative ${isCurrent ? 'bg-gray-300' : 'bg-white'} rounded-2xl p-2.5 mx-auto my-1 text-center text-base font-sans font-bold text-black w-full shadow-md hover:shadow-lg transition-shadow duration-300 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]`}
        >
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none"
                />
            ) : (
                <button onClick={handleClick} className="w-full">
                    {card.title}
                </button>
            )}

            {/* Icons that appear on hover */}
            {isHovered && (
                <div className="absolute top-1 right-1 flex space-x-2">
                    {/* Edit Icon */}
                    <IconButton onClick={isEditing ? handleSave : handleEdit} size="small">
                        {isEditing ? <CheckIcon /> : <EditIcon />}
                    </IconButton>

                    {/* Delete Icon */}
                    <IconButton onClick={handleDelete} size="small" color="error">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default RecentHistoryCard;
