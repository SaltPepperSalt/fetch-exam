const $pre = document.querySelector('pre');
let todos = [];

const render = _todos => {
  $pre.innerHTML = JSON.stringify(_todos, null, 2);
}


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


