function myLogger(cb) {
  console.log("hello")
  cb();
}

function one(cb) {
  console.log("one")
  cb()
}

function two(cb) {

  function cb() {
    console.log("some stupid code")
  }
  console.log("two")
  // I skip to call this callback , because I have the control over it, it I do not this the, or I might just call something else
  cb()
}

function three() {
  console.log("three")
}

myLogger(() => {
  one(() => {
    two(() => {
      three();
    })
  })
})