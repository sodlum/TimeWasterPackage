import { Section } from './section';
import { CardinalDirection } from './enums';

export class Piece {
    private _sections: Section[];
    public AnchorSection: Section;
    public AnchorX: number;
    public AnchorY: number;
    public Direction: CardinalDirection;
    public Color: string;

    constructor(type: string) {
        this.Direction = CardinalDirection.North;
        this._sections = [];
        this._sections.push(new Section());
        this._sections.push(new Section());
        this._sections.push(new Section());
        this._sections.push(new Section());

        this[type]();
    }

    private type0(): void {
        this._sections[0].Side_A = this._sections[1];
        this._sections[1].Side_A = this._sections[2];
        this._sections[2].Side_A = this._sections[3];
        this._sections[3].Side_C = this._sections[2];
        this._sections[2].Side_C = this._sections[1];
        this._sections[1].Side_C = this._sections[0];

        this.AnchorSection = this._sections[1];
        this.Color = 'Orange';

        /*
            0123
        */
    }

    private type1(): void {
        this._sections[0].Side_A = this._sections[1];
        this._sections[1].Side_A = this._sections[2];
        this._sections[1].Side_B = this._sections[3];
        this._sections[2].Side_C = this._sections[1];
        this._sections[1].Side_C = this._sections[0];
        this._sections[3].Side_D = this._sections[1];

        this.AnchorSection = this._sections[1];
        this.Color = 'Green';
        
        /*
             3
            012
        */
    }

    private type2(): void {
        this._sections[0].Side_A = this._sections[1];
        this._sections[1].Side_D = this._sections[2];
        this._sections[2].Side_A = this._sections[3];
        this._sections[3].Side_C = this._sections[2];
        this._sections[2].Side_B = this._sections[1];
        this._sections[1].Side_C = this._sections[0];

        this.AnchorSection = this._sections[1];
        this.Color = 'Yellow';

        /*
            01
             23
        */
    }

    private type3(): void {
        this._sections[0].Side_A = this._sections[1];
        this._sections[1].Side_C = this._sections[0];
        this._sections[0].Side_D = this._sections[3];
        this._sections[3].Side_B = this._sections[0];
        this._sections[2].Side_A = this._sections[3];
        this._sections[3].Side_C = this._sections[2];

        this.AnchorSection = this._sections[0];
        this.Color = 'Blue';

        /*
             01
            23
        */
    }

    private type4(): void {
        this._sections[0].Side_A = this._sections[1];
        this._sections[1].Side_A = this._sections[2];
        this._sections[2].Side_D = this._sections[3];
        this._sections[3].Side_B = this._sections[2];
        this._sections[2].Side_C = this._sections[1];
        this._sections[1].Side_C = this._sections[0];

        this.AnchorSection = this._sections[2];
        this.Color = 'Red';

        /*
            012
              3
        */
    }

    private type5(): void {
        this._sections[0].Side_A = this._sections[1];
        this._sections[1].Side_A = this._sections[2];
        this._sections[0].Side_D = this._sections[3];
        this._sections[3].Side_B = this._sections[0];
        this._sections[2].Side_C = this._sections[1];
        this._sections[1].Side_C = this._sections[0];
        
        this.AnchorSection = this._sections[0];
        this.Color = 'Brown';

        /*
            012
            3
        */
    }

    private type6(): void {
        this._sections[0].Side_A = this._sections[1];
        this._sections[0].Side_D = this._sections[2];
        this._sections[1].Side_C = this._sections[0];
        this._sections[1].Side_D = this._sections[3];
        this._sections[2].Side_A = this._sections[3];
        this._sections[2].Side_B = this._sections[0];
        this._sections[3].Side_C = this._sections[2];
        this._sections[3].Side_B = this._sections[1];

        this.AnchorSection = this._sections[0];
        this.Color = 'Black'

        /*
            01
            23
        */
    }
}