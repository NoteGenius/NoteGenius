import React from "react";
import { Card, CardHandler } from "@/Core/CardHandler";

interface RecentHistoryCardProps {
    card: Card;
}

const RecentHistoryCard: React.FC<RecentHistoryCardProps> = ({ card }) => {

    // Handles the user clicking on the card
    const handleClick = () => {
        CardHandler.getInstance().currentCard = card;
    }

    return (
        <button onClick={handleClick} className="bg-gray-300 rounded-2xl p-2.5 mx-auto my-1 text-center text-base font-sans font-bold text-black w-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <span>{card.title}</span>
        </button>
    );
};

export default RecentHistoryCard;
