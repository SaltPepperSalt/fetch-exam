//State
let todos = [];

//DOM
const $pre = document.querySelector('pre');
const $inputTodo = document.querySelector('.input-todo');
const $deleteTodo = document.querySelector('.delete-todo');
const $toggleTodo = document.querySelector('.toggle-todo');



const request = (function () {
  return {
    get(url) {
      return fetch(url);
    },
    post(url, payload) {
      return fetch(url, {
        method: 'POST',
        headers: { 'content-type' : 'application/json' },
        body: JSON.stringify(payload)
      });
    },
    patch(url, payload) {
      return fetch(url, {
        method: 'PATCH',
        headers: { 'content-type' : 'application/json' },
        body: JSON.stringify(payload)
      });
    },
    delete(url) {
      return fetch(url, {
        method: 'DELETE'
      });
    }
  };
})();

const render = () => {
  $pre.innerHTML = JSON.stringify(todos, null, 2)
};

const getId = () => {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
};

const addTodo = content => {
  request.post('/todos', { id: getId(), content, completed: false })
  .then(response => response.json())
  .then(todo => todos = [...todos, todo])
  .then(() => render())
  .catch(err => console.error(err));
};

const deleteTodo = id => {
  request.delete(`/todos/${id}`)
  .then(() => {
    todos = todos.filter(todo => todo.id !== +id);
    render();
  })
  .catch(err => console.error(err));
}
const toggleTodo = id => {
  const completed = !todos.find(todo => todo.id === +id).completed;
  request.patch(`/todos/${id}`, { completed })
  .then(response => response.json())
  .then(_todo => todos = todos.map(todo => todo.id === _todo.id ? _todo : todo))
  .then(render)
  .catch(err => console.error(err));
}

window.onload = () => {
  console.log('hi');
  request.get('/todos')
  .then(response => response.json())
  .then(_todos => {
    todos = _todos;
    render();
  })
  .catch(err => console.error(err));
};

$inputTodo.onkeyup = e => {
  if(e.keyCode !== 13) return;
  addTodo($inputTodo.value);
  $inputTodo.value = '';
};
$deleteTodo.onkeyup = e => {
  if(e.keyCode !== 13) return;
  deleteTodo($deleteTodo.value);
  $deleteTodo.value = '';
}
$toggleTodo.onkeyup = e => {
  if(e.keyCode !== 13) return;
  toggleTodo($toggleTodo.value);
  $toggleTodo.value = '';
}

// fetch('/todos')
//   .then(response => response.json())
//   .then(_todos => {
//     todos = _todos
//     render(todos);
//   });

// fetch('/todos', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       id: 4,
//       content: 'React',
//       completed: false
//     })
//   })
//   .then(response => response.json())
//   .then(_todos => {
//     todos = _todos;
//     render(todos);
//   });

// fetch('/todos/2', {
//   method: 'PATCH',
//   headers: {
//     'content-type': 'application/json'
//   },
//   body: JSON.stringify({
//     completed: false
//   })
// })
// .then(response => response.json())
// .then(_todo => todos = todos.map(todo => todo.id === _todo.id ? _todo : todo))
// .then(() => render(todos));

// fetch('/todos/4', {
//   method: 'DELETE'
// })
// .then(() => todos = todos.filter(todo => todo.id !== 4))
// .then(() => render(todos));


