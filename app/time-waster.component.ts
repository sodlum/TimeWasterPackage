import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-time-waster',
    templateUrl: './time-waster.component.html',
    styleUrls: ['./time-waster.component.css']
})
export class TimeWasterComponent {
    constructor(private router: Router) { }

    selectGame(game: string): void {
        this.router.navigate(['/' + game]);
    }
}
