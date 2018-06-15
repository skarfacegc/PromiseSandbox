(function() {
  function delay(timeOut, message) {
    return new Promise((resolve, reject) => {
      console.log(message + ' start');
      setTimeout(() => {
        console.log(message + ' executing. (' + timeOut + ')');
        finishTask(message);
        resolve();
      }, timeOut);
    });
  }

  let runList = [
    () => {
      return exclusiveTask(() => {
        return delay(999, 'exclusive');
      });
    },
    () => {
      return runTask(() => {
        return delay(1000, 'A');
      });
    },
    () => {
      return runTask(() => {
        return delay(500, 'B');
      });
    },
    () => {
      return runTask(() => {
        return delay(999, 'C');
      });
    },
    () => {
      return runTask(() => {
        return delay(501, 'D');
      });
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
        return runTask(taskToRun);
      });
    }, Promise.resolve()); // Set the initial value for reduce
  }

  function exclusiveTask(action) {
    return action();
  }

  function runTask(action) {
    return action();
  }

  function finishTask(name) {
    console.log(name + ' done.');
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
})();

(() => {
  console.log('XXXX');
})();
