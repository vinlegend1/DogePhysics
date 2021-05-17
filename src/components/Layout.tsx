import React from 'react'
import Controller from './Controller'
import Navbar from './Navbar'
import MobileTopBar from './mobile/MobileTopBar'
import { useMediaQuery } from 'src/hooks/useMediaQuery'

interface Props {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {

    const isMobile = useMediaQuery(1199)

    console.log(isMobile);
    return (
        <div className="layout-d-row">
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

                    {/* <Controller /> */}
                </>
            )
            }
        </div>
    )
}

export default Layout
