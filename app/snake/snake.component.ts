import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.css']
})
export class SnakeComponent {
    title = 'Snake';

    constructor(private router: Router, private location: Location) { }
    
    startGame(level: number): void {
        this.router.navigate(['/snake/grid/' + level + '/10/10']);
    }

    goBack(): void {
        this.location.back();
    }
}
