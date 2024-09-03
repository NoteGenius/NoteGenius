import React, { useEffect, useState } from 'react';
import { IconButton, Collapse, Box } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import RecentHistoryCard from './RecentHistoryCard'; // Adjust the import path as necessary
import { useChat } from '@/Core/ChatContext';

const RecentHistoryDropdown = () => {
    const [open, setOpen] = useState(false);
    const [cardLength, setCardLength] = useState(0);
    const { cardHandler } = useChat();

    // Update card length and re-render when the card length changes
    useEffect(() => {
        if (cardHandler) {
            setCardLength(cardHandler.getCards().length);

            const interval = setInterval(() => {
                const currentLength = cardHandler.getCards().length;
                if (currentLength !== cardLength) {
                    setCardLength(currentLength);
                }
            }, 1000); // Check every second

            return () => clearInterval(interval); // Cleanup the interval on component unmount
        }
    }, [cardHandler, cardLength]);

    // Toggle dropdown
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box className="hidden md:block fixed m-20px w-300px right-[3vh] top-[15vh]">
            <Box sx={{cursor: 'pointer' }} className="flex justify-center items-center h-full" onClick={handleToggle}>
                <IconButton className="drop-shadow-[0_0_8px_rgba(255,255,255,1)]">
                    {open ? <ExpandMoreIcon className="text-white" /> : <ExpandLessIcon className="text-white" />}
                </IconButton>
                <div className="text-green-500 font-bold text-xl text-center drop-shadow-[0_0_8px_rgba(0,255,0,1)]">
                    Recent History
                </div>
            </Box>
            <Collapse in={open}>
                <Box sx={{ mt: 2 }}>
                    {cardHandler?.getCards().map((card, index) => (
                        <RecentHistoryCard key={index} card={card} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

export default RecentHistoryDropdown;
