import { Component, OnChanges, OnInit } from '@angular/core';
import { bufferTime, debounceTime, delay, fromEvent, last, map, mapTo } from 'rxjs';

@Component({
  selector: 'app-component4',
  templateUrl: './component4.component.html',
  styleUrls: ['./component4.component.css']
})
export class Component4Component implements OnInit, OnChanges {
  visible = false;

  constructor() { }

  ngOnInit(): void {
    const element = document.getElementById('button');
    const mouseMove = fromEvent(document, 'scroll');
    const text = document.getElementById('text');
    const scrollscreen = document.getElementById('scrollscreen');


    mouseMove.pipe(
      debounceTime(25)
    ).subscribe(res => {
      scrollscreen.innerHTML = `Scroll: ${window.scrollY.toFixed(0)} px`;
      if(window.scrollY > 2200){
        this.visible = true;
      } else {
        this.visible = false;
      }

      text.innerHTML = this.visible? 'Se ve el boton' : 'No se ve el boton';
    });

    

   

  }

  ngOnChanges() {
   
  }

}
