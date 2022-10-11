import { EmptyExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, map, mapTo, merge, startWith, switchMap, empty, scan, takeWhile, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.css']
})
export class Component3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //switchMap nos permite parar el observable al hacer maps 

    


    const remainlabel = document.getElementById('remain');
    const resumelabel = document.getElementById('resume');
    const pauselabel = document.getElementById('pause');


    fromEvent(document.getElementById('elemnt1'), 'click').pipe(tap(() => console.log('Empieza el conteo!')),
    switchMap(() => interval(700)), takeWhile(val => val <= 10)).subscribe({
      next: console.log,
      complete: () => console.log('Cuenta completada!')
    });



    const obsInterval = interval(1000).pipe(map(() => 1));
    const pauseobs = fromEvent(pauselabel, 'click').pipe(map(() => false));
    const resumeobs = fromEvent(resumelabel, 'click').pipe(map(() => true));


    const timer  = merge(pauseobs, resumeobs)
    .pipe(
      startWith(true),
      switchMap(val => (val ? obsInterval : empty())),
      scan((acc, curr) => (curr ? curr + acc :  acc), 0),
      takeWhile(v => v <= 100)
    )
    .subscribe((val: any) => (remainlabel.innerHTML = val));
  }

}
