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
                <Slider defaultValue={0} />

            </div>
        </div>
    )
}

export default Controller
