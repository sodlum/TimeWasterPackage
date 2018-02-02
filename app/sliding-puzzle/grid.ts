import { Tile } from './tile';
import { TileCollection } from './tilecollection';

export class Grid {
    Tiles: TileCollection;
    moves: number;
    eX: number;
    eY: number;

    constructor(public height: number, public width: number) {
        this.Tiles = new TileCollection(height, width);
        this.eX = width - 1;
        this.eY = height - 1;
    }

    private shiftUp(src: Tile): void {
        var tiles = this.Tiles.forEach(false, tile => {
            if (tile) {
                if (tile.x === src.x) {
                    if (tile.y > this.eY && tile.y <= src.y) {
                        return tile;
                    }
                }
            }
        });

        for (let idx = 0; idx < tiles.length; idx++) {
            this.Tiles.Swap(tiles[idx].x, tiles[idx].y, this.eX, this.eY);
            tiles[idx].ShiftUp();
            this.moves++;
            this.eY++;
        }
    }

    private shiftDown(src: Tile): void {
        var tiles = this.Tiles.forEach(false, tile => {
            if (tile) {
                if (tile.x === src.x) {
                    if (tile.y < this.eY && tile.y >= src.y) {
                        return tile;
                    }
                }
            }
        });

        for (let idx = tiles.length - 1; idx >= 0; idx--) {
            this.Tiles.Swap(tiles[idx].x, tiles[idx].y, this.eX, this.eY);
            tiles[idx].ShiftDown();
            this.moves++;
            this.eY--;
        }
    }

    private shiftLeft(src: Tile): void {
        var tiles = this.Tiles.forEach(false, tile => {
            if (tile) {
                if (tile.y === src.y) {
                    if (tile.x > this.eX && tile.x <= src.x) {
                        return tile;
                    }
                }
            }
        });

        for (let idx = 0; idx < tiles.length; idx++) {
            this.Tiles.Swap(tiles[idx].x, tiles[idx].y, this.eX, this.eY);
            tiles[idx].ShiftLeft();
            this.moves++;
            this.eX++;
        }
    }

    private shiftRight(src: Tile): void {
        var tiles = this.Tiles.forEach(false, tile => {
            if (tile) {
                if (tile.y === src.y) {
                    if (tile.x < this.eX && tile.x >= src.x) {
                        return tile;
                    }
                }
            }
        });

        for (let idx = tiles.length - 1; idx >= 0; idx--) {
            this.Tiles.Swap(tiles[idx].x, tiles[idx].y, this.eX, this.eY);
            tiles[idx].ShiftRight();
            this.moves++;
            this.eX--;
        }
    }

    ShiftTiles(src_tile: Tile): void {
        if (!src_tile) { return; }

        if (src_tile.x === this.eX && src_tile.y > this.eY) {
            this.shiftUp(src_tile);
        } else if (src_tile.x === this.eX && src_tile.y < this.eY) {
            this.shiftDown(src_tile);
        } else if (src_tile.x > this.eX && src_tile.y === this.eY) {
            this.shiftLeft(src_tile);
        } else if (src_tile.x < this.eX && src_tile.y === this.eY) {
            this.shiftRight(src_tile);
        } else {
            // Clicked tile is neither in row or column of empty tile
            return;
        }
    }

    RandomizeTiles(): void {
        debugger;
        const iterations = (this.width * this.height) + 1000;

        for (let i = 0; i < iterations; i++) {
            

            if (Math.floor(Math.random() * 2) > 0) {
                let rng = this.eX;
    
                while(rng === this.eX) {
                    rng = Math.floor(Math.random() * (this.width));
                }
    
                this.ShiftTiles(this.Tiles.GetTile(rng, this.eY));
            } else {
                let rng = this.eY;
    
                while(rng === this.eY) {
                    rng = Math.floor(Math.random() * (this.height));
                }
    
                this.ShiftTiles(this.Tiles.GetTile(rng, this.eX));
            }
        }

        this.moves = 0;
    }

    CheckEndGame(): boolean {
        let idx = 1;
        let isEnd = true;

        this.Tiles.forEach(false, tile => {
            if (tile) {
                if (idx !== tile.ID) {
                    isEnd = false;
                }
    
                idx++;
    
                return tile;
            } else if (!tile && idx < (this.height * this.width) - 1) {
                isEnd = false;
            }
        });

        return isEnd;
    }
}