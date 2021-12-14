import matter from "gray-matter";
import marked from "marked";
import { GetStaticProps } from "next";
import path from "path";
import React, { useEffect, useState } from "react";
import Layout from "src/components/Layout";
import { Metadata } from "src/types";
import MainChapter from "../components/MainChapter";
import fs from "fs";
import SimContainer from "src/components/SimContainer";
import Controller from "src/components/Controller";
import {
	GetDragCoefficientFromTheta,
	getLiftCoefficientFromTheta,
	getXDisplacementFromArchery,
	getXVelocityFromArchery,
	getYDisplacementFromArchery,
	getYVelocityFromArchery,
} from "src/utils/bowAndArrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import Latex from "react-latex";
import Slider from "src/components/Slider";
import { radiansToDegrees } from "src/constants";

interface Props {
	content: string | null;
	data: Metadata;
}

const BowAndArrow: React.FC<Props> = ({ content, data }) => {
	const theta = 0;
	const isMobile = useMediaQuery(1199);
	const [isPlaying, setIsPlaying] = useState(false);
	const [loop, setLoop]: any = useState(undefined);
	const [animSpeed, setAnimSpeed] = useState(10);
	const [time, setTime] = useState(0);

	// positions
	const [s_0, setS_0] = useState([0, 0]);
	const [x, setX] = useState(s_0[0]);
	const [y, setY] = useState(s_0[1]);

	// velocities
	const [v_0, setV_0] = useState([40, 0]);
	const [v_x, setV_x] = useState(v_0[0]);
	const [v_y, setV_y] = useState(v_0[1]);

	// theta or angle

	// arrow properties
	const [mass, setMass] = useState(23); // range 350-600 grains (22.67 g - 38.88g)?
	const [diameter, setDiameter] = useState(6); // range 0.24 inches to 0.4 inches (6 mm to 10mm, approximately)
	// const [length, setLength] = useState(75); // 75 cm to 96 cm

	// forces and moments
	// const [F_x, setF_x] = useState();
	// const [moment, setMoment] = useState();

	// Reynold's number and related things
	// const [fluidDensity, setFluidDensity] = useState();
	// const [fluidViscosity, setFluidViscosity] = useState();
	// const [reynoldsNum, setReynoldsNum] = useState();

	useEffect(() => {
		clearInterval(loop);
	}, []);

	const handleStartPause = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (isPlaying) {
			clearInterval(loop);
			setIsPlaying(false);
		} else {
			setLoop(
				setInterval(() => {
					setTime((prevTime) => {
						setV_x((prevV_x) => {
							setX(
								getXDisplacementFromArchery(
									s_0[0],
									v_0[0],
									prevV_x,
									mass / 1000,
									diameter / 1000,
									GetDragCoefficientFromTheta(theta),
									prevTime
								)
							);
							setV_y((prevV_y) => {
								setY(
									getYDisplacementFromArchery(
										s_0[1],
										v_0[1],
										prevV_y,
										mass / 1000,
										diameter / 1000,
										getLiftCoefficientFromTheta(theta),
										prevTime
									)
								);

								return getYVelocityFromArchery(
									v_0[1],
									prevV_y,
									mass / 1000,
									diameter / 1000,
									getLiftCoefficientFromTheta(theta),
									prevTime
								);
							});
							return getXVelocityFromArchery(
								v_0[0],
								prevV_x,
								mass / 1000,
								diameter / 1000,
								GetDragCoefficientFromTheta(theta),
								prevTime
							);
						});

						return prevTime + 0.1;
					});
				}, 100 / animSpeed)
			);
			setIsPlaying(true);
		}
	};

	const handleRestart = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		clearInterval(loop);
		setIsPlaying(false);
		setX(s_0[0]);
		setY(s_0[1]);
		setV_x(v_0[0]);
		setV_y(v_0[1]);
		setTime(0);
	};

	// console.log("x: ", x);
	// console.log("y: ", y);

	return (
		<Layout isSim>
			<MainChapter
				chapterNumber="1.1"
				howItWorks={content}
				metadata={data}
			>
				<h1 className="title">
					{data.levelName}: {data.chapterName}
				</h1>
				<SimContainer>
					<img
						src="/arrow-right-thin.svg"
						className="icon"
						alt="arrow"
						style={{
							transform: `translate(${x}px, ${-y}px) rotate(${-Math.min(
								Math.max(
									radiansToDegrees(Math.atan(v_y / v_x)),
									-90
								),
								90
							)}deg)`,
						}}
					/>
				</SimContainer>
			</MainChapter>
			<Controller
				isPlaying={isPlaying}
				handleRestart={handleRestart}
				handleStartPause={handleStartPause}
				mobile={isMobile}
			>
				<div className="container my-24 values">
					<p>
						<Latex>{String.raw`$x = ${x.toFixed(2)} m$`}</Latex>
					</p>
					<p>
						<Latex>{String.raw`$y = ${y.toFixed(2)} m$`}</Latex>
					</p>
					<p>
						<Latex>{String.raw`$v_{x} = ${v_x.toFixed(
							2
						)} \frac{m}{s}$`}</Latex>
					</p>
					<p>
						<Latex>{String.raw`$v_{y} = ${v_y.toFixed(
							2
						)} \frac{m}{s}$`}</Latex>
					</p>
					<p>
						<Latex>{String.raw`$t = ${time.toFixed(2)} s$`}</Latex>
					</p>
					<p>
						<Latex>{String.raw`$\theta = ${Math.min(
							Math.max(
								radiansToDegrees(Math.atan(v_y / v_x)),
								-90
							),
							90
						).toFixed(2)}^{\circ} C $`}</Latex>
					</p>
					<p>
						<Latex>{String.raw`$D = ${diameter.toFixed(
							2
						)} mm$`}</Latex>
					</p>
					<p>
						<Latex>{String.raw`$m = ${mass.toFixed(2)} g$`}</Latex>
					</p>
				</div>
				<Slider
					name="speed"
					id="speed"
					defaultValue={animSpeed}
					label="Animation Speed"
					min={1}
					max={10}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setAnimSpeed(parseInt(e.currentTarget.value));
					}}
				/>
				<Slider
					name="time"
					id="time"
					step="0.1"
					defaultValue={time}
					label="Time"
					min={0}
					max={10}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const newTime = parseFloat(e.currentTarget.value);
						setTime(newTime);
						setV_x((prevV_x) => {
							setX(
								getXDisplacementFromArchery(
									s_0[0],
									v_0[0],
									prevV_x,
									mass / 1000,
									diameter / 1000,
									GetDragCoefficientFromTheta(theta),
									newTime
								)
							);
							return getXVelocityFromArchery(
								v_0[0],
								prevV_x,
								mass / 1000,
								diameter / 1000,
								GetDragCoefficientFromTheta(theta),
								newTime
							);
						});
						setV_y((prevV_y) => {
							setY(
								getYDisplacementFromArchery(
									s_0[1],
									v_0[1],
									prevV_y,
									mass / 1000,
									diameter / 1000,
									getLiftCoefficientFromTheta(theta),
									newTime
								)
							);

							return getYVelocityFromArchery(
								v_0[1],
								prevV_y,
								mass / 1000,
								diameter / 1000,
								getLiftCoefficientFromTheta(theta),
								newTime
							);
						});
						return parseFloat(e.currentTarget.value) + 0.1;
					}}
				/>
				<Slider
					name="x"
					id="x"
					defaultValue={s_0[0]}
					label="Initial X"
					min={0}
					max={100}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (isPlaying) {
							return;
						}
						setS_0((prevPosition) => [
							parseFloat(e.target.value),
							prevPosition[1],
						]);
						setX(parseFloat(e.target.value));
					}}
				/>
				<Slider
					name="y"
					id="y"
					defaultValue={s_0[1]}
					label="Initial Y"
					min={-100}
					max={50}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (isPlaying) {
							return;
						}
						setS_0((prevPosition) => [
							prevPosition[0],
							parseFloat(e.target.value),
						]);
						setY(parseFloat(e.target.value));
					}}
				/>
				<Slider
					name="v_x"
					id="v_x"
					defaultValue={v_0[0]}
					label="Initial Velocity X"
					min={20}
					max={100}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (isPlaying) {
							return;
						}
						setV_0((prevVel) => [
							parseFloat(e.target.value),
							prevVel[1],
						]);
						setV_x(parseFloat(e.target.value));
					}}
				/>

				<Slider
					name="v_y"
					id="v_y"
					defaultValue={v_0[1]}
					step="0.1"
					label="Initial Velocity Y"
					min={-30}
					max={30}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (isPlaying) {
							return;
						}
						setV_0((prevVel) => [
							prevVel[0],
							parseFloat(e.target.value),
						]);
						setV_y(parseFloat(e.target.value));
					}}
				/>
				<Slider
					name="diameter"
					id="diameter"
					defaultValue={6}
					label="Diameter of Arrow Shaft"
					min={4}
					max={13}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (isPlaying) {
							return;
						}
						setDiameter(parseFloat(e.target.value));
					}}
				/>
				<Slider
					name="mass"
					id="mass"
					defaultValue={23}
					label="Mass of Arrow"
					min={20}
					max={41}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (isPlaying) {
							return;
						}
						setMass(parseFloat(e.target.value));
					}}
				/>
			</Controller>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const rawContents = fs
		.readFileSync(path.join("src", "hiw", "bow-and-arrow.md"))
		.toString();
	const { data, content } = matter(rawContents);

	// console.log("data: ", data)
	// console.log(content.length === 0)

	const parsedContent = content.length === 0 ? null : marked(content);

	return {
		props: {
			data,
			content: parsedContent,
		}, // will be passed to the page component as props
	};
};

export default BowAndArrow;
