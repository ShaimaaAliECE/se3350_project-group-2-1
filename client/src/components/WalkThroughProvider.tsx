import React, { useState, createContext } from 'react'

export const WalkThroughContext = createContext({});

export const WalkThroughProvider = (props: { children: React.ReactNode }) => {
    const [ isAnimating, setAnimating ] = useState(false);
    const [ left, setLeft ] = useState({ counter: 0, doneSorting: false })
    const [ right, setRight ] = useState({ counter: 0, doneSorting: false })
    
    return (
        <WalkThroughContext.Provider value={{ left, setLeft, right, setRight, isAnimating, setAnimating }}>
            {props.children}
        </WalkThroughContext.Provider>
    );
};