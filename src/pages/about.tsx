import React, { useContext } from "react";
import { projectName } from "../constants";
import Layout from "../components/Layout";
import { StateContext } from "src/context/stateContext";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import Link from "next/link";

const About = () => {
	const isMobile = useMediaQuery(1199);
	// const { isNavActive, isCtrlActive, setIsNavActive, setIsCtrlActive } =
	// 	useContext(StateContext);
	const { isNavActive } = useContext(StateContext);
	const getWidthOfMain = () => {
		// const isNavContentActive = router.query.find === "chapters" || router.query.find === "missions";
		if (isMobile) {
			return "width-100";
		}
		if (isNavActive) {
			return "mission-w-nav-width";
		} else {
			return "mission-width";
		}
	};

	// const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
	// 	e.preventDefault();
	// 	if (!isMobile) return;
	// 	if (isCtrlActive) {
	// 		// router.push(router.pathname);
	// 		setIsNavActive!(false);
	// 		setIsCtrlActive!(false);
	// 	}
	// 	if (isNavActive) {
	// 		// router.push(router.pathname);
	// 		setIsNavActive!(false);
	// 		setIsCtrlActive!(false);
	// 	}
	// };

	return (
		<Layout isSim={false}>
			<div
				// onClick={onClick}
				className={`${getWidthOfMain()} mt-9h-mobile scroll h-full`}
			>
				<div className="container">
					<h1 className="title">About {projectName}</h1>
					<hr />
					<div>
						<p className="my-16">
							DogePhysics is a tool for students all over the
							world to use to learn physics. It is in our interest
							to determine if the methods used in the website are
							liked by students and to learn from their feedback.
						</p>
						<p className="my-16">
							We’ve included both text and simulation (can be
							tweaked based on provided numbers) for different
							types of learners so that everyone can understand
							the topics easily.
						</p>
					</div>
					<h1 className="title mt-36">
						Contact Us and Improve DogePhysics
					</h1>
					<hr />
					<p style={{ textAlign: "center" }} className="my-24">
						Raise an issue on our{" "}
						<Link
							href="https://github.com/vinlegend1/DogePhysics"
							passHref
						>
							<a target="_blank">github repo</a>
						</Link>{" "}
						for any suggestions or bugs encountered
					</p>
					<div style={{ textAlign: "center" }}>
						<div>
							<p className="my-16">John Victor Chua</p>
							<p className="my-16">mobile number: 09274458333</p>
							<p className="my-16">
								Email: victorchua0518@gmail.com
							</p>
						</div>
						<div>
							<p className="my-16">Alvin Cua</p>
							<p className="my-16">mobile number: 09664171404 </p>
							<p className="my-16">
								email: alvincua101@gmail.com
							</p>
						</div>
						<div>
							<p className="my-16">Vincent Hong</p>
							<p className="my-16">mobile number: 09166951249</p>
							<p className="my-16">
								Email: vincentjerhong@gmail.com
							</p>
						</div>
						<div>
							<p className="my-16">Win Sy</p>
							<p className="my-16">mobile number: 09950460833</p>
							<p className="my-16">email: sywin968@gmail.com</p>
						</div>
						<div>
							<p className="my-16">Samuel Villamin</p>
							<p className="my-16">
								mobile number: (+63) 0916-372-0286
							</p>
							<p className="my-16">
								Email: samuelvillamin0d0c@gmail.com
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default About;
