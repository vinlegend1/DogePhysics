import React from 'react'
import Button from './Button'

const PlayButton = () => {
    return (
        <Button outline size="md">
            <img src="/play.svg" alt="Play" title="Start Simulation" className="icon-sm icon-play" />
        </Button >
    )
}

export default PlayButton
