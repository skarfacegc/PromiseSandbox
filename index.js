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
  // Return the resulting promise
  return runList.reduce((lastTask, taskToRun) => {
    // Wait for the previous task to run then run the current task
    return lastTask.then(() => {
      // return the promise from the current task.
      // This promise becomes lastTask on the next reduce iteration
      return taskToRun();
    });
  }, Promise.resolve()); // Set the initial value for reduce
}

Promise.resolve()
  // Test async lists
  .then(() => {
    console.log('asyncList');
    return asyncList();
  })
  .then(() => {
    console.log('Done');
  })

  // Test syncList
  .then(() => {
    console.log('\n\nsyncList');
    return syncList();
  })
  .then(() => {
    console.log('Done');
  });
