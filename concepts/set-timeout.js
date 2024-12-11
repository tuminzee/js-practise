async function sleep(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("hello");
  await sleep(1000);
  console.log("world");
}


main();