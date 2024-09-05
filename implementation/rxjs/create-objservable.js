function observable(observer) {
  let counter = 1;
  const intervalId = setInterval(() => {
    observer.next(counter++);
  }, 1000);

  // unsubscibe
  return () => {
    clearInterval(intervalId);
  };
}

const closeFn = observable({
  next: (data) => console.log("data", data),
  error: (err) => console.log("err:", err),
  complete: () => console.log("done"),
});

setTimeout(() => {
  closeFn();
}, 5 * 1000);

setTimeout(() => {
  const closeFn1 = observable({
    next: (data) => console.log("data1", data),
    error: (err) => console.log("err:", err),
    complete: () => console.log("done"),
  });

  setTimeout(() => {
    closeFn1();
  }, 10 * 1000);
}, 2 * 1000);
