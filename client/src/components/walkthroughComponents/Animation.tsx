import { useSpring, animated } from 'react-spring'
import React, { useLayoutEffect, useContext, useState } from "react"
import { Transition } from '../../types';
import { WalkThroughContext } from '../WalkThroughProvider';

export const AnimationElement = (props: { children: React.ReactNode, play: boolean, colorOld: string, transition: Transition, colorNew: string }) => {
    //@ts-ignore
    const { setAnimating } = useContext(WalkThroughContext);

    const [hasRun, setRun] = useState(false)

    const [animateProps, api] = useSpring(() => ({
        y: 0, x: 0,
        backgroundColor: props.colorOld,
        onRest: () => {
            setAnimating(false)
        },
    }))

    useLayoutEffect(() => {
        if (props.play && !hasRun) {
            setAnimating(true)
            setRun(true)
            api.start({
                backgroundColor: props.colorNew,
                ...props.transition,
                delay: 500,
            })
        }
    })

    return (
        <animated.div style={{ ...animateProps, flexDirection: "row" }}>
            {props.children}
        </animated.div>
    )
}

export const AnimationBar = (props: { children: React.ReactNode, play: boolean }) => {

    const [hasRun, setRun] = useState(false)
    //@ts-ignore
    const { setAnimating } = useContext(WalkThroughContext);

    const [animateProps, api] = useSpring(() => ({
        y: -40, x: 0,
        opacity: 0,
        onRest: () => {
            setAnimating(false)
        }
    }))

    useLayoutEffect(() => {
        if (props.play && !hasRun) {
            setAnimating(true)
            setRun(true)
            api.start({
                y: 0, x: 0,
                opacity: 1
            })
        }
    })

    return (
        <animated.div style={{ ...animateProps }}>
            {props.children}
        </animated.div>
    )

}
