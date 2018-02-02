import { Tile } from './tile';
import { Piece } from './piece';

export class Move {
    constructor(public FromTile: Tile, public ToTile: Tile, public movingPiece: Piece) { }

    public Equals(other: Move): boolean {
        return this.FromTile.x == other.FromTile.x &&
                this.FromTile.y == other.FromTile.y &&
                this.ToTile.x == other.ToTile.x &&
                this.ToTile.y == other.ToTile.y &&
                this.movingPiece.ID == other.movingPiece.ID;
    }
}
