import React, { useRef, useState } from 'react'

interface Props {
    defaultValue: number;
}

const Slider: React.FC<Props> = ({ defaultValue }) => {


    return (
        <div className="slidecontainer">
            <input type="range" min="1" max="100" defaultValue={defaultValue}
                className="slider" id="myRange"
            />

        </div>
    )
}

export default Slider
