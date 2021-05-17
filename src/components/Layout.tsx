import React from 'react'
import Controller from './Controller'
import Navbar from './Navbar'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import MobileTopBar from './mobile/MobileTopBar'

interface Props {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    const { width } = useWindowDimensions();
    return (
        <div className="layout-d-row">
            {width! >= 1200 ? (
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
