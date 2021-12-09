// import Link from 'next/link';
import Link from "next/link";
import React, { useContext } from "react";
import { iconDimensions, projectName } from "../../constants";
import { StateContext } from "../../context/stateContext";
import { ContentType } from "../../types";
import NavContent from "../NavContent";

interface Props {
	// className: string;
	// isNavActive: boolean;
	// isCtrlActive: boolean;
}

const MobileBottomBar: React.FC<Props> = () => {
	const {
		isNavActive,
		isCtrlActive,
		isChapter,
		isMission,
		setIsChapter,
		setIsMission,
		setIsCtrlActive,
		setIsNavActive,
	} = useContext(StateContext);

	const onClick = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>,
		content: ContentType
	) => {
		if (content === "chapter" && !isChapter) {
			setIsChapter!(true);
			setIsMission!(false);
			// router.push(`${router.pathname}?find=chapters`);
		} else if (content === "mission" && !isMission) {
			setIsChapter!(false);
			setIsMission!(true);
			// router.push(`${router.pathname}?find=missions`);
		}
		if (isCtrlActive) {
			setIsCtrlActive!(false);
			if (content === "chapter") {
				setIsChapter!(true);
				setIsMission!(false);
				setIsNavActive!(true);
				// router.push(`${router.pathname}?find=chapters`);
			} else if (content === "mission") {
				setIsChapter!(false);
				setIsMission!(true);
				setIsNavActive!(true);
				// router.push(`${router.pathname}?find=missions`);
			}
		}
	};

	return (
		<>
			<div
				className={`nav-bottombar ${
					isNavActive || isCtrlActive ? "bottombar-up" : ""
				} ${isCtrlActive ? "bottombar-up" : ""}`}
			>
				<img
					src="/book.svg"
					alt="Chapters"
					onClick={(e) => onClick(e, "chapter")}
					title="Chapters"
					style={iconDimensions}
					className={`icon ${isChapter ? "nav-link-active" : ""}`}
				/>
				<img
					src="/shuttle.svg"
					alt="Chapters"
					onClick={(e) => onClick(e, "mission")}
					title="Missions"
					style={iconDimensions}
					className={`icon ${isMission ? "nav-link-active" : ""}`}
				/>

				<Link href="/about" passHref>
					<a>
						<img
							src="/about.svg"
							alt="About"
							title={`About ${projectName}`}
							style={iconDimensions}
							className="icon"
						/>
					</a>
				</Link>
			</div>
			<NavContent
				mobile
				content={
					isNavActive && isMission
						? "mission"
						: isNavActive && isChapter
						? "chapter"
						: "inactive"
				}
			/>
		</>
	);
};

export default MobileBottomBar;
