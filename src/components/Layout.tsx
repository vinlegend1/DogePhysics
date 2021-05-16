import React from 'react'
import Navbar from './Navbar'

interface Props {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="layout-d-row">
            <Navbar />

            {children}
        </div>
    )
}

export default Layout
