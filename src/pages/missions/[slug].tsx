import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import { projectName } from '../../constants';
import { StateContext } from '../../context/stateContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import missions from "../../missions.json";
import { MissionType } from '../../types';

interface Props {
    mission: MissionType;
}

const Mission: React.FC<Props> = ({ mission }) => {
    const isMobile = useMediaQuery(1199);
    const { isNavActive, isCtrlActive, setIsNavActive, setIsCtrlActive } = useContext(StateContext);
    const [shouldShow, setShouldShow] = useState(false);

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!isMobile) return;
        if (isCtrlActive) {
            // router.push(router.pathname);
            setIsNavActive!(false);
            setIsCtrlActive!(false);
        }
        if (isNavActive) {
            // router.push(router.pathname);
            setIsNavActive!(false);
            setIsCtrlActive!(false);
        }
    }

    const showHint = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShouldShow(prev => !prev);
    }

    const getWidthOfMain = () => {
        // const isNavContentActive = router.query.find === "chapters" || router.query.find === "missions";
        if (isMobile) {
            return "width-100";
        }
        if (isNavActive) {
            return "mission-w-nav-width"
        } else {
            return "mission-width"
        }

    }

    return (
        <>
            <Head>
                <title>{mission.title} | {projectName}</title>
            </Head>
            <Layout isSim={false}>
                <div className={`mt-9h-mobile ${getWidthOfMain()}`}>

                    <div onClick={onClick} className="scroll h-full">
                        <div className="container">
                            <h1 className="title">{mission.title}</h1>
                            <h2 className="chapter-link"><Link href={"/" + mission.chapterName.toLowerCase().replace(/\s/g, "-")} passHref><a>C {mission.chapterNumber} {mission.chapterName}</a></Link></h2>
                            <h2 className="mission-description">Instructions: {mission.shortDescription}</h2>
                            {/* <h2 className="mission-description">Why do this? {mission.shortDescription}</h2> */}
                            <div className="d-flex justify-btwn my-36">
                                <img src="/light-bulb.svg" alt="Hint" title={!shouldShow ? "Show me the Hint!" : "Close Hint"} className="icon" onClick={showHint} />

                                <h3 className="go-back-link"><Link href={"/" + mission.chapterName.toLowerCase().replace(/\s/g, "-")} passHref><a>Go back to C {mission.chapterNumber} {mission.chapterName} to Complete Mission</a></Link></h3>
                            </div>
                            {shouldShow ? <p>{mission.hint}</p> : null}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export const getStaticProps: GetStaticProps = async ({ params: { slug } }: any) => {
    const mission = missions.find(({ title }) => title.toLowerCase().replace(/\s/g, "-") === slug);

    // console.log("slug: ", slug)
    // console.log("mission: ", mission)
    return {
        props: {
            mission
        }, // will be passed to the page component as props
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    const paths = missions.map(({ title }) => ({
        params: { slug: title.toLowerCase().replace(/\s/g, "-") }
    }));

    return {
        paths,
        fallback: false // See the "fallback" section below
    };
}

export default Mission;