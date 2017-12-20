import { Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SlideService } from './slide.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  animations: [
    trigger('itemState', [
      state('zero', style({
        left: '0px',
        top: '0px',
        backgroundColor: 'transparent',
        color:'transparent',
        border:'1px solid transparent'


      })),
      state('item', style({
        left: '0px',
        top: '0px',
        backgroundColor: '#868e96',
        color:'white',
        border:'1px solid #f8f9fa'

      })),
      state('slideR', style({
        left: '-100px',
        backgroundColor: '#868e96',
        color:'white',
        border:'1px solid #f8f9fa'

      })),
      state('slideL', style({
        left: '100px',
        backgroundColor: '#868e96',
        color:'white',
        border:'1px solid #f8f9fa'

      })),
      state('slideT', style({
        top: '100px',
        backgroundColor: '#868e96',
        color:'white',
        border:'1px solid #f8f9fa'

      })),
      state('slideB', style({
        top: '-100px',
        backgroundColor: '#868e96',
        color:'white',
        border:'1px solid #f8f9fa'

      })),
      transition('item => zero', animate(1)),
      transition('zero => slideL', animate(1)),
      transition('zero => slideR', animate(1)),
      transition('zero => slideT', animate(1)),
      transition('zero => slideB', animate(1)),
      transition('slideL => item', animate("500ms ease-in")),
      transition('slideR => item', animate("500ms ease-in")),
      transition('slideT => item', animate("500ms ease-in")),
      transition('slideB => item', animate("500ms ease-in"))

    ])
  ]
})
export class SlideComponent implements OnInit {
  store:number[] = [];
  state:string[] = [];
  indexCurrent:number;
  indexToMove:number;

  constructor(private slideService:SlideService) { }

  ngOnInit() {
    this.startNewGame();
    this.store = this.slideService.getStore();
    this.state = this.slideService.getState();
  }
  
  startNewGame(){
    this.slideService.startGame(); 
  }

  findMoves(id:number){
    this.indexCurrent = id;
    if (!(id%4 == 3)) {
      let a = id+1;
      this.tryMove(a, 'R');
    }
    if (!(id%4 == 0)){
      let b = id-1;
      this.tryMove(b, 'L');
    }
    if (id > 3) {
      let c = id-4;
      this.tryMove(c, 'T');
    }
    if (id < 12) {
      let d = id+4;
      this.tryMove(d, 'B');
    }
  }
  tryMove(index:number, direction:string){
    if (this.store[index] == 0){

      this.indexToMove = index;
      this.store[this.indexToMove] = this.store[this.indexCurrent];//set value before show it!
      this.slideService.updateStore(this.store);
      this.store = this.slideService.getStore();

      this.state[this.indexCurrent] ='zero'; //hide current
      this.state[this.indexToMove] = 'slide'+ direction; //show value before move position
      this.slideService.updateState(this.state);
      this.state = this.slideService.getState();
 
      setTimeout(()=>{
        this.store[this.indexCurrent] = 0; //current 0 AFTER setting 'zero'
        this.slideService.updateStore(this.store);
        this.store = this.slideService.getStore();

        this.state[this.indexToMove] = 'item'; //move to right place AFTER setting 'slide'
        this.slideService.updateState(this.state);
        this.state = this.slideService.getState();
      },100);

    }
  }
}
