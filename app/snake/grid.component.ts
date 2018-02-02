import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Grid } from './grid';
import { EndState, Direction } from './enums';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class SnakeGridComponent implements OnInit {
    @ViewChild('gridCanvas') canvas;
    title: string = 'Snake';
    grid: Grid;
    level: number;
    endState: EndState;
    timer: Subscription;
    context: any;
    awaitingMove: boolean;
    attributes: any = {
        level: 0,
        height: 0,
        width: 0
    }

    constructor(private route: ActivatedRoute, private location: Location) { }

    private setAttributes(l: number, h: number, w: number): Promise<number> {
        this.attributes.level = l;
        this.attributes.height = h;
        this.attributes.width = w;
        return Promise.resolve(this.attributes);
    }

    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) => this.setAttributes(+params.get('level'), +params.get('height'), +params.get('width'))).subscribe(attr => this.attributes = attr);
        this.grid = new Grid(this.attributes.height, this.attributes.width);
        this.awaitingMove = false;
        this.context = this.canvas.nativeElement.getContext('2d');
        this.updateCanvas('black');
        const self = this;
        setTimeout(function() {
            self.timer = Observable.interval(1000 / self.attributes.level).map(() => self.moveSnake()).subscribe(() => self.updateCanvas('black'));
        }, 0);
    }

    @HostListener('document:keyup', ['$event.which'])
    HandleKeyUp(which: number): void {
        // 37 - ArrowLeft
        // 38 - ArrowUp
        // 39 - ArrowRight
        // 40 - ArrowDown

        if (this.awaitingMove) {
            return;
        }

        this.awaitingMove = true;

        switch (which) {
            case 37:
                this.grid.TurnLeft();
                break;
            case 38:
                this.grid.TurnUp();
                break;
            case 39:
                this.grid.TurnRight();
                break;
            case 40:
                this.grid.TurnDown();
                break;
            default:
                // other key was pressed
                break;
        }
    }

    private moveSnake(): void {
        this.awaitingMove = false;
        this.endState = this.grid.MoveSnake();

        if (this.endState !== EndState.None) {
            console.log(this.endState);
            this.timer.unsubscribe();

            if (this.endState === EndState.Win) {
                this.updateCanvas('green');
            } else {
                this.updateCanvas('red');
            }
        }
    }

    private updateCanvas(color: string): void {
        debugger;
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, 100, 100);
        // rect(x, y, rectWidth, rectHeight);
        this.context.beginPath();

        const head_tile = this.grid.tiles.forEach(tile => {
            if (!tile.nextTile && tile.prevTile) {
                return tile;
            }
        })[0];

        const dot_tile = this.grid.tiles.forEach(tile => {
            if (tile.isDot) { return tile; }
        })[0];

        let tile = head_tile;

        do {
            this.context.rect(tile.x * 10 + 1, tile.y * 10 + 1, 8, 8);
            
            if (tile.nextTile) {
                switch(tile.direction) {
                    case Direction.Up:
                        this.context.rect(tile.x * 10 + 1, tile.y * 10, 8, 1);
                        break;
                    case Direction.Down:
                        this.context.rect(tile.x * 10 + 1, tile.y * 10 + 9, 8, 1);
                        break;
                    case Direction.Left:
                        this.context.rect(tile.x * 10, tile.y * 10 + 1, 1, 8);
                        break;
                    case Direction.Right:
                        this.context.rect(tile.x * 10 + 9, tile.y * 10 + 1, 1, 8);
                        break;
                }
            }

            if (tile.prevTile) {
                switch(tile.prevTile.direction) {
                    case Direction.Down:
                        this.context.rect(tile.x * 10 + 1, tile.y * 10, 8, 1);
                        break;
                    case Direction.Up:
                        this.context.rect(tile.x * 10 + 1, tile.y * 10 + 9, 8, 1);
                        break;
                    case Direction.Right:
                        this.context.rect(tile.x * 10, tile.y * 10 + 1, 1, 8);
                        break;
                    case Direction.Left:
                        this.context.rect(tile.x * 10 + 9, tile.y * 10 + 1, 1, 8);
                        break;
                }
            }

            tile = tile.prevTile;
        } while (tile);

        if (dot_tile) {
            this.context.rect(dot_tile.x * 10 + 3, dot_tile.y * 10 + 3, 4, 4);
        }

        this.context.fillStyle = color;
        this.context.fill();
    }

    private goBack(): void {
        this.location.back();
    }
}
