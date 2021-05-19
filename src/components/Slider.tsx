import React, { useState } from 'react'

interface Props {
    defaultValue: number;
    name: string;
    id: string;
    label: string;
    min: number;
    max: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    step?: string;
}

const Slider: React.FC<Props> = ({ defaultValue, id, name, label, max, min, onChange, step }) => {

    const [numberValue, setNumberValue] = useState(defaultValue)

    const linkSliderAndDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        setNumberValue(parseFloat(e.target.value));
    }

    // const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     console.log(e);
    //     if (e.key === "Enter") {
    //     setNumberValue(parseInt(e.target));
    //     }
    // }

    return (
        <>
            <label htmlFor={name} className="slider-label pb-36">{label}</label>
            <div className="slidecontainer">
                <input type="range" step={step} onInput={linkSliderAndDisplay} onChange={onChange} min={min} max={max} name={name} defaultValue={numberValue}
                    className="slider" id={id}
                />
                <div className="slider-display">{numberValue}</div>
            </div>
        </>
    )
}

export default Slider
