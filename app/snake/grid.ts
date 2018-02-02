import { TileCollection } from './tilecollection';
import { Tile } from './tile';
import { Snake } from './snake';
import { Direction, EndState } from './enums';

export class Grid {
    tiles: TileCollection;
    head_tile: Tile;
    tail_tile: Tile;
    snake: Snake;

    constructor(public height: number, public width: number) {
        this.tiles = new TileCollection(this.height, this.width);
        this.snake = new Snake();

        const y_start = Math.floor((this.height - 1) / 2);
        const x_start = Math.floor((this.width - 1) / 4);

        const headTile = this.tiles.GetTile(x_start, y_start);
        const tailTile = this.tiles.GetTile(x_start - 1, y_start);

        headTile.prevTile = tailTile;
        tailTile.nextTile = headTile;

        headTile.direction = Direction.Right;
        tailTile.direction = Direction.Right;

        this.head_tile = headTile;
        this.tail_tile = tailTile;

        this.placeDot();
    }

    private placeDot(): boolean {
        const tiles = this.tiles.forEach(tile => { if (!tile.nextTile && !tile.prevTile && !tile.isDot) { return tile; } } );

        if (!tiles.length) {
            return false;
        }

        const rnd = Math.floor(Math.random() * (tiles.length - 1));

        tiles[rnd].isDot = true;

        return true;
    }

    TurnLeft(): boolean {
        if (this.snake.direction === Direction.Left || this.snake.direction === Direction.Right) {
            return false;
        } else {
            this.snake.SetDirection(Direction.Left);
            this.head_tile.direction = Direction.Left;
        }

        return true;
    }

    TurnRight(): boolean {
        if (this.snake.direction === Direction.Left || this.snake.direction === Direction.Right) {
            return false;
        } else {
            this.snake.SetDirection(Direction.Right);
            this.head_tile.direction = Direction.Right;
        }

        return true;
    }

    TurnUp(): boolean {
        if (this.snake.direction === Direction.Down || this.snake.direction === Direction.Up) {
            return false;
        } else {
            this.snake.SetDirection(Direction.Up);
            this.head_tile.direction = Direction.Up;
        }

        return true;
    }

    TurnDown(): boolean {
        if (this.snake.direction === Direction.Down || this.snake.direction === Direction.Up) {
            return false;
        } else {
            this.snake.SetDirection(Direction.Down);
            this.head_tile.direction = Direction.Down;
        }

        return true;
    }

    private getNextTile(source: Tile): Tile {
        let this_tile: Tile = null;

        switch (source.direction) {
            case Direction.Right:
                this_tile = this.tiles.GetTile(source.x + 1, source.y);
                break;
            case Direction.Up:
                this_tile = this.tiles.GetTile(source.x, source.y - 1);
                break;
            case Direction.Left:
                this_tile = this.tiles.GetTile(source.x - 1, source.y);
                break;
            case Direction.Down:
                this_tile = this.tiles.GetTile(source.x, source.y + 1);
                break;
        }

        return this_tile;
    }

    MoveSnake(): EndState {
        let this_tile: Tile = this.head_tile;
        let next_tile: Tile = null;

        while (this_tile.prevTile) {
            if (!this_tile.nextTile) {
                next_tile = this.getNextTile(this_tile);

                if (!next_tile || next_tile.nextTile || next_tile.prevTile) {
                    if (!next_tile) {
                        return EndState.Loss;
                    } else {
                        if (!this.tiles.forEach(tile => { if (!tile.nextTile || !tile.prevTile) { return tile; }}).length) {
                            return EndState.Win;
                        } else {
                            return EndState.Loss;
                        }
                    }
                }

                this_tile.nextTile = next_tile;
                next_tile.prevTile = this_tile;
                next_tile.direction = this_tile.direction;
                this.head_tile = next_tile;
            } else {
                next_tile = this_tile.nextTile;
            }

            this_tile = this_tile.prevTile;
        }

        this_tile = next_tile.prevTile;

        if (!this.head_tile.isDot) {
            this.tail_tile.nextTile = null;
            this.tail_tile = this_tile;
            this.tail_tile.prevTile = null;
        } else {
            this.tail_tile.nextTile = this_tile;
            this.head_tile.isDot = false;
            this.placeDot();
        }

        return EndState.None;
    }
}
