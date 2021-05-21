import React, { useContext } from 'react'
import PlayButton from './buttons/PlayButton'
import RestartButton from './buttons/RestartButton'
import { StateContext } from '../context/stateContext'

interface Props {
    mobile?: boolean;
    handleStartPause: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleRestart: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isPlaying: boolean;
}

const Controller: React.FC<Props> = ({ mobile, children, handleRestart, handleStartPause, isPlaying }) => {

    const { isCtrlActive } = useContext(StateContext);
    // console.log(query.controls)

    return (
        <>
            {
                !mobile ? (
                    <div className="controller scroll h-full">
                        <div className="container mt-36">
                            <div className="ctrl-btn-group">
                                <PlayButton isPlaying={isPlaying} onClick={handleStartPause} />
                                <RestartButton onClick={handleRestart} />
                            </div>
                            {children}
                        </div>
                    </div>
                ) : (
                    <div className={`controller-mobile scroll ${isCtrlActive ? "active-c" : ""} h-full`}>
                        <div className="container mt-36">
                            <div className="ctrl-btn-group">
                                <PlayButton isPlaying={isPlaying} onClick={handleStartPause} />
                                <RestartButton onClick={handleRestart} />

                            </div>
                            {/* <Slider name="x" id="x" defaultValue={0} label="Position" max={50} min={-50} /> */}
                            {children}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Controller
