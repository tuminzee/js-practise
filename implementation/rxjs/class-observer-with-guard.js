class ObserverGuard {
  constructor(observer) {
    console.log("new observer with guard initialised");
    this.observer = observer;
    this.isUnsubscribed = false;
  }

  next(data) {
    if (this.isUnsubscribed || !this.observer.next) {
      return;
    }
    try {
      this.observer.next(data);
    } catch (err) {
      this.unsubscribe();
      throw err;
    }
  }

  error(err) {
    if (this.isUnsubscribed || !this.observer.error) {
      return;
    }
    try {
      this.observer.error(err);
    } catch (innerError) {
      this.unsubscribe();
      throw innerError;
    }
    this.unsubscribe();
  }

  complete() {
    if (this.isUnsubscribed || !this.observer.complete) {
      this.observer.unsubscribe();
      return;
    }
    try {
      this.observer.complete();
    } catch (innerError) {
      this.unsubscribe();
      throw innerError;
    }
    this.unsubscribe();
  }

  unsubscribe() {
    this.isUnsubscribed = true;
    if (this.closeFn) {
      this.closeFn();
    }
  }

  isClosed() {
    return this.isUnsubscribed;
  }
}

class Observable {
  constructor(blueprint) {
    this.objservable = blueprint;
  }

  subscribe(observer) {
    const observerWithGuard = new ObserverGuard(observer);
    const closeFn = this.objservable(observerWithGuard);
    observerWithGuard.closeFn = closeFn;
    const subscription = this.subscriptionWithMetadata(observerWithGuard);
    return subscription;
  }

  subscriptionWithMetadata(observerWithGuard) {
    return {
      unsubscribe() {
        observerWithGuard.unsubscribe();
      },
      get closed() {
        return observerWithGuard.isClosed();
      },
    };
  }
}

const obs1 = new Observable(function observable(observer) {
  let counter = 1;
  const intervalId = setInterval(() => {
    observer.next(counter++);
    if (counter > 4 ) {
      observer.error('counter is bigger than 4')
    }
    if (counter > 3) {
      observer.complete()
    }
  }, 1000);




  return () => {
    console.log("unsubscibed from observable");
    clearInterval(intervalId);
  };
});

const sub1 = obs1.subscribe({
  next: (data) => console.log("data", data),
  error: (err) => console.log("err:", err),
  complete: () => console.log("done"),
});

setTimeout(() => {
  console.log("sub1 isClosed:", sub1.closed);
}, 2 * 1000);

setTimeout(() => {
  console.log("sub1 - 1 isClosed:", sub1.closed);
}, 5 * 1000);

setTimeout(() => {
  sub1.unsubscribe();
}, 5 * 1000);

setTimeout(() => {
  console.log("sub1 - 2 isClosed:", sub1.closed);
}, 5 * 1000);



// const obs2 = new Observable(function observable(observer) {
//   observer.next("hello world");
//   observer.next("hello rxjs");
//   observer.complete();
//   observer.next("hello after complete");
// });

// const subscription2 = obs2.subscribe({
//   next: (data) => console.log("data", data),
//   error: (err) => console.log("err:", err),
//   complete: () => console.log("done"),
// });

// console.log(subscription2.closed());
