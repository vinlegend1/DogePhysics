import React, { useContext } from 'react'
import { StateContext } from 'src/context/stateContext'
import { ContentType } from 'src/types'
import ChapterContent from './ChapterContent'
import MissionContent from './MissionContent'

interface Props {
    content: ContentType;
    mobile?: boolean;
}

const NavContent: React.FC<Props> = ({ content, mobile }) => {

    const { isNavActive } = useContext(StateContext)

    // console.log(content)
    return (
        <>
            {
                !mobile ? (
                    <div className={`nav-content scroll ${!isNavActive ? "" : "active"}`}>
                        {content === "chapter" ?
                            <ChapterContent /> :
                            <MissionContent />
                        }
                    </div>
                ) : (
                    <div className={`nav-content-mobile scroll ${!isNavActive ? "" : "active"}`}>
                        {content === "chapter" ?
                            <ChapterContent /> :
                            <MissionContent />
                        }
                    </div>
                )
            }
        </>

    )
}

export default NavContent
