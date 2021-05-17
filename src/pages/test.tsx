import React, { useEffect } from 'react'
import Layout from 'src/components/Layout'
import Toggle from 'src/components/Toggle'
import Slider from '../components/Slider'
import { useRouter } from 'next/router';
import useWindowDimensions from 'src/hooks/useWindowDimensions';
import MainChapter from 'src/components/MainChapter';

const Test = () => {
    const router = useRouter();


    useEffect(() => {
        router.push(`${router.pathname}?find=chapters`)
    }, [])

    return (
        <Layout>
            <MainChapter>
                <div className="scroll h-full">
                    <h1 className="title">DogePhysics</h1>
                    <p className="small">v.0.0.0</p>
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <h4>Heading 4</h4>
                    <h5>Heading 5</h5>
                    <h6>Heading 6</h6>
                    {/* <button className="play">Play</button> */}
                    <button className="btn-outline-lg">Example</button>
                    <button className="btn-outline-md">Play</button>
                    <button className="btn-outline-sm">Play</button>
                    <button className="btn-outline-circle-sm">S</button>
                    <p>Hello <em>This is italicized</em> <strong>this is bolded</strong></p>

                    <Slider defaultValue={1} id="some1" name="some1" label="Thing" max={50} min={-50} />
                    <Toggle />
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                </div>
            </MainChapter>
        </Layout>
    )
}

export default Test
