import { useRouter } from 'next/router';
import React from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions';

const MainChapter: React.FC = ({ children }) => {
    const router = useRouter();
    const { width } = useWindowDimensions();
    // console.log(router.query)

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

    return (
        <div style={{ width: getWidthOfMain(width!) }}>
            {children}
        </div>
    )
}

export default MainChapter
