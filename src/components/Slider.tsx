import React, { useState } from 'react'

interface Props {
    defaultValue: number;
    name: string;
    id: string;
    label: string;
    min: number;
    max: number;
}

const Slider: React.FC<Props> = ({ defaultValue, id, name, label, max, min }) => {

    const [numberValue, setNumberValue] = useState(defaultValue)

    const linkSliderAndDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        setNumberValue(parseInt(e.target.value));
    }

    // const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     console.log(e);
    //     if (e.key === "Enter") {
    //     setNumberValue(parseInt(e.target));
    //     }
    // }

    return (
        <>
            <label htmlFor={name} className="slider-label">{label}</label>
            <div className="slidecontainer">
                <input type="range" onInput={linkSliderAndDisplay} min={min} max={max} name={name} defaultValue={numberValue}
                    className="slider" id={id}
                />
                <div className="slider-display">{numberValue}</div>
            </div>
        </>
    )
}

export default Slider
