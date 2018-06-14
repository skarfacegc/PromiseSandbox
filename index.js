function delay(timeOut, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(message + ' Time: ' + timeOut);
      resolve();
    }, timeOut);
  });
}

let runList = [
  () => {
    return delay(1000, 'A');
  },
  () => {
    return delay(500, 'B');
  }
];

// runs tasks all at once
function asyncList() {
  let promiseList = [];
  runList.forEach(taskToRun => {
    promiseList.push(taskToRun());
  });
  return Promise.all(promiseList);
}

// Runs tasks in order
function syncList() {
  return runList.reduce((lastTask, taskToRun) => {
    return lastTask.then(() => {
      return taskToRun();
    });
  }, Promise.resolve());
}

Promise.resolve()
  .then(() => {
    console.log('asyncList');
    return asyncList();
  })
  .then(() => {
    console.log('\n\nsyncList');
    return syncList();
  })
  .then(() => {
    console.log('Done');
  });
