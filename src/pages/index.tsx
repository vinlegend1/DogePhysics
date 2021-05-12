import * as React from "react"
import '../../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { clearInterval, setInterval } from "timers";

export default function Home() {

  // let's try free fall
  const [x_0, setX_0] = useState(0);
  const [y_0, setY_0] = useState(1);
  const [v_0, setV_0] = useState([10, 0]);
  const [time, setTime] = useState(0);
  const [animSpeed, setAnimSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop]: any = useState(undefined);

  let a = -9.8;

  useEffect(() => {
    clearInterval(loop);
  }, []);

  const freeFallNoResistance = (y_i: number, v_yi: number, a: number, time: number) => {
    return y_i + (v_yi * time + 0.5 * a * time * time);
  }

  const handleStartPause = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isPlaying) {
      clearInterval(loop);
      setIsPlaying(false);
    } else {
      setLoop(setInterval(() => {
        // console.log("hi")
        setTime(prevTime => {
          setY_0(freeFallNoResistance(y_0, v_0[1], a, prevTime + 0.1))
          return prevTime + 0.1;
        });

        setX_0(prevX => prevX + v_0[0] * 0.1);
        // console.log(time)

      }, 100 / animSpeed));
      setIsPlaying(true);
    }
  }



  // console.log("time: ", time)
  // console.log("position: ", x_0)

  return (
    <div>
      <div style={{
        width: "100%",
        height: "50vh"
      }}>

        <div style={{
          width: 50,
          height: 50,
          backgroundColor: "black",
          position: "relative",
          bottom: y_0,
          left: x_0,
          // marginTop: "auto",

        }}></div>


      </div>
      <button onClick={handleStartPause}>Start / Pause</button>
      <label htmlFor="speed">Animation Speed</label>
      <input type="number" id="speed" name="speed" min="1" max="10" onChange={(e) => {
        setAnimSpeed(parseInt(e.currentTarget.value));
      }} />
    </div>
  )
}
