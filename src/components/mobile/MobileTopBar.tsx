import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { StateContext } from 'src/context/stateContext';
import MobileBottomBar from './MobileBottomBar';

interface Props {

}

const MobileTopBar: React.FC<Props> = () => {

    const { isNavActive, isCtrlActive, setIsCtrlActive, setIsNavActive } = useContext(StateContext)
    const router = useRouter();


    const handleNav = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setIsNavActive!(prev => !prev);
        setIsCtrlActive!(false);
        router.push(router.pathname + `${router.query.find ? `?find=${router.query.find}` : ""}`);
    }

    const handleCtrl = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setIsCtrlActive!(prev => {
            setIsNavActive!(false);
            router.push(router.pathname + `${!prev ? "?controls=open" : ""}`);
            return !prev
        });
    }

    return (
        <>
            <div className={`nav-topbar ${isNavActive ? "topbar-right" : ""} ${isCtrlActive ? "topbar-left" : ""}`}>
                <img src="/burger.svg" onClick={handleNav} className="icon" />
                <img src="/console.svg" onClick={handleCtrl} className="icon" />
            </div>
            <MobileBottomBar />
        </>
    )
}

export default MobileTopBar