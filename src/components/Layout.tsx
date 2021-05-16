import React from 'react'
import Controller from './Controller'
import Navbar from './Navbar'

interface Props {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="layout-d-row">
            <Navbar />

            {children}

            <Controller />
        </div>
    )
}

export default Layout
