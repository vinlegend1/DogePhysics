import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions';
import missions from "src/missions.json";
import Button from './buttons/Button';

interface Props {
    chapterNumber: string;
}

const MainChapter: React.FC<Props> = ({ children, chapterNumber }) => {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [didClickHIW, setDidClickHIW] = useState(false)
    const [didClickMission, setDidClickMission] = useState(false)
    const [lastEl, setLastEl] = useState<HTMLDivElement | null>(null);

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

    const getWidthOfMain = (width: number) => {
        const isNavContentActive = router.query.find === "chapters" || router.query.find === "missions";
        if (width <= 1200) {
            return "100%";
        }

        if (isNavContentActive) {
            return width > 1440 ? width - 360 - 288 : "55%";
        } else {
            return width > 1440 ? width - 72 - 288 : "75%";
        }
    }

    useEffect(() => {
        lastEl?.scrollIntoView({ behavior: "smooth" });

    }, [didClickHIW, didClickMission])

    return (
        <div className="mt-9h-mobile" style={{ width: getWidthOfMain(width!) }}>
            <div className="scroll h-full">
                {children}

                <div className="container my-24">
                    <h2 className="info-sec" onClick={onClickHIW}>How It Works</h2>
                    <div className={`hiw ${didClickHIW ? "" : "d-none"}`}>
                        nowigne
                    </div>

                    <h3 className="info-sec" onClick={onClickMission}>Missions</h3>
                    <div className={`mission-block ${didClickMission ? "" : "d-none"}`}>
                        {missions.filter(m => m.chapterNumber === chapterNumber)
                            .map((m, i) => (
                                <div className="mission-det" key={`M ${m.chapterNumber}.${i + 1}`}>
                                    <div className="d-flex justify-btwn align-center">
                                        <h2 className="mission-name">M {m.chapterNumber}.{i + 1} {m.title}</h2>
                                        <div className="check-bg mr-8" />
                                        <img src="/ThreeDots.svg" alt="Learn more" title="Learn more about the mission" />
                                    </div>
                                    <hr className="mission-hr" />
                                    <h2 className="mission-short my-16">{m.shortDescription}</h2>
                                    <div className="d-flex justify-btwn align-center">
                                        <Button size="md" outline>Check</Button>
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
    )
}

export default MainChapter