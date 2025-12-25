
import React from 'react';
import { MorPankh } from './MorPankh';
import { motion } from 'framer-motion';

export const KrishnaTheme = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
            {/* Top Right Feather - Large */}
            <motion.div
                className="absolute -top-10 -right-10 w-48 h-96 opacity-90"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <MorPankh className="w-full h-full rotate-45" />
            </motion.div>

            {/* Bottom Left Feather - Small */}
            <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-64 opacity-60"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <MorPankh className="w-full h-full -rotate-45" />
            </motion.div>

            {/* Subtle Gradient Overlay/Vignette for atmosphere (Optional) */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-indigo-900/10 pointer-events-none" />
        </div>
    );
};
