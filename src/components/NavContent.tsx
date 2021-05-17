import React from 'react'
import { ContentType } from 'src/types'
import ChapterContent from './ChapterContent'
import MissionContent from './MissionContent'

interface Props {
    content: ContentType;
    mobile?: boolean;
}

const NavContent: React.FC<Props> = ({ content, mobile }) => {

    // console.log(content)
    return (
        <>
            {
                !mobile ? (
                    <div className={`nav-content scroll ${content === "inactive" ? "" : "active"}`}>
                        {content === "chapter" ?
                            <ChapterContent /> :
                            <MissionContent />
                        }
                    </div>
                ) : (
                    <div className={`nav-content-mobile scroll ${content === "inactive" ? "" : "active"}`}>
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
