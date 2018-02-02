export class Tile {
    constructor(public x: number, public y: number, public ID: number, public isBlank: boolean) { }

    ShiftRight(): void {
        this.x++;
    }

    ShiftLeft(): void {
        this.x--;
    }

    ShiftUp(): void {
        this.y--;
    }

    ShiftDown(): void {
        this.y++;
    }
}
