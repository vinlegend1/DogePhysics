import React from 'react'
import PlayButton from './buttons/PlayButton'
import RestartButton from './buttons/RestartButton'
import Slider from './Slider'

const Controller = () => {
    return (
        <div className="controller h-full">
            <div className="container mt-36">
                <div className="ctrl-btn-group">
                    <PlayButton />
                    <RestartButton />

                </div>
                <Slider name="x" id="x" defaultValue={0} label="Position" max={50} min={-50} />

            </div>
        </div>
    )
}

export default Controller
