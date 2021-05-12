export const getMagnitude = (vectorComponents: number[]) => {
    let sumOfSqrComponents = 0;
    for (let i = 0; i < vectorComponents.length; i++) {
        sumOfSqrComponents += vectorComponents[i] * vectorComponents[i];
    }
    return Math.sqrt(sumOfSqrComponents);
}

export const getUnitVector = (magnitude: number, vectorComponents: number[]) => {
    const unitVector = [];
    for (let i = 0; i < vectorComponents.length; i++) {
        unitVector.push(vectorComponents[i] / magnitude);
    }

    return unitVector;
}