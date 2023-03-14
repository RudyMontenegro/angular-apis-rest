const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
  return new Promise((resolve) => { // solo es utilizado una ves, solo se usa en casos especiales.
    setTimeout(() => {
      resolve('valor 3');
    }, 3000)
  });
}

const doSomething$ = () => {
  return new Observable(observer => { // los observables pueden ser utilizados varias veces, como un flujo de datos 
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4 $');
    }, 5000)
    setTimeout(() => {
      observer.next(null);
    }, 8000)
    setTimeout(() => {
      observer.next('valor 5 $');
    }, 10000)
  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta);
  })
})();