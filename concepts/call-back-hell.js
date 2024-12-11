function print(callback) {
  console.log(1);
  callback();
}

print(() => {
  console.log(2);
  (() => {
    console.log(3);
    (() => {
      setTimeout(() => {
        console.log(4);
        (() => {
          console.log(5);
          setTimeout(() => {
            console.log(6);
            (() => {
              console.log(7);
              (() => {
                console.log(8);
                (() => {
                  console.log(9);
                  (() => {
                    console.log(10);
                    // pyramid of doom
                  })();
                })();
              })();
            })();
          }, 10);
        })();
      }, 10);
    })();
  })();
});
