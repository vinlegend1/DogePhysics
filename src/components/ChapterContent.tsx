import React from 'react'
import { projectName } from 'src/constants'
import Link from 'next/link'

const ChapterContent = () => {
    return (
        <div className="container">
            <div className="my-36">
                <h1 className="name"><Link href="/" passHref><a>{projectName}</a></Link></h1>
                <p className="small">v.0.0.0</p>
                <h2 className="level">Level 1: Kinematics</h2>
                <hr className="lvl-hr" />
                <h3 className="sublevel"><Link href="/" passHref><a>1.1 Free Fall</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.2 Lagrangian Mechanics</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.3 Newton’s Law on Univ...</a></Link></h3>

                <h2 className="level">Level 1: Kinematics</h2>
                <hr className="lvl-hr" />
                <h3 className="sublevel"><Link href="/" passHref><a>1.1 Free Fall</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.2 Lagrangian Mechanics</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.3 Newton’s Law on Univ...</a></Link></h3>

                <h2 className="level">Level 1: Kinematics</h2>
                <hr className="lvl-hr" />
                <h3 className="sublevel"><Link href="/" passHref><a>1.1 Free Fall</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.2 Lagrangian Mechanics</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.3 Newton’s Law on Univ...</a></Link></h3>

                <h2 className="level">Level 1: Kinematics</h2>
                <hr className="lvl-hr" />
                <h3 className="sublevel"><Link href="/" passHref><a>1.1 Free Fall</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.2 Lagrangian Mechanics</a></Link></h3>
                <h3 className="sublevel"><Link href="/" passHref><a>1.3 Newton’s Law on Univ...</a></Link></h3>
            </div>
        </div>
    )
}

export default ChapterContent
