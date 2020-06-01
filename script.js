document.addEventListener('DOMContentLoaded', () => {
  const createItem = (text) => {
    const result = document.createElement('li');
    result.innerHTML = text;
    return result;
  }

  const form = document.querySelector('form.new_task');
  const input = form.querySelector('input.task_title');
  const tasksList = document.querySelector('#tasks');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    tasksList.appendChild(createItem(input.value));
    form.reset();
  })
})
