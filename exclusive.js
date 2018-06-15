let taskList = [];

function addTask(name, action) {
  taskList.push({
    action: action,
    name: name
  });
}

addTask('foo', () => {
  console.log('woot');
});
