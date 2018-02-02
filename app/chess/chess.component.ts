import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-chess',
    templateUrl: './chess.component.html',
    styleUrls: ['./chess.component.css']
})
export class ChessComponent {
    title: string = 'Chess';
    
    constructor(private router: Router, private location: Location) { }

    startGame(): void {
        this.router.navigate(['./chess/grid/']);
    }

    goBack(): void {
        this.location.back();
    }
}