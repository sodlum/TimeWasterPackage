import { Piece } from './piece';

export class Tile {
    Occupant: Piece;
    Left: Tile;
    Right: Tile;
    Up: Tile;
    Down: Tile;

    constructor(public x: number, public y: number) { }
}
