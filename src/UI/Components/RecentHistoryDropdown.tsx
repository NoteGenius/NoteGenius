import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Collapse, Box } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { CardHandler, Card } from '@/Core/CardHandler';
import RecentHistoryCard from './RecentHistoryCard'; // Adjust the import path as necessary

const RecentHistoryDropdown = () => {
    const [open, setOpen] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const cardHandlerRef = useRef<CardHandler | null>(null);

    // Initialize card handler when component mounts
    useEffect(() => {
        if (cardHandlerRef.current === null) {
            cardHandlerRef.current = new CardHandler();
            setCards(cardHandlerRef.current.getCards());
        }

        return () => {
            cardHandlerRef.current?.saveCards();
        };
    }, []);

    // Toggle dropdown
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ position: 'fixed', right: 0, margin: '20px', width: '300px' }}>
            <Box sx={{cursor: 'pointer' }} className="flex justify-center items-center h-full" onClick={handleToggle}>
                <div className="text-green-500 font-bold text-xl text-center">
                    Recent History
                </div>
                <IconButton>
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse in={open}>
                <Box sx={{ mt: 2 }}>
                    {cards.map((card, index) => (
                        <RecentHistoryCard key={index} card={card} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

export default RecentHistoryDropdown;
