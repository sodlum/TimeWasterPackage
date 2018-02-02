import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Grid } from './grid';
import { Tile } from './tile';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class MinesweeperGridComponent implements OnInit {
    @ViewChild('gridCanvas') canvas;
    Grid: Grid;
    Started: boolean;
    Over: boolean;
    highlight: boolean;
    flags: number = 0;
    title: string = 'Minesweeper';
    attributes = {
        height: 0,
        width: 0,
        mines: 0
    }

    constructor(private route: ActivatedRoute, private location: Location) { }

    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) => this.setAttributes({ 
            h: +params.get('height'), 
            w: +params.get('width'),
            m: +params.get('mines')
        })).subscribe(attr => this.attributes = attr);

        this.Started = false;
        this.Over = false;

        this.canvas.nativeElement.height = this.attributes.height * 30;
        this.canvas.nativeElement.width = this.attributes.width * 30;
        this.Grid = new Grid(this.attributes.height, this.attributes.width, this.attributes.mines);
        
        this.updateCanvas();
    }
    
    private setAttributes(attr: any) {
        this.attributes.height = attr.h;
        this.attributes.width = attr.w;
        this.attributes.mines = attr.m;
        return Promise.resolve(attr);
    }

    HandleClick(evt: any, isRightClick: boolean) {
        debugger;
        if (this.Over) {
            return false;
        }

        let rect = this.canvas.nativeElement.getBoundingClientRect();
        let x = Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * this.canvas.nativeElement.width);
        let y = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.nativeElement.height);
        let x_pos = 0;
        let y_pos = 0;
        const x_len = Math.round(this.canvas.nativeElement.width / this.Grid.Width);
        const y_len = Math.round(this.canvas.nativeElement.height / this.Grid.Height);

        const this_tile = this.Grid.Tiles.forEach(tile => {
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

        if (isRightClick) {
            if (this_tile.ToggleFlag()) {
                this.flags++;
            } else {
                this.flags--;
            }
        } else {
            if (!this.Started) {
                this.Start(this_tile);
            }

            if (this_tile.IsUncovered && !this_tile.IsFlagged) {
                this_tile.ShowNeighbors = true;
            }
    
            this_tile.UncoverTile(true);

            if (this.Grid.CheckEndGame()) {
                this.Over = true;
            }
        }

        this.updateCanvas();

        return false;
    }

    private updateCanvas(): void {
        const context = this.canvas.nativeElement.getContext('2d');

        //fillRect(x_pos, y_pos, x_len, y_len);
        let x_pos = 0;
        let y_pos = 0;
        const x_len = Math.round(this.canvas.nativeElement.width / this.Grid.Width);
        const y_len = Math.round(this.canvas.nativeElement.height / this.Grid.Height);

        this.Grid.Tiles.forEach(tile => {
            context.fillStyle = 'black';
            context.fillRect(x_pos, y_pos, x_len, y_len);

            if (tile.IsUncovered) {
                if (tile.IsMine) { 
                    context.fillStyle = 'red';
                    context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
                } else {
                    context.fillStyle = 'grey';
                    context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
                    
                    switch (tile.NearbyMines) {
                        case 1:
                            context.fillStyle = 'blue';
                            break;
                        case 2:
                            context.fillStyle = 'green';
                            break;
                        case 3:
                            context.fillStyle = 'red';
                            break;
                        case 4:
                            context.fillStyle = 'purple';
                            break;
                        case 5:
                            context.fillStyle = 'brown';
                            break;
                        case 6:
                            context.fillStyle = 'teal';
                            break;
                        case 7:
                            context.fillStyle = 'black';
                            break;
                        case 8:
                            context.fillStyle = 'lightgrey';
                            break;
                        default:
                            context.fillStyle = 'grey';
                            break;
                    }
    
                    if (tile.NearbyMines > 0) {
                        context.font = '20px sans-serif';
                        context.fillText(tile.NearbyMines.toString(), Math.floor(x_pos + x_len / 2) - 7.5, Math.floor(y_pos + y_len / 2) + 7.5);
                    }
                }
            } else if (tile.IsFlagged) {
                context.fillStyle = 'green';
                context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
            } else {
                context.fillStyle = 'lightgrey';
                context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
            }

            if (this.Over) {
                if (tile.IsMine && !tile.IsFlagged) {
                    context.fillStyle = 'red';
                    context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
                } else if (tile.IsFlagged) {
                    if (tile.IsMine) {
                        context.fillStyle = 'green';
                        context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
                    } else {
                        context.fillStyle = 'orange';
                        context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
                    }
                }
            }

            if (this.highlight) {
                if (!tile.IsUncovered && !tile.IsFlagged) {
                    context.fillStyle = 'yellow';
                    context.fillRect(x_pos + 2, y_pos + 2, x_len - 4, y_len - 4);
                }
            }
            
            x_pos += x_len;
            
            if (x_pos + x_len > this.canvas.nativeElement.width) {
                y_pos += y_len;
                x_pos = 0;
            }

            return tile;
        });
    }

    toggleHighlight(): void {
        this.updateCanvas();
    }

    Start(tile: Tile): void {
        this.Grid.GenerateMines(tile);
        this.Started = true;
    }

    goBack(): void {
        this.location.back();
    }
}
