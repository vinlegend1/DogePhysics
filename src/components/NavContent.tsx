import React from 'react'
import { ContentType } from 'src/types'
import ChapterContent from './ChapterContent'
import MissionContent from './MissionContent'

interface Props {
    content: ContentType;
}

const NavContent: React.FC<Props> = ({ content, }) => {


    return (
        <div className={`nav-content scroll ${content === "inactive" ? "" : "active"}`}>
            {content === "chapter" ?
                <ChapterContent /> :
                <MissionContent />
            }
        </div>
    )
}

export default NavContent
