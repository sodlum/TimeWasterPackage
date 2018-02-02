import { Piece } from './piece';
import { Team } from './enums';
import { Move } from './move';
import { Tile } from './tile';

export class Bishop extends Piece {
    constructor(public team: Team) {
        super('B' + team.toString(), team);
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

        let up_left: Tile = null;
        let up_right: Tile = null;
        let down_left: Tile = null;
        let down_right: Tile = null;

        if (fromTile.Up) {
            up_left = fromTile.Up.Left;
            up_right = fromTile.Up.Right;
        }

        if (fromTile.Down) {
            down_left = fromTile.Down.Left;
            down_right = fromTile.Down.Right;
        }

        while(up_left) {
            if ((up_left.Occupant && up_left.Occupant.team != this.team) || !up_left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, up_left, this));
                if (up_left.Up && up_left.Up.Left) {
                    up_left = up_left.Up.Left;
                } else {
                    up_left = null;
                }
            } else {
                up_left = null;
            }
        }

        while(up_right) {
            if ((up_right.Occupant && up_right.Occupant.team != this.team) || !up_right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, up_right, this));
                if (up_right.Up && up_right.Up.Right) {
                    up_right = up_right.Up.Right;
                } else {
                    up_right = null;
                }
            } else {
                up_right = null;
            }
        }

        while(down_left) {
            if ((down_left.Occupant && down_left.Occupant.team != this.team) || !down_left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, down_left, this));
                if (down_left.Down && down_left.Down.Left) {
                    down_left = down_left.Down.Left;
                } else {
                    down_left = null;
                }
            } else {
                down_left = null;
            }
        }

        while(down_right) {
            if ((down_right.Occupant && down_right.Occupant.team != this.team) || !down_right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, down_right, this));
                if (down_right.Down && down_right.Down.Right) {
                    down_right = down_right.Down.Right;
                } else {
                    down_right = null;
                }
            } else {
                down_right = null;
            }
        }
    }
}
