import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TimeWasterComponent } from './time-waster.component';

// Snake
import { SnakeComponent } from './snake/snake.component';
import { SnakeGridComponent } from './snake/grid.component';

// Sliding Puzzle
import { SlidingPuzzleComponent } from './sliding-puzzle/sliding-puzzle.component';
import { SlidingPuzzleGridComponent } from './sliding-puzzle/grid.component';

// Minesweeper
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { MinesweeperGridComponent } from './minesweeper/grid.component';

// Chess
import { ChessComponent } from './chess/chess.component';
import { ChessGridComponent } from './chess/grid.component';

// Tetris
import { TetrisComponent } from './tetris/tetris.component';
import { TetrisGridComponent } from './tetris/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeWasterComponent,
    SnakeComponent,
    SnakeGridComponent,
    SlidingPuzzleComponent,
    SlidingPuzzleGridComponent,
    MinesweeperComponent,
    MinesweeperGridComponent,
    ChessComponent,
    ChessGridComponent,
    TetrisComponent,
    TetrisGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'main',
        component: TimeWasterComponent
      },
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      },
      {
        path: 'snake',
        component: SnakeComponent
      },
      {
        path: 'snake/grid/:level/:height/:width',
        component: SnakeGridComponent
      },
      {
        path: 'sliding-puzzle',
        component: SlidingPuzzleComponent
      },
      {
        path: 'sliding-puzzle/grid/:height/:width',
        component: SlidingPuzzleGridComponent
      },
      {
        path: 'mines',
        component: MinesweeperComponent
      },
      {
        path: 'mines/grid/:height/:width/:mines',
        component: MinesweeperGridComponent
      },
      {
        path: 'chess',
        component: ChessComponent
      },
      {
        path: 'chess/grid',
        component: ChessGridComponent
      },
      {
        path: 'tetris',
        component: TetrisComponent
      },
      {
        path: 'tetris/grid',
        component: TetrisGridComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
