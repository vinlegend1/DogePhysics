import React, { useContext } from 'react'
import { StateContext } from 'src/context/stateContext';
import { useMediaQuery } from 'src/hooks/useMediaQuery';

const SimContainer: React.FC = ({ children }) => {

    const isMobile = useMediaQuery(1199);
    const { isNavActive, isCtrlActive, setIsNavActive, setIsCtrlActive } = useContext(StateContext);

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
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
    }

    return (
        <div className="sim-screen mx-auto" onClick={!isMobile ? undefined : onClick}>
            {children}
        </div>
    )
}

export default SimContainer
