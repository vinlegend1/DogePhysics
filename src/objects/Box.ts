import Vector from "./Vector";

// probably not gonna use it, keep it just in case. We'll be doing functional instead of OOP
export default class Box {

    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    mass: number;
    length: number;
    width: number;
    height: number;

    // should we construct vector2d and vector3d class?
    constructor(initialPosition: number[], initialVelocity: number[], initialAccel: number[], mass: number, dimensions: number[]) {
        this.position = new Vector(initialPosition);
        this.velocity = new Vector(initialVelocity);
        this.acceleration = new Vector(initialAccel);
        this.mass = mass;

        this.length = dimensions[0];
        this.width = dimensions[1];
        this.height = !dimensions[2] ? 0 : dimensions[2];
    }

    is2D() {
        return this.height != 0 ? true : false;
    }


}