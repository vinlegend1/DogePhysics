import Link from 'next/link';
import React, { useContext } from 'react';
import { projectName, projectVersion } from 'src/constants';
import { StateContext } from 'src/context/stateContext';
import missions from "src/missions.json";

const MissionContent = () => {

    const chapters: string[] = [];
    const { setMissionChapter, missionChapter } = useContext(StateContext);


    for (let i = 0; i < missions.length; i++) {
        const fullChapterName = missions[i].chapterNumber + " " + missions[i].chapterName;
        if (chapters.find(chap => chap === fullChapterName)) {
            continue;
        }
        chapters.push(fullChapterName);
    }

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMissionChapter!(e.target.value);
    }

    return (
        <div className="container">
            <div className="my-36">
                <h1 className="name"><Link href="/" passHref><a>{projectName}</a></Link></h1>
                <p className="small">{projectVersion}</p>

                <div className="mt-24 d-flex justify-btwn align-center">
                    <h2 className="mission">Missions</h2>
                    <select className="select-chapter" onChange={onChange}>
                        {
                            chapters.map((chap, i) => (
                                <option key={i}>{chap}</option>
                            ))
                        }
                    </select>
                </div>

                <hr className="mission-hr" />
                {
                    missions.map((m, i) => {

                        if ((m.chapterNumber + " " + m.chapterName) === missionChapter) {
                            return (
                                <div className="d-flex align-center justify-btwn mt-12">
                                    <h2 key={i} className="mission-link"><Link href="/" passHref><a>{m.chapterNumber + `.${i + 1} ` + m.title}</a></Link></h2>
                                    <div className="check-bg">
                                    </div>
                                </div>
                            )
                        } else return null;

                    })
                }

            </div>
        </div>
    )
}

export default MissionContent
