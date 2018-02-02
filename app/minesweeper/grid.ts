import { Tile } from './tile';
import { TileCollection } from './tilecollection';

export class Grid {
    Tiles: TileCollection;

    constructor(public Height: number, public Width: number, public Mines: number) {
        this.Tiles = new TileCollection(Height, Width);
        this.PopulateSurroundingTiles();
    }

    CheckEndGame(): boolean {
        let uncovered_tiles = 0;
        let mine_uncovered = false;
        
        this.Tiles.forEach(tile => {
            if (tile.IsUncovered) {
                uncovered_tiles++;

                if (tile.IsMine) {
                    mine_uncovered = true;
                }
            }

            return tile;
        });

        if (((this.Height * this.Width) - uncovered_tiles === this.Mines) || mine_uncovered) {
            return true;
        }
        
        return false;
    }

    GenerateMines(tile: Tile): void {
        let mine_count = 0;
        let x = 0;
        let y = 0;

        while (mine_count < this.Mines) {
            let t: Tile = null;

            do {
                x = Math.floor(Math.random() * (this.Width - 1));
                y = Math.floor(Math.random() * (this.Height - 1));
                t = this.Tiles.GetTile(x, y);
            } while (t && (t.IsMine || t == tile));

            t.IsMine = true;

            for (var i = 0; i < t.Neighbors.length; i++) {
                t.Neighbors[i].NearbyMines++;
            }

            mine_count++;
        }
    }

    PopulateSurroundingTiles(): void {
        for (let x = 0; x < this.Width; x++) {
            for (let y = 0; y < this.Height; y++) {
                const tile: Tile = this.Tiles.GetTile(x, y);

                for (let xx = 0; xx < this.Width; xx++) {
                    for (let yy = 0; yy < this.Height; yy++) {
                        const cTile: Tile = this.Tiles.GetTile(xx, yy);

                        if ((tile.xLocation === cTile.xLocation + 1 && tile.yLocation === cTile.yLocation + 1) ||
                            (tile.xLocation === cTile.xLocation && tile.yLocation === cTile.yLocation + 1) ||
                            (tile.xLocation === cTile.xLocation - 1 && tile.yLocation === cTile.yLocation + 1) ||
                            (tile.xLocation === cTile.xLocation + 1 && tile.yLocation === cTile.yLocation) ||
                            (tile.xLocation === cTile.xLocation - 1 && tile.yLocation === cTile.yLocation) ||
                            (tile.xLocation === cTile.xLocation + 1 && tile.yLocation === cTile.yLocation - 1) ||
                            (tile.xLocation === cTile.xLocation && tile.yLocation === cTile.yLocation - 1) ||
                            (tile.xLocation === cTile.xLocation - 1 && tile.yLocation === cTile.yLocation - 1)) {
                            tile.Neighbors.push(cTile);
                        }
                    }
                }
            }
        }
    }
}
