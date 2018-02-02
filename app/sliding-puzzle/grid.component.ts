import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Grid } from './grid';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class SlidingPuzzleGridComponent implements OnInit {
    @ViewChild('gridCanvas') canvas;
    context: any;
    grid: Grid;
    Over: boolean;
    title: string;
    attributes = {
        height: 0,
        width: 0
    }

    constructor(private route: ActivatedRoute, private location: Location) { }
    
    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) => this.setAttributes({ h: +params.get('height'), w: +params.get('width')})).subscribe(attr => this.attributes = attr);
        this.grid = new Grid(this.attributes.height, this.attributes.width);
        this.title = ((this.attributes.height * this.attributes.width) - 1).toString() + '-piece Sliding Puzzle';
        this.canvas.nativeElement.height = this.attributes.height * 50;
        this.canvas.nativeElement.width = this.attributes.width * 50;
        this.context = this.canvas.nativeElement.getContext('2d');
        this.grid.RandomizeTiles();
        this.updateCanvas();
    }

    private setAttributes(attr: any) {
        this.attributes.height = attr.h;
        this.attributes.width = attr.w;
        return Promise.resolve(attr);
    }

    
    @HostListener('document:keyup', ['$event.which'])
    HandleKeyUp(which: number): void {
        // 37 - ArrowLeft
        // 38 - ArrowUp
        // 39 - ArrowRight
        // 40 - ArrowDown
        if (this.Over) {
            return;
        }
        
        let tile = null;

        switch (which) {
            case 37:
                tile = this.grid.Tiles.GetTile(this.grid.eX + 1, this.grid.eY);
                break;
            case 38:
                tile = this.grid.Tiles.GetTile(this.grid.eX, this.grid.eY + 1);
                break;
            case 39:
                tile = this.grid.Tiles.GetTile(this.grid.eX - 1, this.grid.eY);
                break;
            case 40:
                tile = this.grid.Tiles.GetTile(this.grid.eX, this.grid.eY - 1);
                break;
            default:
                // other key was pressed
                break;
        }

        if (tile) {
            this.grid.ShiftTiles(tile);
            this.updateCanvas();
            
            if (this.grid.CheckEndGame()) {
                this.Over = true;
            }
        }
    }

    HandleClick(evt: any): void {
        if (this.Over) {
            return;
        }

        let rect = this.canvas.nativeElement.getBoundingClientRect();
        let x = Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * this.canvas.nativeElement.width);
        let y = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.nativeElement.height);
        let x_pos = 0;
        let y_pos = 0;
        const x_len = Math.round(this.canvas.nativeElement.width / this.grid.width);
        const y_len = Math.round(this.canvas.nativeElement.height / this.grid.height);

        const this_tile = this.grid.Tiles.forEach(false, tile => {
            let can_return = false;
            if (x_pos < x && x_pos + x_len >= x && y_pos < y && y_pos + y_len >= y) {
                can_return = true;
            }
            
            if (x_pos + x_len >= this.canvas.nativeElement.width) {
                y_pos += y_len;
                x_pos = 0;
            } else {
                x_pos += x_len;
            }

            if (can_return) {
                return tile;
            }
        })[0];

        this.grid.ShiftTiles(this_tile);
        this.updateCanvas();

        if (this.grid.CheckEndGame()) {
            this.Over = true;
        }
    }

    private updateCanvas(): void {
        //fillRect(x_pos, y_pos, x_len, y_len);
        let x_pos = 0;
        let y_pos = 0;
        const x_len = Math.round(this.canvas.nativeElement.width / this.grid.width);
        const y_len = Math.round(this.canvas.nativeElement.height / this.grid.height);

        this.grid.Tiles.forEach(true, tile => {
            if (tile && !tile.isBlank) {
                this.context.fillStyle = 'black';
                this.context.fillRect(x_pos, y_pos, x_len, y_len);
                this.context.fillStyle = 'grey';
                this.context.fillRect(x_pos + 1, y_pos + 1, x_len - 2, y_len - 2);
                this.context.fillStyle = 'black'
                this.context.font = '20px sans-serif';
                this.context.fillText(tile.ID.toString(), Math.floor(x_pos + x_len / 2) - 7.5, Math.floor(y_pos + y_len / 2) + 10);
            } else {
                this.context.clearRect(x_pos, y_pos, x_len, y_len);
            }

            x_pos += x_len;

            if (x_pos + x_len > this.canvas.nativeElement.width) {
                y_pos += y_len;
                x_pos = 0;
            }

            return tile;
        });
    }

    goBack(): void {
        this.location.back();
    }
}
