import React, { useEffect, useRef, useState } from "react";
import { IconButton, Collapse, Box } from "@mui/material";
import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import RecentHistoryCard from "./RecentHistoryCard"; // Adjust the import path as necessary
import { CardHandler } from "@/Core/CardHandler";
import { AddCardEvent } from "@/Core/ChatEvents";

/**
 * Dropdown component for displaying recent history cards on the top right of the screen.
 * This component is only visible on larger screens (md and up).
 */
const RecentHistoryDropdown = () => {
    const isMounted = useRef(false);
    const [forceRender, setForceRender] = useState(false);

    const [open, setOpen] = useState(false);
    const cardHandler = CardHandler.GetInstance();

    /**
     * Show or hide the dropdown
     */
    const handleToggle = () => {
        setOpen(!open);
    };

    /**
     * Handle when a card is added to rerender the dropdown
     */
    const handleAddCard = () => {
        setForceRender((prev) => !prev);
    };

    /**
     * Listen for when cards are added to rerender the dropdown
     */
    useEffect(() => {
        if (!isMounted.current) {
            AddCardEvent.Listen(handleAddCard);

            isMounted.current = true;
        }
        return () => {
            AddCardEvent.RemoveListener(handleAddCard);
        };
    }, []);

    return (
        <Box className="hidden md:block fixed m-20px w-[300px] right-4 top-28">
            <Box
                sx={{ cursor: "pointer" }}
                className="flex justify-center items-center h-full"
                onClick={handleToggle}
            >
                <IconButton className="drop-shadow-[0_0_8px_rgba(0,255,0,1)]">
                    {open ? (
                        <ExpandMoreIcon className="text-white" />
                    ) : (
                        <ExpandLessIcon className="text-white" />
                    )}
                </IconButton>
                <div className="text-white font-bold text-xl text-center drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
                    Recent History
                </div>
            </Box>
            <Collapse in={open}>
                <Box
                    sx={{ mt: 2 }}
                    className="flex flex-col space-y-2 w-full max-w-[300px] mx-auto"
                >
                    {cardHandler?.cards.map((card, index) => (
                        <RecentHistoryCard key={index} card={card} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

export default RecentHistoryDropdown;
