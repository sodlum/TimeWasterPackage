import { Piece } from './piece';
import { Team } from './enums';
import { Move } from './move';
import { Tile } from './tile';

export class King extends Piece {
    public IsInCheck: boolean;

    constructor(public team: Team) {
        super('K' + team.toString(), team);
    }
    
    protected canMove(move: Move): boolean {
        return super.canMove(move);
    }

    public DoMove(move: Move) {
        if (this.canMove(move)) {
            super.DoMove(move);
        }
    }

    public RefreshAvailableMoves(): void {
        this.AvailableMoves = [];
        const fromTile: Tile = this.CurrentTile;

        if (fromTile.Up) {
            if ((fromTile.Up.Occupant && fromTile.Up.Occupant.team != this.team) || !fromTile.Up.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Up, this));
            }
        }

        if (fromTile.Left) {
            if ((fromTile.Left.Occupant && fromTile.Left.Occupant.team != this.team) || !fromTile.Left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Left, this));
            }
        }

        if (fromTile.Down) {
            if ((fromTile.Down.Occupant && fromTile.Down.Occupant.team != this.team) || !fromTile.Down.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Down, this));
            }
        }

        if (fromTile.Right) {
            if ((fromTile.Right.Occupant && fromTile.Right.Occupant.team != this.team) || !fromTile.Right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Right, this));
            }
        }

        if (fromTile.Up && fromTile.Up.Left) {
            if ((fromTile.Up.Left.Occupant && fromTile.Up.Left.Occupant.team != this.team) || !fromTile.Up.Left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Up.Left, this));
            }
        }

        if (fromTile.Up && fromTile.Up.Right) {
            if ((fromTile.Up.Right.Occupant && fromTile.Up.Right.Occupant.team != this.team) || !fromTile.Up.Right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Up.Right, this));
            }
        }

        if (fromTile.Down && fromTile.Down.Left) {
            if ((fromTile.Down.Left.Occupant && fromTile.Down.Left.Occupant.team != this.team) || !fromTile.Down.Left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Down.Left, this));
            }
        }

        if (fromTile.Down && fromTile.Down.Right) {
            if ((fromTile.Down.Right.Occupant && fromTile.Down.Right.Occupant.team != this.team) || !fromTile.Down.Right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Down.Right, this));
            }
        }
    }
}
