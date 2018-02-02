import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Grid } from './grid';
import { Tile } from './objects/tile';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class ChessGridComponent implements OnInit {
    @ViewChild('gridCanvas') canvas;
    title: string = 'Chess';
    Grid: Grid;

    constructor(private route: ActivatedRoute, private location: Location) { }
    
    ngOnInit(): void {
        this.Grid = new Grid();
        this.RefreshAllAvailableMoves();
        this.updateCanvas();
    }

    RefreshAllAvailableMoves(): void {
        this.Grid.Tiles.forEach(tile => {
            if (tile.Occupant) {
                tile.Occupant.RefreshAvailableMoves();
            }

            return tile;
        })
    }

    HandleClick(evt: any) {

    }

    updateCanvas(): void {
        const context = this.canvas.nativeElement.getContext('2d');
        
        //fillRect(x_pos, y_pos, x_len, y_len);
        let x_pos = 0;
        let y_pos = 0;
        const x_len = Math.round(this.canvas.nativeElement.width / 8);
        const y_len = Math.round(this.canvas.nativeElement.height / 8);

        let counter = 0;

        this.Grid.Tiles.forEach(tile => {
            context.fillStyle = 'black';
            context.fillRect(x_pos, y_pos, x_len, y_len);

            if (counter % 2 == 0) {
                context.fillStyle = 'lightgrey';
            } else {
                context.fillStyle = 'whith';
            }
            
            context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);

            counter++;

            x_pos += x_len;
            
            if (x_pos + x_len > this.canvas.nativeElement.width) {
                y_pos += y_len;
                x_pos = 0;
            }

            return tile;
        });
    }
}