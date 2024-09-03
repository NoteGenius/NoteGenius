import React from 'react';
import { Card } from '@/Core/CardHandler'; 

interface RecentHistoryCardProps {
    card: Card;
}

const RecentHistoryCard: React.FC<RecentHistoryCardProps> = ({ card }) => {
    return (
        <button className="bg-gray-300 rounded-2xl p-2.5 mx-auto my-1 text-center text-base font-sans font-bold text-black w-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <span>{card.title}</span>
        </button>
    );
};

export default RecentHistoryCard;
