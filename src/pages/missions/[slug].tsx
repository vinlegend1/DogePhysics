import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import Layout from 'src/components/Layout';
import { projectName } from 'src/constants';
import { StateContext } from 'src/context/stateContext';
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import missions from "src/missions.json";
import { MissionType } from 'src/types';

interface Props {
    mission: MissionType;
}

const Mission: React.FC<Props> = ({ mission }) => {
    const { isNavActive } = useContext(StateContext);
    const isMobile = useMediaQuery(1199);

    const getWidthOfMain = () => {
        // const isNavContentActive = router.query.find === "chapters" || router.query.find === "missions";
        if (isMobile) {
            return "width-100";
        }
        if (isNavActive) {
            return "main-w-nav-width"
        } else {
            return "main-width"
        }

    }

    return (
        <>
            <Head>
                <title>{mission.title} | {projectName}</title>
            </Head>
            <Layout isSim={false}>
                <div className={`mt-9h-mobile ${getWidthOfMain()}`}>
                    <div className="scroll h-full">
                        <h1 className="title">{mission.title}</h1>
                        <h2 className="name">C {mission.chapterNumber} {mission.chapterName}</h2>
                        <p>{mission.shortDescription}</p>
                        <p>{mission.longDescription}</p>
                        <p>{mission.hint}</p>
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