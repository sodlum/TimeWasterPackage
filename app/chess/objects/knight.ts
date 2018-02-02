import { Piece } from './piece';
import { Team } from './enums';
import { Move } from './move';
import { Tile } from './tile';

export class Knight extends Piece {
    constructor(public team: Team) {
        super('N' + team.toString(), team);
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
        
        if (fromTile.Down && fromTile.Down.Left && fromTile.Down.Left.Left) {
            if ((fromTile.Down.Left.Left.Occupant && fromTile.Down.Left.Left.Occupant.team !== this.team) || !fromTile.Down.Left.Left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Down.Left.Left, this));
            }
        }

        if (fromTile.Down && fromTile.Down.Right && fromTile.Down.Right.Right) {
            if ((fromTile.Down.Right.Right.Occupant && fromTile.Down.Right.Right.Occupant.team !== this.team) || !fromTile.Down.Right.Right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Down.Right.Right, this));
            }
        }

        if (fromTile.Up && fromTile.Up.Left && fromTile.Up.Left.Left) {
            if ((fromTile.Up.Left.Left.Occupant && fromTile.Up.Left.Left.Occupant.team !== this.team) || !fromTile.Up.Left.Left.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Up.Left.Left, this));
            }
        }

        if (fromTile.Up && fromTile.Up.Right && fromTile.Up.Right.Right) {
            if ((fromTile.Up.Right.Right.Occupant && fromTile.Up.Right.Right.Occupant.team !== this.team) || !fromTile.Up.Right.Right.Occupant) {
                this.AvailableMoves.push(new Move(fromTile, fromTile.Up.Right.Right, this));
            }
        }
    }
}
