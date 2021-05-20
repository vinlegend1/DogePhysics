import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import Layout from 'src/components/Layout';
import missions from "src/missions.json";
import { MissionType } from 'src/types';

interface Props {
    mission: MissionType;
}

const Mission: React.FC<Props> = ({ mission }) => {
    return (
        <Layout>
            <div>

            </div>
        </Layout>
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