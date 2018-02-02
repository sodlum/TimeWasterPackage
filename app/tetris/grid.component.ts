import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Piece } from './piece';
import { PieceCollection } from './piececollection';
import { CardinalDirection } from './enums';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class TetrisGridComponent implements OnInit {
    @ViewChild('gridCanvas') canvas;
    context: any;
    ActivePiece: Piece;
    CurrentPieces: PieceCollection;
    timer: Subscription;

    constructor(private route: ActivatedRoute, private location: Location) { }
    
    ngOnInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.CurrentPieces = new PieceCollection();
        const self = this;
        setTimeout(function() {
            self.timer = Observable.interval(1000).map(() => self.dropPiece()).subscribe(() => self.updateCanvas());
        }, 0);
    }

    @HostListener('document:keyup', ['$event.which'])
    HandleKeyUp(which: number): void {
        // 37 - ArrowLeft
        // 38 - ArrowUp
        // 39 - ArrowRight
        // 40 - ArrowDown

        switch (which) {
            case 37:
                this.movePiece(-10);
                break;
            case 38:
                this.rotatePiece();
                break;
            case 39:
                this.movePiece(10);
                break;
            case 40:
                this.dropPiece();
                break;
            default:
                break;
        }
    }

    private rotatePiece(): void {
        if (!this.ActivePiece || this.ActivePiece.Color == 'Black') {
            return;
        }

        let newDirection: CardinalDirection = this.ActivePiece.Direction;

        switch(this.ActivePiece.Direction) {
            case CardinalDirection.North:
                newDirection = CardinalDirection.West;
                break;
            case CardinalDirection.West:
                newDirection = CardinalDirection.South;
                break;
            case CardinalDirection.South:
                newDirection = CardinalDirection.East;
                break;
            case CardinalDirection.East:
                newDirection = CardinalDirection.North;
                break;
        }

        this.ActivePiece.Direction = newDirection;
        
        this.updateCanvas();
    }

    private movePiece(value: number): void {
        if (!this.ActivePiece) {
            return;
        }

        this.ActivePiece.AnchorX += value;

        this.updateCanvas();
    }

    private dropPiece(): void {
        if (!this.ActivePiece) {
            var rnd = Math.floor(Math.random() * 7);
            this.ActivePiece = new Piece('type' + rnd.toString());
            this.ActivePiece.AnchorX = 100;
            this.ActivePiece.AnchorY = 40;
            this.CurrentPieces.AddPiece(this.ActivePiece);
        }

        this.ActivePiece.AnchorY += 10;
    }

    private updateCanvas(): void {
        this.context.fillStyle = 'White';
        this.context.fillRect(0, 0, 200, 400);

        this.CurrentPieces.forEach(piece => {
            this.context.fillStyle = piece.Color;
            this.context.fillRect(piece.AnchorX, piece.AnchorY, 10, 10);

            switch (piece.Color) {
                case 'Orange':
                    // Anchor: 1
                    switch (piece.Direction) {
                        case CardinalDirection.North:
                            /*
                                0123
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX + 20, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_C) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.West:
                            /*
                                3
                                2
                                1
                                0
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY + 20, 10, 10);
                                
                                    if (piece.AnchorSection.Side_C) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.South:
                            /*
                                3210
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX - 20, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_C) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.East:
                            /*
                                0
                                1
                                2
                                3
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY - 20, 10, 10);
                                
                                    if (piece.AnchorSection.Side_C) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                    }

                    break;
                case 'Green':
                    // Anchor: 1
                    switch (piece.Direction) {
                        case CardinalDirection.North:
                            /*
                                -3-
                                012
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_C) {
                                    this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_B) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.West:
                            /*
                                -0
                                31
                                -2
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_C) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                    if (piece.AnchorSection.Side_B) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.South:
                            /*
                                012
                                -3-
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_C) {
                                    this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_B) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.East:
                            /*
                                2-
                                13
                                0-
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_C) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                    if (piece.AnchorSection.Side_B) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                    }
                    
                    break;
                case 'Yellow':
                    // Anchor: 1
                    switch (piece.Direction) {
                        case CardinalDirection.North:
                            /*
                                01-
                                -23
                            */  
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_A) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.West:
                            /*
                                3-
                                21
                                -0
                            */
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_A) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.South:
                            /*
                                -10
                                32-
                            */
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_A) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.East:
                            /*
                                0-
                                12
                                -3
                            */
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_A) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                    }
                    
                    break;
                case 'Blue':
                    // Anchor: 0
                    switch (piece.Direction) {
                        case CardinalDirection.North:
                            /*
                                -01
                                23-
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_C) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.West:
                            /*
                                1-
                                02
                                -3
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_C) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.South:
                            /*
                                -23
                                10-
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_C) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.East:
                            /*
                                3-
                                20
                                -1
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_D) {
                                    this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D.Side_C) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                    }

                    break;
                case 'Red':
                    // Anchor: 2
                    switch (piece.Direction) {
                        case CardinalDirection.North:
                            /*
                                012
                                --3
                            */
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_C.Side_C) {
                                    this.context.fillRect(piece.AnchorX - 20, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.West:
                            /*
                                23
                                1-
                                0-
                            */
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_C.Side_C) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY + 20, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.South:
                            /*
                                3--
                                210
                            */
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_C.Side_C) {
                                    this.context.fillRect(piece.AnchorX + 20, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.East:
                            /*
                                -0
                                -1
                                32
                            */
                            if (piece.AnchorSection.Side_C) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_C.Side_C) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY - 20, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                    }

                    break;
                case 'Brown':
                    // Anchor: 0
                    switch (piece.Direction) {
                        case CardinalDirection.North:
                            /*
                                012
                                3--
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX + 20, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.West:
                            /*
                                2-
                                1-
                                03
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY - 20, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.South:
                            /*
                                --3
                                210
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX - 20, piece.AnchorY, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX, piece.AnchorY - 10, 10, 10);
                                    }
                                }
                            }

                            break;
                        case CardinalDirection.East:
                            /*
                                30
                                -1
                                -2
                            */
                            if (piece.AnchorSection.Side_A) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                                
                                if (piece.AnchorSection.Side_A.Side_A) {
                                    this.context.fillRect(piece.AnchorX, piece.AnchorY + 20, 10, 10);
                                
                                    if (piece.AnchorSection.Side_D) {
                                        this.context.fillRect(piece.AnchorX - 10, piece.AnchorY, 10, 10);
                                    }
                                }
                            }

                            break;
                    }
                    
                    break;
                case 'Black':
                    // Anchor: 0
                    // This piece does not rotate
                    /*
                        01
                        23
                    */
                    if (piece.AnchorSection.Side_A) {
                        this.context.fillRect(piece.AnchorX + 10, piece.AnchorY, 10, 10);
                        
                        if (piece.AnchorSection.Side_A.Side_D) {
                            this.context.fillRect(piece.AnchorX + 10, piece.AnchorY + 10, 10, 10);
                        
                            if (piece.AnchorSection.Side_D) {
                                this.context.fillRect(piece.AnchorX, piece.AnchorY + 10, 10, 10);
                            }
                        }
                    }

                    break;
            }

            return piece;
        })
    }

    private goBack(): void {
        this.location.back();
    }
}