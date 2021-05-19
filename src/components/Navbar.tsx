import React, { useContext } from 'react'
import { iconDimensions, projectName } from 'src/constants'
import Link from 'next/link';
import { ContentType } from 'src/types';
import NavContent from './NavContent';
import { useRouter } from 'next/router';
import { StateContext } from 'src/context/stateContext';
// import { projectName } from 'src/constants'

interface Props {

}

const Navbar: React.FC<Props> = () => {

    const { isChapter, isMission, setIsChapter, setIsMission, setIsNavActive } = useContext(StateContext);
    // const [isChapter, setIsChapter] = useState(true);
    // const [isMission, setIsMission] = useState(false);
    const router = useRouter();

    const onClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, content: ContentType) => {
        if (content === "chapter" && isChapter) {
            setIsChapter!(false);
            setIsMission!(false);
            setIsNavActive!(false);
            router.push(`${router.pathname}`);
        } else if (content === "chapter" && !isChapter) {
            setIsChapter!(true);
            setIsMission!(false);
            setIsNavActive!(true);
            router.push(`${router.pathname}?find=chapters`);
        } else if (content === "mission" && !isMission) {
            setIsChapter!(false);
            setIsMission!(true);
            setIsNavActive!(true);
            router.push(`${router.pathname}?find=missions`);
        } else if (content === "mission" && isMission) {
            setIsChapter!(false);
            setIsMission!(false);
            setIsNavActive!(false);
            router.push(`${router.pathname}`);
        }

    }


    return (
        <>
            <div className="navbar">

                <div className="nav-group">
                    <img src="/book.svg" alt="Chapters" onClick={(e) => onClick(e, "chapter")} title="Chapters" style={iconDimensions} className={`icon ${isChapter ? "nav-link-active" : ""}`} />
                    <img src="/shuttle.svg" alt="Chapters" onClick={(e) => onClick(e, "mission")} title="Missions" style={iconDimensions} className={`icon ${isMission ? "nav-link-active" : ""}`} />
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
            <NavContent content={isMission ? "mission" : isChapter ? "chapter" : "inactive"} />
        </>
    )
}

export default Navbar
