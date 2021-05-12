import * as React from "react"
import { useState, useEffect } from 'react'
import { clearInterval, setInterval } from "timers";
import { getDisplacementFromFreeFallNoAirResistance, getVelocityFromFreeFallNoAirResistance } from "../utils/freeFall";
import { gravAccel, radiansToDegrees } from "../constants";
import { getMagnitude } from "../utils/vectorUtils";
import { renderToString } from "katex";

export default function Home() {

  // let's try free fall
  // positions
  const [s_0, setS_0] = useState([0, 0]);
  const [x, setX] = useState(s_0[0]);
  const [y, setY] = useState(s_0[0]);

  // velocities
  const [v_0, setV_0] = useState([0, 0]);
  const [v_x, setV_x] = useState(v_0[0]);
  const [v_y, setV_y] = useState(v_0[1]);

  // acceleration
  const [g, setG] = useState(gravAccel);

  const [time, setTime] = useState(0);
  const [animSpeed, setAnimSpeed] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop]: any = useState(undefined);

  useEffect(() => {
    clearInterval(loop);
  }, []);

  const handleStartPause = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isPlaying) {
      clearInterval(loop);
      setIsPlaying(false);
    } else {
      setLoop(setInterval(() => {
        setTime(prevTime => {
          setX(s_0[0] + v_0[0] * (prevTime + 0.1));
          setY(getDisplacementFromFreeFallNoAirResistance(s_0[1], v_0[1], g, (prevTime + 0.1)));
          setV_y(getVelocityFromFreeFallNoAirResistance(g, prevTime + 0.1, v_0[1]));
          return prevTime + 0.1;
        });
      }, 100 / animSpeed));
      setIsPlaying(true);
    }
  }

  const handleRestart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    clearInterval(loop);
    setIsPlaying(false);
    setX(s_0[0]);
    setY(s_0[1]);
    setV_x(v_0[1]);
    setV_y(v_0[1]);
    setTime(0);
  }

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
          transform: `translate(${x}px, ${-y}px)`
        }}></div>

        <div style={{
          width: Math.min(getMagnitude([v_x, v_y]) * 10, 75),
          height: 2,
          backgroundColor: "lightblue",
          transformOrigin: "0% 0%",
          transform: `translate(${x + 25}px, ${-y - 25}px) rotate(${-Math.min(Math.max(radiansToDegrees(Math.atan(v_y / v_x)), -90), 90)}deg)`
        }}>
        </div>


      </div>
      <button onClick={handleStartPause}>Start / Pause</button>
      <button onClick={handleRestart}>Restart</button>
      <label htmlFor="speed">Animation Speed</label>
      <input type="number" defaultValue="3" id="speed" name="speed" min="1" max="10" onChange={(e) => {
        setAnimSpeed(parseInt(e.currentTarget.value));
      }} />
      <label htmlFor="x">Initial X</label>
      <input type="number" id="x" name="x" min="1" max="100" onChange={(e) => {
        // console.log(e.target.value)
        if (isPlaying) {
          return;
        }
        setS_0(prevPosition => [parseInt(e.target.value), prevPosition[1]]);
        setX(parseInt(e.target.value));
      }} />
      <label htmlFor="y">Initial Y</label>
      <input type="number" id="y" name="y" min="-100" max="1" onChange={(e) => {
        if (isPlaying) {
          return;
        }
        setS_0(prevPosition => [prevPosition[0], parseInt(e.target.value)]);
        setY(parseInt(e.target.value));
      }} />
      <label htmlFor="v_x">Initial Velocity X</label>
      <input type="number" id="v_x" name="v_x" defaultValue="0" min="0" max="100" onChange={(e) => {
        if (isPlaying) {
          return;
        }
        setV_0(prevVel => [parseInt(e.target.value), prevVel[1]]);
        setV_x(parseInt(e.target.value));
      }} />
      <label htmlFor="v_y">Initial Velocity Y</label>
      <input type="number" id="v_y" name="v_y" defaultValue="0" min="-50" max="50" onChange={(e) => {
        if (isPlaying) {
          return;
        }
        setV_0(prevVel => [prevVel[0], parseInt(e.target.value)]);
        setV_y(parseInt(e.target.value));
      }} />

      <p dangerouslySetInnerHTML={{
        __html: renderToString(`x = ${s_0[0]} + ${v_0[0]} \\cdot ${time.toFixed(2)} = ${x.toFixed(2)}`, {
          throwOnError: false
        })
      }}></p>
      <p dangerouslySetInnerHTML={{
        __html: renderToString(`y = ${s_0[1]} + ${v_0[1]} + \\frac{1}{2} g \\cdot ${time.toFixed(2)}^{2} = ${y.toFixed(2)}`, {
          throwOnError: false
        })
      }}></p>
    </div>
  )
}
