document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.new_task');
  const tasksList = document.querySelector('#tasks');

  const addCheckboxEvents = (taskNode) => {
    taskNode.querySelector('.done').addEventListener('change', (event) => {
      if (event.target.checked) {
        taskNode.style.textDecoration = 'line-through';
        tasksList.appendChild(taskNode);
      } else {
        taskNode.style.textDecoration = '';
        tasksList.prepend(taskNode);
      }
    })
  }

  const addDeleteEvents = (taskNode) => {
    taskNode.querySelector('.delete-button').addEventListener('click', (event) => {
      taskNode.remove();
    })
  }

  const addEditEvents = (taskNode) => {
    taskNode.querySelector('.edit-button').addEventListener('click', () => {
      const editForm = form.cloneNode(true);
      const editInput = editForm.querySelector('input.task_title');
      const editCategorySelect = editForm.querySelector('select');

      editForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        taskNode.state.title = editInput.value
        taskNode.state.category = editCategorySelect.value
        taskNode.querySelector('form').remove()
      })

      taskNode.appendChild(editForm);
    })
  }

  const createTask = (text, categoryText) => {
    let bindObject = window.simulacra
    let template = document.querySelector('#task_template')
    let initialState = {
      title: text,
      category: categoryText,
      done: false
    }

    var node = bindObject(initialState, [template, {
      title: '.title',
      category: '.category',
      done: '.done'
    }])
    let taskNode = node.children[0];
    taskNode.state = initialState

    addCheckboxEvents(taskNode)
    addDeleteEvents(taskNode)
    addEditEvents(taskNode)

    return node;
  }

  const input = form.querySelector('input.task_title');
  const categorySelect = form.querySelector('select');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    tasksList.appendChild(createTask(input.value, categorySelect.value));
    form.reset();
  })
})
