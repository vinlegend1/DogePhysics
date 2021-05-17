import React, { useState } from 'react'
import Button from './Button'

const PlayButton = () => {

    const [hover, setHover] = useState(false)

    const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setHover(true);
    }
    const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setHover(false);
    }

    // console.log(hover)

    return (
        <Button outline size="sm" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <img src="/play.svg" alt="Play" title="Start Simulation" className="icon-sm" style={{
                filter: hover ? "invert(0%) sepia(3%) saturate(738%) hue-rotate(330deg) brightness(102%) contrast(81%)" : ""
            }} />
        </Button >
    )
}

export default PlayButton