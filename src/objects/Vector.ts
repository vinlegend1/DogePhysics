// probably not gonna use it, keep it just in case. We'll be doing functional instead of OOP

export default class Vector {
    vectorComponents: number[];

    constructor(vectorComponents: number[]) {
        this.vectorComponents = vectorComponents;
    }

    getMagnitude(): number {
        let sumOfSqrComponents = 0;
        for (let i = 0; i < this.vectorComponents.length; i++) {
            sumOfSqrComponents += this.vectorComponents[i] * this.vectorComponents[i];
        }
        return Math.sqrt(sumOfSqrComponents);
    }

    getUnitVector(): number[] {
        const unitVector = [];
        for (let i = 0; i < this.vectorComponents.length; i++) {
            unitVector.push(this.vectorComponents[i] / this.getMagnitude());
        }

        return unitVector;
    }
}