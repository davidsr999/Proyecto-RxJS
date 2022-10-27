import { Component, OnInit } from '@angular/core';
import { concat, concatMap, debounce, debounceTime, delay, interval, mergeMap, of, range, take, timeout } from 'rxjs';

@Component({
  selector: 'app-component5',
  templateUrl: './component5.component.html',
  styleUrls: ['./component5.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class Component5Component implements OnInit {
  console = document.getElementsByClassName('console');
  observable0 = of(1,2,3,4,5);

  //observable 1
  observable1 = this.observable0.pipe(delay(1000));

  //observable 2
  observable2 = this.observable0.pipe(
    concatMap(res => of(`${res}`).pipe(delay(500)))
  );

  //observable 3
  observable3_1 = interval(1000).pipe(take(5));
  observable3_2 = range(1, 8);
  observable3 = concat(this.observable3_1, this.observable3_2);

  constructor() { }

  ngOnInit(): void { 
     
    this.console[0].innerHTML = 'Respuesta:'
    this.console[1].innerHTML = 'Haga click para ver respuesta!'
  }

  //observable 1
  onclicksuscribe1() {
    // this.postIds.subscribe(res => console.log(`Observable 1 respuesta: ${res}`));
    this.console[0].innerHTML = 'Respuesta:'
    this.observable1.subscribe(res => this.console[0].innerHTML += ` ${res}`);

  }

  //observable 2
  onclicksuscribe2() {
    // this.postIds.subscribe(res => console.log(`Observable 1 respuesta: ${res}`));
    this.console[1].innerHTML = 'Resultado:'
    this.observable2.subscribe(res => this.console[1].innerHTML += ` ${res}`);

  }

  //observable 3
  onclicksuscribe3_1() {
    this.console[2].innerHTML = 'Resultado:'
    this.observable3_1.subscribe(res => this.console[2].innerHTML += ` ${res}`);
  }

  onclicksuscribe3_2() {
    this.console[3].innerHTML = 'Resultado:'
    this.observable3_2.subscribe(res => this.console[3].innerHTML += ` ${res}`);
  }

  onclicksuscribe3() {
    this.console[4].innerHTML = 'Resultado:'
    this.observable3.subscribe(res => this.console[4].innerHTML += ` ${res}`);
  }



}
