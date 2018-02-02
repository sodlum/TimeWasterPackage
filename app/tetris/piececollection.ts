import { Piece } from './piece';

export class PieceCollection {
    private _pieces: Piece[];

    constructor() {
        this._pieces = [];
    }

    public AddPiece(piece: Piece) {
        this._pieces.push(piece);
    }

    public RemovePiece(piece: Piece) {
        let index: number = this._pieces.indexOf(piece, 0);
        this._pieces = this._pieces.splice(index, 1);
    }

    private iterate = function* () {
        for (let i = 0; i < this._pieces.length; i++) {
            yield this._pieces[i];
        }
    }

    forEach(callbackfn: (value: Piece) => Piece): Piece[] {
        const iterator = this.iterate();
        let node: IteratorResult<Piece> = null;
        const pieces: Piece[] = [];

        do {
            node = iterator.next();
            const piece = node.value ? callbackfn(node.value) : null;

            if (piece) {
                pieces.push(piece);
            }
        } while (!node.done);

        return pieces;
    }
}