import { Tile } from './tile';

export class TileCollection {
    private _tiles: Tile[][];

    constructor(private height: number, private width: number) {
        this._tiles = [];

        for (let i = 0; i < height; i++) {
            this._tiles[i] = [];

            for (let j = 0; j < width; j++) {
                this._tiles[i][j] = new Tile(j, i);
            }
        }
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

    forEach(callbackfn: (value: Tile) => Tile): Tile[] {
        const iterator = this.iterate();
        let node: IteratorResult<Tile> = null;
        const tiles: Tile[] = [];

        do {
            node = iterator.next();
            
            if (!node.done) {
                const tile = callbackfn(node.value);

                if (tile) {
                    tiles.push(tile);
                }
            }
        } while (!node.done);

        return tiles;
    }
}
