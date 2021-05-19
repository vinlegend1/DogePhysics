import React from 'react'
import { projectName, projectVersion } from 'src/constants'
import Link from 'next/link'
import chapterList from "src/chaptersList.json"

const ChapterContent = () => {
    return (
        <div className="container">
            <div className="my-36">
                <h1 className="name"><Link href="/" passHref><a>{projectName}</a></Link></h1>
                <p className="small">{projectVersion}</p>
                {chapterList.map(({ levelName, levelNumber, chapters }) => (
                    <>
                        <h2 className="level">Level {levelNumber}: {levelName}</h2>
                        <hr className="lvl-hr" />
                        {chapters.map(({ chapterName, chapterNumber, pathName }) => (
                            <>
                                <h3 className="sublevel"><Link href={"/" + pathName} passHref><a>{chapterNumber} {chapterName}</a></Link></h3>
                            </>
                        ))}
                    </>
                ))}

            </div>
        </div>
    )
}

export default ChapterContent
