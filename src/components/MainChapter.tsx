import Head from 'next/head';
// import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { projectName } from 'src/constants';
import { MissionContext } from 'src/context/missionContext';
import { StateContext } from 'src/context/stateContext';
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import missions from "src/missions.json";
import { Metadata } from 'src/types';
import Button from './buttons/Button';

interface Props {
    chapterNumber: string;
    howItWorks: string | null;
    metadata: Metadata;
    x: number;
    y: number;
    v_x: number;
    v_y: number;
    time: number;
}

const MainChapter: React.FC<Props> = ({ children, chapterNumber, howItWorks, metadata, time, v_x, v_y, x, y }) => {
    // const router = useRouter();
    // const { width } = useWindowDimensions();
    const [didClickHIW, setDidClickHIW] = useState(false)
    const [didClickMission, setDidClickMission] = useState(false)
    const [lastEl, setLastEl] = useState<HTMLDivElement | null>(null);
    const isMobile = useMediaQuery(1199);
    const { isNavActive } = useContext(StateContext);
    const { completedMissions, setCompletedMissions } = useContext(MissionContext);

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
        setDidClickHIW(prev => !prev);
    }

    const onClickMission = (e: React.MouseEvent<HTMLHeadingElement>) => {
        e.preventDefault();
        setDidClickMission(prev => !prev);
    }

    const getWidthOfMain = () => {
        // const isNavContentActive = router.query.find === "chapters" || router.query.find === "missions";
        if (isMobile) {
            return "width-100";
        }
        if (isNavActive) {
            return "main-w-nav-width"
        } else {
            return "main-width"
        }

    }

    // console.log(isNavActive)

    useEffect(() => {
        lastEl?.scrollIntoView({ behavior: "smooth" });

    }, [didClickHIW, didClickMission])

    return (
        <>
            <Head>
                {/* Need to actually code it out properly, but this is for SEO */}
                <title>{metadata.title} | {projectName}</title>
            </Head>
            <div className={`mt-9h-mobile ${getWidthOfMain()}`}>
                <div className="scroll h-full">
                    {children}

                    <div className="container my-24">
                        {!howItWorks ? null : (
                            <>
                                <h2 className="info-sec" onClick={onClickHIW}>How It Works</h2>
                                <div className={`hiw ${didClickHIW ? "" : "d-none"}`}>
                                    nowigne
                                </div>
                            </>
                        )}

                        <h3 className="info-sec" onClick={onClickMission}>Missions</h3>
                        <div className={`mission-block ${didClickMission ? "" : "d-none"}`}>
                            {missions.filter(m => m.chapterNumber === chapterNumber)
                                .map((m, i) => (
                                    <div className="mission-det" key={`M ${m.chapterNumber}.${i + 1}`}>
                                        <div className="d-flex justify-btwn align-center">
                                            <h2 className="mission-name">M {m.chapterNumber}.{i + 1} {m.title}</h2>
                                            {completedMissions.find(mNum => mNum === `${m.chapterNumber}.${i + 1}`) ? <img src="/check.svg" className="completed-mission mr-8" alt="Completed" title="Congratulations! You completed this mission" /> : <div className="check-bg mr-8" />}
                                            <img src="/ThreeDots.svg" className="icon" alt="Learn more" title="Learn more about the mission" />
                                        </div>
                                        <hr className="mission-hr" />
                                        <h2 className="mission-short my-16">{m.shortDescription}</h2>
                                        <div className="d-flex justify-btwn align-center">
                                            <Button size="md" outline onClick={(e) => {
                                                e.preventDefault();
                                                const str = '`${' + m.checkCondition + '}`';
                                                if (eval(str) === "true") {
                                                    setCompletedMissions!(prev => [...prev, `${m.chapterNumber}.${i + 1}`])
                                                }
                                            }}>Check</Button>
                                            <img src="/light-bulb.svg" alt="Hint" title="Take a Hint" className="icon" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div ref={(el) => {
                        setLastEl(el);
                    }}></div>
                </div>
            </div>
        </>
    )
}

export default MainChapter