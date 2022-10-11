import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, Observable, fromEvent, scan, throttleTime, map, of, filter, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'Rxjs'
  visible = true;

  myobservable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000)
  });

  observable2 = new Observable(function subscribe(subscriber) {
    const id = setInterval(() => {
      subscriber.next('hi');
    }, 1000);
  });
  

  
  
  constructor(private elementRef:ElementRef) {
    
  }

  ngOnInit(): void {
    const el = document.getElementById('elemento');
    const mouseMove = fromEvent(el, 'mousemove');

    // creamos observable del array num
    const num = of(1,2,3,4,5);

    // creamos funcion para manipular observable del array num 
    const cuadradonum = pipe(
      filter((n:number) => n % 2 ==0),
      map(n => n*n)
    );

    // cramos nuevo observable a partir del de num con la función al cuadrado
    const cuadrado = cuadradonum(num);


    const clicks = fromEvent(document, 'click');
    const positions = clicks.pipe(
      tap(ev => console.log('Procesado: ' + ev),
      err => console.log(err),
      () => console.log('Complete'))
    );

    // SUSCRIPCIONES
    cuadrado.subscribe({
      next(x) {console.log(x)},
      complete() {console.log('Observable "al cuadrado completo"')}
    });

    mouseMove.subscribe((e: any) => {
      console.log(`Coord X: ${e.clientX}; Coord Y: ${e.clientY}`)
    });

    // positions.subscribe(pos => console.log(pos));

    this.myobservable.subscribe({
      next(x) {
        console.log(x);
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log('complete');
      }
    })

    // this.observable2.subscribe((x) => console.log(x));
    
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelector('.addevent')
                                .addEventListener('click', () => {console.log('button clicked')});
    
  }
   
  

}







