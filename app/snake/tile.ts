import { Direction } from './enums';

export class Tile {
    isDot: boolean;
    prevTile: Tile;
    nextTile: Tile;
    direction: Direction;

    constructor(public x: number, public y: number) {
        this.isDot = false;
        this.prevTile = null;
        this.nextTile = null;
        this.direction = null;
    }
}
