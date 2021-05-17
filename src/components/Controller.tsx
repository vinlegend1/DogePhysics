import React from 'react'
import PlayButton from './buttons/PlayButton'
import RestartButton from './buttons/RestartButton'
import Slider from './Slider'

const Controller = () => {

    // const router = useRouter();
    // const [isActive, setIsActive] = useState(false);

    // const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
    //     e.preventDefault()
    //     setIsActive(prev => {
    //         // router.push(router.asPath + `&controls=${!prev ? "open" : "close"}`)
    //         return !prev
    //     });
    // }

    return (
        <div className="controller h-full">
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

export default Controller
