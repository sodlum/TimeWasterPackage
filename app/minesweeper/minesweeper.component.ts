import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-mines',
    templateUrl: './minesweeper.component.html',
    styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent {
    height: number;
    width: number;
    mines: number;
    title: string = 'Minesweeper';
    
    constructor(private router: Router, private location: Location) { }

    startGame(): void {
        this.router.navigate(['./mines/grid/' + this.height + '/' + this.width + '/' + this.mines]);
    }

    goBack(): void {
        this.location.back();
    }
}
