import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-tetris',
    templateUrl: './tetris.component.html',
    styleUrls: ['./tetris.component.css']
})
export class TetrisComponent {
    title = 'Tetris';

    constructor(private router: Router, private location: Location) { }
    
    startGame(level: number): void {
        this.router.navigate(['/tetris/grid']);
    }

    goBack(): void {
        this.location.back();
    }
}
