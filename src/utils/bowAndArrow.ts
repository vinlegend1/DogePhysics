import { gravAccel } from "src/constants";

export const GetDragCoefficientFromTheta = (theta: number) => {
	return (
		3.3 -
		(4.5 / Math.sqrt(2 * Math.PI)) *
			Math.exp(-0.5 * Math.pow(theta / 0.85, 2))
	);
};

export const getLiftCoefficientFromTheta = (theta: number) => {
	if (theta > 3 && theta < 87) {
		return 2;
	} else if (theta < -3 && theta > -87) {
		return -2;
	} else if (theta >= 87 || theta <= -87) {
		return 66 - (11 / 15) * theta;
	} else {
		return (11 / 15) * theta;
	}
};

// constrain to 0.4 to 1.1
// export const GetReynoldsNumber = (
// 	fluidDensity: number,
// 	velocity: number,
// 	diameter: number,
// 	viscosity: number
// ) => {
// 	return (fluidDensity * velocity * diameter) / viscosity;
// };

// export const GetDragCoefficientFromRe = (reynoldsNumber: number) => {

// }

export const getXVelocityFromArchery = (
	v_0: number,
	currentVel: number,
	mass: number,
	diameter: number,
	dragCoef: number,
	time: number,
	fluidDensity?: number
) => {
	const accel =
		-(
			Math.PI *
			dragCoef *
			(fluidDensity ? fluidDensity : 1.225) *
			Math.pow(currentVel, 2) *
			Math.pow(diameter, 2)
		) /
		(8 * mass);

	return v_0 + accel * time;
};

export const getXDisplacementFromArchery = (
	x_0: number,
	v_0: number,
	currentVel: number,
	mass: number,
	diameter: number,
	dragCoef: number,
	time: number,
	fluidDensity?: number
) => {
	const accel =
		-(
			Math.PI *
			dragCoef *
			(fluidDensity ? fluidDensity : 1.225) *
			Math.pow(currentVel, 2) *
			Math.pow(diameter, 2)
		) /
		(8 * mass);
	// console.log("accel: ", accel);
	// console.log("mass: ", mass);
	// console.log("diameter: ", diameter);
	// console.log(
	// 	Math.PI *
	// 		dragCoef *
	// 		(fluidDensity ? fluidDensity : 1.225) *
	// 		Math.pow(currentVel, 2) *
	// 		Math.pow(diameter, 2)
	// );
	// console.log("vt: ", v_0 * time);
	// console.log("time: ", time);
	// console.log("0.5 at^2: ", 0.5 * accel * Math.pow(time, 2));

	return x_0 + v_0 * time + 0.5 * accel * Math.pow(time, 2);
};

export const getYVelocityFromArchery = (
	v_0: number,
	currentVel: number,
	mass: number,
	diameter: number,
	liftCoef: number,
	time: number,
	fluidDensity?: number
) => {
	const accel =
		gravAccel +
		(Math.PI *
			liftCoef *
			(fluidDensity ? fluidDensity : 1.225) *
			Math.pow(currentVel, 2) *
			Math.pow(diameter, 2)) /
			(8 * mass);
	return v_0 + accel * time;
};

export const getYDisplacementFromArchery = (
	y_0: number,
	v_0: number,
	currentVel: number,
	mass: number,
	diameter: number,
	liftCoef: number,
	time: number,
	fluidDensity?: number
) => {
	const accel =
		gravAccel +
		(Math.PI *
			liftCoef *
			(fluidDensity ? fluidDensity : 1.225) *
			Math.pow(currentVel, 2) *
			Math.pow(diameter, 2)) /
			(8 * mass);
	return y_0 + v_0 * time + 0.5 * accel * Math.pow(time, 2);
};
