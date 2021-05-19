import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import MobileTopBar from './mobile/MobileTopBar'
import { useMediaQuery } from 'src/hooks/useMediaQuery'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { StateContext } from 'src/context/stateContext'

interface Props {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {

    const { isNavActive, isCtrlActive, isChapter, isMission, setIsNavActive, setIsCtrlActive } = useContext(StateContext)
    const router = useRouter();
    const isMobile = useMediaQuery(1199)

    const config = {
        delta: 10,                            // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: true,                    // track mouse input
        rotationAngle: 0,                     // set a rotation angle
    }

    const handlers = useSwipeable({
        onSwipedLeft: (_) => {
            if (!isMobile) return;
            // console.log("left")
            if (!isCtrlActive) {
                if (!isNavActive) router.push(router.pathname + "?controls=open");
                setIsNavActive!(false);
                setIsCtrlActive!(true);
            }
            if (isNavActive) {
                router.push(router.pathname);
                setIsNavActive!(false);
                setIsCtrlActive!(false);
            }
        },
        onSwipedRight: (_) => {
            if (!isMobile) return;
            // console.log("right")

            if (isCtrlActive) {
                // temporary solution to swipe problem when using slider to input
                // router.push(router.pathname);
                // setIsNavActive!(false);
                // setIsCtrlActive!(false);
                return;
            }
            if (isChapter && !isNavActive) {
                router.push(router.pathname + "?find=chapters");
                setIsNavActive!(true);
                setIsCtrlActive!(false);
            }
            if (isMission && !isNavActive) {
                router.push(router.pathname + "?find=missions");
                setIsNavActive!(true);
                setIsCtrlActive!(false);
            }
        },
        ...config
    });

    useEffect(() => {
        if (!isMobile) {
            router.push(`${router.pathname}?find=chapters`);
        }
    }, [])

    return (
        <div {...handlers} className="layout-d-row">
            {isMobile === false ? (
                <>

                    <Navbar />

                    {children}

                    {/* <Controller /> */}
                </>
            ) : (
                <>
                    <MobileTopBar />

                    {children}

                    {/* <Controller mobile /> */}
                </>
            )
            }
        </div>
    )
}

export default Layout
