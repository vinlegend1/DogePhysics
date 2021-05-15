import React from 'react'
import { iconDimensions, projectName } from 'src/constants'
import Link from 'next/link';
// import { projectName } from 'src/constants'

const Navbar = () => {
    return (
        <div className="navbar">

            <div className="nav-group">
                <img src="/book.svg" alt="Chapters" title="Chapters" style={iconDimensions} className="icon" />
                <img src="/shuttle.svg" alt="Chapters" title="Missions" style={iconDimensions} className="icon" />
            </div>

            <div className="nav-link-group">

                <Link href="https://github.com/vinlegend1/DogePhysics" passHref>
                    <a target="_blank">
                        <img src="/github.svg" alt="Chapters" title={`Contribute to ${projectName}`} style={iconDimensions} className="icon" />
                    </a>
                </Link>
                <img src="/share.svg" alt="Chapters" title={`Share ${projectName} with your friends`} style={iconDimensions} className="icon" />
            </div>


        </div>
    )
}

export default Navbar
