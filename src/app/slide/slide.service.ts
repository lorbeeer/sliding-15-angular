import { Injectable } from '@angular/core';

@Injectable()
export class SlideService {
  store:number[] = [];
  state:string[] = [];

  constructor() { }
  startGame(){
    this.setStore();
    this.setState();
  }
  setStore(){
    this.store=[];
    while (this.store.length < 16) {
      let randomNumber = Math.floor(Math.random()*16);
      let found = this.store.findIndex((i)=> i == randomNumber);
      if (found == -1) {
        this.store.push(randomNumber);
      }
    }
    localStorage.setItem('store', JSON.stringify(this.store));
  }
  setState(){
    this.state=[];
    this.store.forEach((item)=>{
      if (item == 0) {this.state.push('zero')}
      else{this.state.push('item')}
    });
    localStorage.setItem('state', JSON.stringify(this.state));
  }
  getStore(){
    return JSON.parse(localStorage.getItem('store'));
  }
  getState(){
    return JSON.parse(localStorage.getItem('state'));
  }
  updateStore(store:number[]){
    this.store = store;
    localStorage.setItem('store', JSON.stringify(store));
  }
  updateState(state:string[]){
    this.state = state;
    localStorage.setItem('state', JSON.stringify(state));
  }
}
