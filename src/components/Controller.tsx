import React from 'react'
import PlayButton from './buttons/PlayButton'
import Slider from './Slider'

const Controller = () => {
    return (
        <div className="controller">
            <div className="container">
                <PlayButton />
                <Slider defaultValue={0} />
            </div>
        </div>
    )
}

export default Controller
