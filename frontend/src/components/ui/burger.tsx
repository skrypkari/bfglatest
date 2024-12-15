import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Burger = () => {
    const [isOpen, setOpen] = useState(false);

    const variant = isOpen ? "opened" : "closed";
    const top = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: 45,
            translateY: 2
        }
    };
    const center = {
        closed: {
            opacity: 1
        },
        opened: {
            opacity: 0
        }
    };
    const bottom = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: -45,
            translateY: -2,
        }
    };

    return (
        <motion.svg
            viewBox="0 0 24 24"
            overflow="visible"
            preserveAspectRatio="none"
            width={24}
            height={24}
            onClick={() => setOpen(!isOpen)}
        >
            <motion.line
                x1="0"
                x2="24"
                y1="0"
                y2="0"
                stroke="white"
                strokeWidth="2"
                variants={top}
                animate={variant}
            />
            <motion.line
                x1="0"
                x2="24"
                y1="2"
                y2="2"
                stroke="white"
                strokeWidth="2"
                variants={center}
                animate={variant}
            />
            <motion.line
                x1="0"
                x2="24"
                y1="4"
                y2="4"
                stroke="white"
                strokeWidth="2"
                variants={bottom}
                animate={variant}
            />
        </motion.svg>
    );
};

export default Burger;
