import { Piece } from './piece';
import { Team } from './enums';
import { Move } from './move';
import { Tile } from './tile';

export class Rook extends Piece {
    constructor(public team: Team) {
        super('R' + team.toString(), team);
    }

    protected canMove(move: Move): boolean {
        return super.canMove(move);
    }

    public DoMove(move: Move): void {
        if (this.canMove(move)) {
            super.DoMove(move);
        }
    }

    public RefreshAvailableMoves(): void {
        this.AvailableMoves = [];
        const fromTile: Tile = this.CurrentTile;

        let tile_up: Tile = fromTile.Up;
        let tile_left: Tile = fromTile.Left;
        let tile_right: Tile = fromTile.Right;
        let tile_down: Tile = fromTile.Down;

        while (tile_up) {
            if ((tile_up.Occupant && tile_up.Occupant.team !== this.team) || !tile_up.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, tile_up, this));
                tile_up = tile_up.Up
            } else {
                tile_up = null;
            }
        }

        while (tile_left) {
            if ((tile_left.Occupant && tile_left.Occupant.team !== this.team) || !tile_left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, tile_left, this));
                tile_left = tile_left.Left
            } else {
                tile_left = null;
            }
        }

        while (tile_right) {
            if ((tile_right.Occupant && tile_right.Occupant.team !== this.team) || !tile_right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, tile_right, this));
                tile_right = tile_right.Right
            } else {
                tile_right = null;
            }
        }

        while (tile_down) {
            if ((tile_down.Occupant && tile_down.Occupant.team !== this.team) || !tile_down.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, tile_down, this));
                tile_down = tile_down.Down
            } else {
                tile_down = null;
            }
        }
    }
}
