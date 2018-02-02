import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-sliding-puzzle',
    templateUrl: './sliding-puzzle.component.html',
    styleUrls: ['./sliding-puzzle.component.css']
})
export class SlidingPuzzleComponent {
    height: number;
    width: number;
    title: string = 'Sliding Puzzle';

    constructor(private router: Router, private location: Location) { }

    startGame(): void {
        this.router.navigate(['/sliding-puzzle/grid/' + this.height + '/' + this.width]);
    }

    goBack(): void {
        this.location.back();
    }
}
