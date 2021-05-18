import React, { useContext } from 'react'
import Controller from './Controller'
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

    const config = {
        delta: 10,                            // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: true,                    // track mouse input
        rotationAngle: 0,                     // set a rotation angle
    }

    const handlers = useSwipeable({
        onSwipedLeft: (_) => {
            if (!isCtrlActive) {
                router.push(router.pathname + "?controls=open");
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
            if (isCtrlActive) {
                router.push(router.pathname);
                setIsNavActive!(false);
                setIsCtrlActive!(false);
            }
        },
        ...config
    });
    const isMobile = useMediaQuery(1199)

    return (
        <div {...handlers} className="layout-d-row">
            {isMobile === false ? (
                <>

                    <Navbar />

                    {children}

                    <Controller />
                </>
            ) : (
                <>
                    <MobileTopBar />

                    {children}

                    <Controller mobile />
                </>
            )
            }
        </div>
    )
}

export default Layout
