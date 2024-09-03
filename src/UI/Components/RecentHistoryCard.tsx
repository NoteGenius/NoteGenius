import React from 'react';
import { Card } from '@/Core/CardHandler'; 

interface RecentHistoryCardProps {
    card: Card;
}

const RecentHistoryCard: React.FC<RecentHistoryCardProps> = ({ card }) => {
    return (
        <div className="bg-gray-300 border-2 border-blue-500 rounded-2xl p-2.5 mx-auto my-2 text-center font-bold text-black w-fit shadow-md hover:shadow-lg transition-shadow duration-300">
            <span>{card.title}</span>
        </div>
    );
};

export default RecentHistoryCard;
