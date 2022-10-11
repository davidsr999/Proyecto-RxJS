import { Component, OnInit } from '@angular/core';
import { concat, interval, range, take } from 'rxjs';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //take sirve para multiplicar (en este caso 4 veces) el intervalo (timer) de 1s (1000ms)

    //primera observable
    const timer = interval(2000).pipe(take(4));

    //segunda observable
    const rango = range(1, 10); //cuenta del 1 al 10


    //cramos un observable donde mandamos todos los observables que queremos concatenar
    const result = concat(timer, rango);



    //nos suscribimos ya
    result.subscribe(x => console.log(x));


  }

}
