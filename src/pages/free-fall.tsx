import * as React from "react"
import { useState, useEffect } from 'react'
import { clearInterval, setInterval } from "timers";
import { getDisplacementFromFreeFallNoAirResistance, getVelocityFromFreeFallNoAirResistance } from "../utils/freeFall";
import { gravAccel, radiansToDegrees } from "../constants";
import { getMagnitude } from "../utils/vectorUtils";
import Latex from "react-latex";
import Layout from "../components/Layout";
import MainChapter from "../components/MainChapter";
import Controller from "../components/Controller";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Slider from "../components/Slider";
import SimContainer from "../components/SimContainer";
import PlayButton from "../components/buttons/PlayButton";
import RestartButton from "../components/buttons/RestartButton";
import matter from "gray-matter";
import marked from "marked";
import { GetStaticProps } from "next";
import path from "path";
import fs from "fs";
import { Metadata } from "../types";

interface Props {
    content: string | null;
    data: Metadata;
}

const FreeFall: React.FC<Props> = ({ content, data }) => {

    const isMobile = useMediaQuery(1199)

    // let's try free fall
    // positions
    const [s_0, setS_0] = useState([0, 0]);
    const [x, setX] = useState(s_0[0]);
    const [y, setY] = useState(s_0[1]);

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
        setV_x(v_0[0]);
        setV_y(v_0[1]);
        setTime(0);
    }
    // console.log(Math.sqrt(v_x * v_x + v_y * v_y))

    return (
        <Layout isSim>
            <MainChapter time={time} v_x={v_x} v_y={v_y} x={x} y={y} chapterNumber="1.1" howItWorks={content} metadata={data}>
                <h1 className="title">{data.levelName}: {data.chapterName}</h1>
                <SimContainer>

                    <div className="ball" style={{
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
                </SimContainer>
                <div className="container my-36">
                    <p>How do positions update?</p>
                    <p className="mt-12">
                        <Latex>{String.raw`$x = ${s_0[0].toFixed(2)} + ${v_0[0].toFixed(2)} \cdot ${time.toFixed(1)} + \frac{1}{2} \cdot 0 \cdot ${time.toFixed(1)}^{2} = ${x.toFixed(2)} m$`}</Latex>
                    </p>
                    <p>
                        <Latex>{String.raw`$y = ${s_0[1].toFixed(2)} + ${v_0[1].toFixed(2)} \cdot ${time.toFixed(1)} + \frac{1}{2} \cdot ${g} \cdot ${time.toFixed(1)}^{2} = ${y.toFixed(2)} m$`}</Latex>
                    </p>
                </div>

                {isMobile ? (
                    <div className="ctrl-btn-group mt-36">
                        <PlayButton isPlaying={isPlaying} onClick={handleStartPause} />
                        <RestartButton onClick={handleRestart} />
                    </div>
                ) : null}
            </MainChapter>
            <Controller isPlaying
                ={isPlaying} handleRestart={handleRestart} handleStartPause={handleStartPause} mobile={isMobile}>
                <div className="container my-24 values">
                    <p>
                        <Latex>{String.raw`$x = ${x.toFixed(2)} m$`}</Latex>
                    </p>
                    <p>
                        <Latex>{String.raw`$y = ${y.toFixed(2)} m$`}</Latex>
                    </p>
                    <p>
                        <Latex>{String.raw`$v_{x} = ${v_x.toFixed(2)} \frac{m}{s}$`}</Latex>
                    </p>
                    <p>
                        <Latex>{String.raw`$v_{y} = ${v_y.toFixed(2)} \frac{m}{s}$`}</Latex>
                    </p>
                    <p>
                        <Latex>{String.raw`$g = ${g.toFixed(2)} \frac{m}{s^{2}}$`}</Latex>
                    </p>
                    <p>
                        <Latex>{String.raw`$t = ${time.toFixed(2)} s$`}</Latex>
                    </p>
                </div>
                <Slider name="speed" id="speed" defaultValue={animSpeed} label="Animation Speed" min={1} max={10}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAnimSpeed(parseInt(e.currentTarget.value));
                    }}
                />
                <Slider name="time" id="time" step="0.1" defaultValue={time} label="Time" min={0} max={10}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTime(parseFloat(e.currentTarget.value));
                        setX(s_0[0] + v_0[0] * (parseFloat(e.currentTarget.value)));
                        setY(getDisplacementFromFreeFallNoAirResistance(s_0[1], v_0[1], g, (parseFloat(e.currentTarget.value))));
                        setV_y(getVelocityFromFreeFallNoAirResistance(g, parseFloat(e.currentTarget.value), v_0[1]));
                        return parseFloat(e.currentTarget.value) + 0.1;
                    }}
                />
                <Slider name="x" id="x" defaultValue={s_0[0]} label="Initial X" min={1} max={100}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (isPlaying) {
                            return;
                        }
                        setS_0(prevPosition => [parseFloat(e.target.value), prevPosition[1]]);
                        setX(parseFloat(e.target.value));
                    }}
                />
                <Slider name="y" id="y" defaultValue={s_0[1]} label="Initial Y" min={-100} max={50}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (isPlaying) {
                            return;
                        }
                        setS_0(prevPosition => [prevPosition[0], parseFloat(e.target.value)]);
                        setY(parseFloat(e.target.value));
                    }}
                />
                <Slider name="v_x" id="v_x" defaultValue={v_0[0]} label="Initial Velocity X" min={0} max={100}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (isPlaying) {
                            return;
                        }
                        setV_0(prevVel => [parseFloat(e.target.value), prevVel[1]]);
                        setV_x(parseFloat(e.target.value));
                    }}
                />

                <Slider name="v_y" id="v_y" defaultValue={v_0[1]} label="Initial Velocity Y" min={-50} max={50}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (isPlaying) {
                            return;
                        }
                        setV_0(prevVel => [prevVel[0], parseFloat(e.target.value)]);
                        setV_y(parseFloat(e.target.value));
                    }}
                />

                <Slider name="grav_acc" id="grav_acc" defaultValue={g} label="Gravitational Acceleration" min={-20} max={-5}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (isPlaying) {
                            return;
                        }
                        setG(parseFloat(e.target.value))
                    }}
                />

            </Controller>
        </Layout >
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const rawContents = fs.readFileSync(path.join("src", "hiw", "free-fall.md")).toString();
    const { data, content } = matter(rawContents);

    // console.log("data: ", data)
    // console.log(content.length === 0)

    const parsedContent = content.length === 0 ? null : marked(content);

    return {
        props: {
            data,
            content: parsedContent
        }, // will be passed to the page component as props
    }
}


export default FreeFall