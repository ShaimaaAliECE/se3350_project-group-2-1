import React, { useState, createContext } from 'react'

export const WalkThroughContext = createContext({});

export const WalkThroughProvider = (props: { children: React.ReactNode }) => {
    const [isAnimating, setAnimating] = useState(false);

    return (
        <WalkThroughContext.Provider value={{ isAnimating, setAnimating }}>
            {props.children}
        </WalkThroughContext.Provider>
    );
};