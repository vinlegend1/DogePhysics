// import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { iconDimensions, projectName } from 'src/constants';
import { ContentType } from 'src/types';
// import NavContent from '../NavContent';

interface Props {
    className: string;
}

const MobileBottomBar: React.FC<Props> = ({ className }) => {
    const [isChapter, setIsChapter] = useState(true);
    const [isMission, setIsMission] = useState(false);
    const router = useRouter();

    const onClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, content: ContentType) => {
        if (content === "chapter" && isChapter) {
            setIsChapter(false);
            setIsMission(false);
            router.push(`${router.pathname}`);
        } else if (content === "chapter" && !isChapter) {
            setIsChapter(true);
            setIsMission(false);
            router.push(`${router.pathname}?find=chapters`);
        } else if (content === "mission" && !isMission) {
            setIsChapter(false);
            setIsMission(true);
            router.push(`${router.pathname}?find=missions`);
        } else if (content === "mission" && isMission) {
            setIsChapter(false);
            setIsMission(false);
            router.push(`${router.pathname}`);
        }

    }


    return (
        <>
            <div className={className}>
                <img src="/book.svg" alt="Chapters" onClick={(e) => onClick(e, "chapter")} title="Chapters" style={iconDimensions} className={`icon ${isChapter ? "nav-link-active" : ""}`} />
                <img src="/shuttle.svg" alt="Chapters" onClick={(e) => onClick(e, "mission")} title="Missions" style={iconDimensions} className={`icon ${isMission ? "nav-link-active" : ""}`} />

                <img src="/share.svg" alt="Chapters" title={`Share ${projectName} with your friends`} style={iconDimensions} className="icon" />
            </div>
            {/* <NavContent content={isMission ? "mission" : isChapter ? "chapter" : "inactive"} /> */}
        </>
    )
}

export default MobileBottomBar
