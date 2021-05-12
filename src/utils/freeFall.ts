export const getDisplacementFromFreeFallNoAirResistance = (y_i: number, v_yi: number, a: number, time: number) => {
    return y_i + (v_yi * time + 0.5 * a * time * time);
}

export const getVelocityFromFreeFallNoAirResistance = (a: number, time: number, initialVelocity: number) => {
    return a * time + initialVelocity;
}