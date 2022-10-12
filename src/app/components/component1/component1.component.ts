import { Component, OnInit } from '@angular/core';
import { map, mapTo, share, tap, timer } from 'rxjs';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const time = timer(500);

    const obs = time.pipe(
      tap(() => console.log('================\n'+'TAP on')),
      map(() => 'END obs') // mapTo('END obs') mapTo esta en desuso
      
    );

    

    //nos suscribimos dos veces a obs
    const subs01 = obs.subscribe(val => console.log(val));
    const subs02 = obs.subscribe(val => console.log(val));


    //creamos un share del observable para que tap se inicie sol una vez al suscribirse varias veces
    const shareObs = obs.pipe(
      share()
    );


    const subs03 = shareObs.subscribe(val => console.log(val));
    const subs04 = shareObs.subscribe(val => console.log(val));
  }

}
