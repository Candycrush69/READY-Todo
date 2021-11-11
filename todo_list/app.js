const input = document.querySelector('#todo__input')
const btn = document.querySelector('#todo__add')
const list = document.querySelector('#todo__list')

EnterClick()

function EnterClick() {
  document.querySelector('input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      const value = input.value
    if (value =='') {alert('Поле ввода не должно быть пустым! Повторите попытку снова.')} 
    else {
    sendName(value)
    input.value = ''
    }
    } 
  });
};


btn.addEventListener('click', () => {
    const value = input.value
    if (value =='') {alert('Поле ввода не должно быть пустым! Повторите попытку снова.')} 
    else {
    sendName(value)
    input.value = ''
    }
        
})


fetchTodo()
  
list.addEventListener('click', e => {
  const id = e.target.closest('li')?.dataset.id
  const tag = e.target.tagName
  const type = e.target.type
  const checked = e.target.checked;
  const todo = e.target.closest('li')

  if (tag === 'INPUT' && type === 'checkbox') {
    updateTodo(todo)
  }

  if (tag === 'BUTTON') {
    var element = document.querySelector('input[type=checkbox]');   
      if (element.checked) {
        e.target.closest('li').remove()
        removeTodo(id)
      } else {alert('Вы не можете удалить невыполненный пункт.')} 
      
  } else if (tag === 'SPAN') {
    const target = e.target
    replaceOnInput(target)
  }
})

function fetchTodo() {
  fetch('./php/todo.php')
    .then(res => res.json())
    .then(res => {
      list.innerHTML = ''
      res?.forEach(todo => {
        list.innerHTML += `
          <li class="todo__item" data-id='${todo.id}'>
            <input type="checkbox" ${todo.checked == true ? 'checked' : ''} class="todo__check">
            <span>${todo.text}</span>
            <button class="todo__remove">&times;</button>
          </li>
        `
      })
    })
}

function sendName(todo) {
  fetch('./php/todo.php', {
    method: 'POST',
    body: JSON.stringify({
      todo: todo
    })
  }).then(res => fetchTodo())
}

function updateTodo(todo) {
  const id = todo.dataset.id
  const checked = todo.querySelector('input').checked
  const text = todo.querySelector('span').textContent

  fetch('./php/todo.php', {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      checked: checked,
      text: text
    })
  })
}

function removeTodo(id) {
  console.log(id);
  fetch('./php/todo.php', {
    method: 'DELETE',
    body: JSON.stringify({
      id: id,
    })
  })
}

function replaceOnInput(target) {
  const todo = target.closest('li')
  const input = document.createElement('input')
  input.value = target.textContent
  target.replaceWith(input)
  
  // Прослушиватели
  input.focus()
  input.addEventListener('blur', () => {
    replaceOnSpan(input)
    updateTodo(todo)
  })
}

function replaceOnSpan(target) {
  target.insertAdjacentHTML('afterend', 
    `<span>${target.value}</span>`
  )
  target.remove()
}



