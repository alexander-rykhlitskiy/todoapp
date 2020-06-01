document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.new_task');
  const input = form.querySelector('input.task_title');
  const tasksList = document.querySelector('#tasks');

  const createCheckboxNode = () => {
    const result = document.createElement('input');
    result.type = 'checkbox';
    result.className = 'done';
    return result;
  }

  const createCheckbox = (taskNode) => {
    const result = createCheckboxNode();
    result.addEventListener('change', (event) => {
      if (event.target.checked) {
        taskNode.style.textDecoration = 'line-through';
        tasksList.appendChild(taskNode);
      } else {
        taskNode.style.textDecoration = '';
        tasksList.prepend(taskNode);
      }
    })
    return result;
  }

  const createDeleteButton = (taskNode) => {
    const result = document.createElement('button');
    result.textContent = 'Delete';
    result.className = 'delete-button btn btn-danger';
    result.addEventListener('click', (event) => {
      taskNode.remove();
    })
    return result;
  }

  const createEditButton = (taskNode) => {
    const result = document.createElement('button');
    result.textContent = 'Edit';
    result.className = 'btn btn-secondary'

    result.addEventListener('click', (clickEditEvent) => {
      const editForm = form.cloneNode(true);
      const editInput = editForm.querySelector('input.task_title')

      editForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        taskNode.replaceWith(createTask(editInput.value));
      })

      taskNode.appendChild(editForm);
    })

    return result;
  }

  const createButtons = (taskNode) => {
    const result = document.createElement('div');

    result.appendChild(createDeleteButton(taskNode));
    result.appendChild(createEditButton(taskNode));

    return result;
  }

  const createTask = (text) => {
    const result = document.createElement('li');
    result.className = 'task';

    result.appendChild(createCheckbox(result));
    result.append(text);
    result.append(createButtons(result));

    return result;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    tasksList.appendChild(createTask(input.value));
    form.reset();
  })
})
