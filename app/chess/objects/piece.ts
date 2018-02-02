import { Team } from './enums';
import { Move } from './move';
import { Tile } from './tile';

export abstract class Piece {
    AvailableMoves: Move[];
    CurrentTile: Tile;

    constructor(public ID: string, public team: Team) {
        this.AvailableMoves = [];
    }

    protected canMove(move: Move): boolean {
        for (var i = 0; i < this.AvailableMoves.length; i++) {
            if (!move.Equals(this.AvailableMoves[i])) {
                return false;
            }
        }

        return true;
    }

    public DoMove(move: Move): void {
        move.ToTile.Occupant = this;
        move.FromTile.Occupant = null;
        
        this.CurrentTile = move.ToTile;
    }

    public abstract RefreshAvailableMoves(): void;
}
