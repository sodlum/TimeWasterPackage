import { Tile } from './tile';

export class TileCollection {
    private _tiles: Tile[][];

    constructor(private height: number, private width: number) {
        this._tiles = [];

        let num_tiles = 0;

        for (let i = 0; i < height; i++) {
            this._tiles[i] = [];

            for (let j = 0; j < width; j++) {
                this._tiles[i][j] = new Tile(j, i, ++num_tiles, false);
            }
        }

        this._tiles[height - 1][width - 1].isBlank = true;
    }

    Swap(src_x: number, src_y: number, dst_x: number, dst_y: number): void {
        const temp: Tile = this._tiles[src_y][src_x];
        this._tiles[src_y][src_x] = this._tiles[dst_y][dst_x];
        this._tiles[dst_y][dst_x] = temp;
    }

    GetTile(x: number, y: number): Tile {
        const col = this._tiles[y];

        if (col) {
            return this._tiles[y][x];
        } else {
            return null;
        }
    }

    private iterate = function* () {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                yield this._tiles[i][j];
            }
        }
    }

    forEach(includeBlank: boolean, callbackfn: (value: Tile) => Tile): Tile[] {
        const iterator = this.iterate();
        let node: IteratorResult<Tile> = null;
        const tiles: Tile[] = [];

        do {
            node = iterator.next();
            const tile = callbackfn(node.value);

            if ((tile && !tile.isBlank) || includeBlank) {
                tiles.push(tile);
            }
        } while (!node.done);

        return tiles;
    }
}
