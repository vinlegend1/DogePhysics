import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions';

const MainChapter: React.FC = ({ children }) => {
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

                    <h2 className="info-sec" onClick={onClickMission}>Missions</h2>
                    <div className={`mission-block ${didClickMission ? "" : "d-none"}`}>
                        nowigne
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