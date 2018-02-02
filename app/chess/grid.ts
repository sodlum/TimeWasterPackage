import { TileCollection } from './tilecollection';
import { Piece } from './objects/piece';
import { Pawn } from './objects/pawn';
import { Rook } from './objects/rook';
import { Knight } from './objects/knight';
import { Bishop } from './objects/bishop';
import { Queen } from './objects/queen';
import { King } from './objects/king';
import { Tile } from './objects/tile';
import { Move } from './objects/move';
import { Team } from './objects/enums';

export class Grid {
    Tiles: TileCollection;

    constructor() {
        this.Tiles = new TileCollection(8, 8);
        let piece: Piece = null;
        
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                const tile: Tile = this.Tiles.GetTile(x, y);

                tile.Up = this.Tiles.GetTile(x, y - 1);
                tile.Left = this.Tiles.GetTile(x - 1, y);
                tile.Down = this.Tiles.GetTile(x, y + 1);
                tile.Right = this.Tiles.GetTile(x + 1, y);

                if (x == 0) {
                    if (y == 0 || y == 7) {
                        piece = new Rook(Team.Black);
                    } else if (y == 1 || y == 6) {
                        piece = new Knight(Team.Black);
                    } else if (y == 2 || y == 5) {
                        piece = new Bishop(Team.Black);
                    } else if (y == 3) {
                        piece = new King(Team.Black);
                    } else {
                        piece = new Queen(Team.Black);
                    }
                } else if (x == 1 || x == 6) {
                    if (x == 1) {
                        piece = new Pawn(Team.Black);
                    } else {
                        piece = new Pawn(Team.White);
                    }
                } else if (x == 7) {
                    if (y == 0 || y == 7) {
                        piece = new Rook(Team.White);
                    } else if (y == 1 || y == 6) {
                        piece = new Knight(Team.White);
                    } else if (y == 2 || y == 5) {
                        piece = new Bishop(Team.White);
                    } else if (y == 3) {
                        piece = new King(Team.White);
                    } else {
                        piece = new Queen(Team.White);
                    }
                }
                
                tile.Occupant = piece;

                if (piece) {
                    piece.CurrentTile = tile;
                }
            }
        }
    }

    public MovePiece(src: Tile, dest: Tile): void {
        if (!src.Occupant) {
            return;
        } else {
            const piece = src.Occupant;
            const move = new Move(src, dest, piece);
            piece.DoMove(move);
        }
    }
}