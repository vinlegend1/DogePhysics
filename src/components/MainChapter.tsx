import Head from "next/head";
import Link from "next/link";
// import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from "react";
import { projectName } from "../constants";
import { MissionContext } from "../context/missionContext";
import { StateContext } from "../context/stateContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
import missions from "../missions.json";
import { Metadata } from "../types";
import Button from "./buttons/Button";

interface Props {
	chapterNumber: string;
	howItWorks: string | null;
	metadata: Metadata;
	x?: number;
	y?: number;
	v_x?: number;
	v_y?: number;
	time?: number;
}

const MainChapter: React.FC<Props> = ({
	children,
	chapterNumber,
	howItWorks,
	metadata,
	time,
	v_x,
	v_y,
	x,
	y,
}) => {
	// const router = useRouter();
	// const { width } = useWindowDimensions();
	const [didClickHIW, setDidClickHIW] = useState(true);
	const [didClickMission, setDidClickMission] = useState(true);
	const [lastEl, setLastEl] = useState<HTMLDivElement | null>(null);
	const { completedMissions, setCompletedMissions } =
		useContext(MissionContext);
	const isMobile = useMediaQuery(1199);
	const { isNavActive, isCtrlActive, setIsNavActive, setIsCtrlActive } =
		useContext(StateContext);
	const levelUpAudio = useRef(null);
	const ohNoAudio = useRef(null);

	const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!isMobile) return;
		if (isCtrlActive) {
			// router.push(router.pathname);
			setIsNavActive!(false);
			setIsCtrlActive!(false);
		}
		if (isNavActive) {
			// router.push(router.pathname);
			setIsNavActive!(false);
			setIsCtrlActive!(false);
		}
	};

	// console.log(router.query)

	// const translateOrNot = (width: number) => {
	//     const isNavContentActive = router.query.find === "chapters" || router.query.find === "missions";
	//     const isCtrlActive = router.query.controls === "open";
	//     if (width <= 1200) {
	//         if (isNavContentActive) {
	//             return "translate(60%)"
	//         }
	//         if (isCtrlActive) {
	//             return "translate(-60%)"
	//         }

	//     }

	//     return ""
	// }

	const onClickHIW = (e: React.MouseEvent<HTMLHeadingElement>) => {
		e.preventDefault();
		setDidClickHIW((prev) => !prev);
	};

	const onClickMission = (e: React.MouseEvent<HTMLHeadingElement>) => {
		e.preventDefault();
		setDidClickMission((prev) => !prev);
	};

	const getWidthOfMain = () => {
		// const isNavContentActive = router.query.find === "chapters" || router.query.find === "missions";
		if (isMobile) {
			return "width-100";
		}
		if (isNavActive) {
			return "main-w-nav-width";
		} else {
			return "main-width";
		}
	};

	// console.log(isNavActive)

	useEffect(() => {
		lastEl?.scrollIntoView({ behavior: "smooth" });
	}, [didClickHIW, didClickMission]);

	return (
		<>
			<Head>
				{/* Need to actually code it out properly, but this is for SEO */}
				<title>
					{metadata.title} | {projectName}
				</title>
			</Head>
			<div className={`mt-9h-mobile ${getWidthOfMain()}`}>
				<div
					className={`scroll h-full ${
						isMobile ? "pos-rel-bottom-0" : ""
					}`}
					onClick={onClick}
				>
					{children}

					<div className="container my-24">
						{!howItWorks ? null : (
							<>
								<h2 className="info-sec" onClick={onClickHIW}>
									How It Works
								</h2>
								<div
									className={`hiw ${
										didClickHIW ? "" : "d-none"
									}`}
								>
									<div
										dangerouslySetInnerHTML={{
											__html: howItWorks,
										}}
									/>
								</div>
							</>
						)}

						<h3 className="info-sec" onClick={onClickMission}>
							Missions
						</h3>
						<div
							className={`mission-block ${
								didClickMission ? "" : "d-none"
							}`}
						>
							{missions
								.filter(
									(m) => m.chapterNumber === chapterNumber
								)
								.map((m, i) => (
									<div
										className="mission-det"
										key={`M ${m.chapterNumber}.${i + 1}`}
									>
										<div className="d-flex justify-btwn align-center">
											<h2 className="mission-name">
												M {m.chapterNumber}.{i + 1}{" "}
												{m.title}
											</h2>
											{completedMissions.find(
												(mNum) =>
													mNum ===
													`${m.chapterNumber}.${
														i + 1
													}`
											) ? (
												<img
													src="/check.svg"
													className="completed-mission mr-8"
													alt="Completed"
													title="Congratulations! You completed this mission"
												/>
											) : (
												<div className="check-bg mr-8" />
											)}
											<Link
												href={`/missions/${m.title
													.toLowerCase()
													.replace(/\s/g, "-")}`}
												passHref
											>
												<a>
													<img
														src="/ThreeDots.svg"
														className="icon"
														alt="Learn more"
														title="Learn more about the mission"
													/>
												</a>
											</Link>
										</div>
										<hr className="mission-hr" />
										<h2 className="mission-short my-16">
											{m.shortDescription}
										</h2>
										<div className="d-flex justify-btwn align-center">
											<Button
												size="md"
												outline
												onClick={(e) => {
													e.preventDefault();
													const str =
														"`${" +
														m.checkCondition +
														"}`";
													if (eval(str) === "true") {
														if (
															!completedMissions.find(
																(mis) =>
																	mis ===
																	`${
																		m.chapterNumber
																	}.${i + 1}`
															)
														) {
															setCompletedMissions!(
																(prev) => [
																	...prev,
																	`${
																		m.chapterNumber
																	}.${i + 1}`,
																]
															);
														}
														(
															levelUpAudio.current as any
														).play();
													} else {
														(
															ohNoAudio.current as any
														).play();
													}
												}}
											>
												Check
											</Button>
											<Link
												href={`/missions/${m.title
													.toLowerCase()
													.replace(/\s/g, "-")}`}
												passHref
											>
												<a>
													<img
														src="/light-bulb.svg"
														alt="Hint"
														title="Need a Hint?"
														className="icon"
													/>
												</a>
											</Link>
										</div>
									</div>
								))}
						</div>
						<audio src="/pkmn_level-up.mp3" ref={levelUpAudio} />
						<audio src="/oh-no-sound-effect.mp3" ref={ohNoAudio} />
					</div>
					<div
						ref={(el) => {
							setLastEl(el);
						}}
					></div>
				</div>
			</div>
		</>
	);
};

export default MainChapter;
