import { Direction } from './enums';

export class Snake {
    direction: Direction;

    constructor() {
        this.direction = Direction.Right;
    }

    SetDirection(dir: Direction): void {
        this.direction = dir;
    }
}
