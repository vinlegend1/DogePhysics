import { useRouter } from 'next/router'
import React from 'react'
import PlayButton from './buttons/PlayButton'
import RestartButton from './buttons/RestartButton'
import Slider from './Slider'

interface Props {
    mobile?: boolean;
}

const Controller: React.FC<Props> = ({ mobile }) => {

    const { query } = useRouter();
    console.log(query.controls)
    // const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
    //     e.preventDefault()
    //     setIsActive(prev => {
    //         // router.push(router.asPath + `&controls=${!prev ? "open" : "close"}`)
    //         return !prev
    //     });
    // }

    return (
        <>
            {
                !mobile ? (
                    <div className="controller h-full">
                        <div className="container mt-36">
                            <div className="ctrl-btn-group">
                                <PlayButton />
                                <RestartButton />

                            </div>
                            <Slider name="x" id="x" defaultValue={0} label="Position" max={50} min={-50} />

                        </div>
                    </div>
                ) : (
                    <div className={`controller-mobile ${query.controls === "open" ? "active-c" : ""} h-full`}>
                        <div className="container mt-36">
                            <div className="ctrl-btn-group">
                                <PlayButton />
                                <RestartButton />

                            </div>
                            <Slider name="x" id="x" defaultValue={0} label="Position" max={50} min={-50} />

                        </div>
                    </div>
                )
            }
        </>
    )


}

export default Controller
