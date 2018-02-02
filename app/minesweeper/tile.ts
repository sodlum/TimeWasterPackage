export class Tile {
    IsMine: boolean;
    IsUncovered: boolean;
    IsFlagged: boolean;
    NearbyMines: number;
    NearbyFlags: number;
    Neighbors: Tile[];
    ShowNeighbors: boolean;

    constructor(public xLocation: number, public yLocation: number) {
        this.Neighbors = [];
        this.NearbyMines = 0;
        this.NearbyFlags = 0;
        this.IsMine = false;
        this.IsUncovered = false;
        this.IsFlagged = false;
        this.ShowNeighbors = false;
    }

    UncoverTile(isRecursive: boolean): void {
        if (this.IsFlagged) {
            return;
        } else if (this.IsMine) {
            this.IsUncovered = true;
            return;
        } else if (this.IsUncovered) {
            if (this.ShowNeighbors) {
                this.ShowNeighbors = false;
                this.UncoverTiles();
            }

            return;
        }

        this.IsUncovered = true;

        if (this.NearbyMines === 0 && isRecursive) {
            for (let i = 0; i < this.Neighbors.length; i++) {
                let mines = 0;
                const tile = this.Neighbors[i];

                for (let j = 0; j < tile.Neighbors.length; j++) {
                    if (tile.Neighbors[j].IsMine) {
                        mines++;
                    }
                }

                tile.UncoverTile(mines === 0);
            }
        }
    }

    UncoverTiles(): void {
        if (this.NearbyFlags === this.NearbyMines) {
            for (let i = 0; i < this.Neighbors.length; i++) {
                const tile = this.Neighbors[i];

                if (!tile.IsUncovered && !tile.IsFlagged) {
                    tile.UncoverTile(true);
                }
            }
        }
    }

    ToggleFlag(): boolean {
        if (this.IsUncovered) { return ; }

        this.IsFlagged = !this.IsFlagged;

        for (let i = 0; i < this.Neighbors.length; i++) {
            const tile = this.Neighbors[i];

            if (this.IsFlagged) {
                tile.NearbyFlags++;
            } else {
                tile.NearbyFlags--;
            }
        }

        return this.IsFlagged;
    }
}
