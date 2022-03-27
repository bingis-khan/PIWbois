'use strict';


// Simplified progression of this file:
// 1. I'll try to do this thing with no internal state (state basically stored in DOM).
// 2. That was bad, I'll go full react-wannabe internal state, except with explicit refresh().
// 3. (After learning some JQuery): The current program is kinda spaghetti-ish, maybe the DOM thing wasn't such a bad idea (stuff like "show" and "hide" which do not require extra state when using JQuery, simple .index() for deletion and ctrl+Z-ing, design incopatibility with Bootstrap, etc.).


class Todo {
  constructor(text) {
    this.text = text;
    this.date = null;  // The type of date is actually "Maybe Date" (in Haskell datatypes), which means it's either null or a number.
  }

  finish = () => {
    this.date = new Date();
  }

  redo = () => {
    this.date = null;
  }

  finished = () => this.date !== null;

  toggle = () => this.finished() ? this.redo() : this.finish();

  makeElement = (listName) => {
    const contents = document.createElement('p');
    contents.textContent = this.text;

    // Important - needs to refresh after every "action" (bad).
    contents.onclick = () => {
      this.toggle();
      refresh();
    }

    const deleteButton = document.createElement('button');
    $(deleteButton).click(() => {
      // My attempt at using Bootstrap's modal.
      const modalElem = elem.onDeleteModal;
      const onDeleteCallback = () => {
        // Really bad and inefficient, but that's the price to pay for id-less elements.
        // We have to find this DOM element in our JS state... ugh.
        todos.forEach(todoList => {
          const todoIndex = todoList.todos.findIndex(todo => todo === this);

          // Remove element and throw it in the trash.
          if (todoIndex !== -1) {
            todoList.todos.splice(todoIndex, 1);
            trash.contents = { todo: this, index: todoIndex, listName: listName };
          }
        });

        modalElem.getElementsByClassName('btn-primary')[0].removeEventListener('click', onDeleteCallback);

        refresh();
      }

      modalElem.getElementsByClassName('btn-primary')[0].addEventListener('click', onDeleteCallback);
      new bootstrap.Modal(modalElem).show();
      
    }).addClass('btn-close').css('float', 'right');

    const root = document.createElement('div');
    root.classList.add('list-group-item', 'list-group-item-action');
    root.appendChild(contents);

    if (this.finished()) {
      contents.style.textDecoration = 'line-through';

      const dateElement = document.createElement('p');
      dateElement.innerHTML = this.date.toUTCString();
      root.appendChild(dateElement);
    }

    root.appendChild(deleteButton);

    return root;
  }
}

class TodoList {
  constructor(todos) {
    this.todos = todos;
    this.hidden = false;
  }

  makeElement = (name) => {
    const listHeader = document.createElement('h2');
    listHeader.innerText = name;
    listHeader.classList.add('mt-3');
    if (this.hidden) listHeader.style.color = 'grey';
    listHeader.onclick = () => {
      this.toggle();
      refresh();
    }

    const todoElem = document.createElement('div');
    todoElem.classList.add('list-group');

    todoElem.appendChild(listHeader);

    // Unfortunately, incompatible with Bootstraps collapse (it just refresh()es, so no animations can occur like in case of collapsing)
    if (!this.hidden)
      todoElem.append(...this.todos.filter(todoFilter).map((x) => x.makeElement(name)));
    
    return todoElem;
  }

  toggle = () => {
    this.hidden = !this.hidden;
  }
}


// We don't really care about ordering, so it's a map.
const todos = new Map();

todos.set('main', new TodoList([ 
  new Todo('todo 1'), 
  new Todo('dupa')
]));
todos.set('other', new TodoList([ 
  new Todo('shiet') 
]));

// Relevant elements.
// Kind of a funny idea to not re-find all of the static elements.
const elem = {};  // Needs to be initialized as an object, because the reference will be saved in all of these closures.
                  // Then, on load, we'll copy all static DOM elements

// I'm starting to think that a single state object would be better.
const trash = { contents: null };

const todoFilter = (todo) => {
  const filter = elem.filter.value;
  const caseInsensitive = elem.caseInsensitive.checked;
  
  if (filter) {
    let text = todo.text;
    let substring = filter;

    if (caseInsensitive) {
      text = text.toLowerCase();
      substring = substring.toLowerCase();
    }

    return text.includes(substring);
  }

  return true;
}

const todosToHTML = (filter) =>
  [...todos].map(([name, listTodos]) => listTodos.makeElement(name));

// I truly hate this function. 
const refresh = () => {
  elem.filter.value;

  elem.todos.replaceChildren(...todosToHTML(filter));

  const todoOptions = [...todos.keys()].map(todoListName => {
    const option = document.createElement('option');

    option.value = todoListName;
    option.innerText = todoListName;

    return option;
  });

  elem.selectedList.replaceChildren(...todoOptions);
}

const addTodoOnSubmitHandler = () => {
  if (elem.newTodoText.value.trim().length === 0) {
    alert('Bad todo. Whatcha doin!?');
    return false;
  }

  todos.get(elem.selectedList.value).todos.push(new Todo(elem.newTodoText.value));
  elem.newTodoText.value = '';

  refresh();

  // We don't care about the return value, but I think it's still good practice.
  return true;
}

const addTodoListOnSubmitHandler = () => {
  const todoName = elem.newListName.value;

  if (todos.has(todoName)) {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="alert alert-danger alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        This list already exists, bubby.
      </div>
    `.trim();

    const newListForm = document.getElementById('new-list');
    newListForm.parentNode.insertBefore(template.content.firstChild, newListForm);

    return false;
  }

  todos.set(todoName, new TodoList([]));
  refresh();

  return true;
};

window.onload = () => {
  // If done in clean JQuery, use that '$(document).ready()' method.

  // Copy properties - note: we can't copy the whole object, because we want the same reference (it's saved in all of the closures).
  Object.assign(elem, {
    // New todo.
    newTodoText: document.getElementById('todo-input'),
    selectedList: document.getElementById('todo-list'),

    // Filter.
    filter: document.getElementById('filter'),
    caseInsensitive: document.getElementById('case-insensitive-checkbox'),

    // Todo display.
    todos: document.getElementById('todos'),

    // New todo list.
    newListName: document.getElementById('list-name-input'),

    // Delete modal.
    onDeleteModal: document.getElementById('onDeleteModal')
  });
  
  refresh();

  $(document).keydown((event) => {
    if (!(event.ctrlKey && event.key === 'z'))
      return;
    
    console.log('ctrl-z');

    const trashed = trash.contents;

    if (trashed) {
      todos.get(trashed.listName).todos.splice(trashed.index, 0, trashed.todo);
      trash.contents = null;
    }

    refresh();
  });
}