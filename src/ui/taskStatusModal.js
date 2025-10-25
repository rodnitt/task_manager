const element = document.getElementById('change-task-status')
const form = element.querySelector('form')
const formStatus = form.elements['task-status']

let target = null

form.onsubmit = (e) => {
  if (target) {
    target.status = formStatus.value
    element.dispatchEvent(new CustomEvent("status-task-submit", {
      detail: {
        data: target
      },
      bubbles: true
    }))
  }
  form.reset()
  e.stopPropagation()
  element.close()
}

form.onreset = (e) => {
  target = null
  element.close()
}

export function edit(taskTarget) {
  if (taskTarget) {
    target = taskTarget
    formStatus.value = target.status
    element.showModal()
    element.classList.remove('hidden')
  }
  else console.error("Editing function needs to receive a valid target task.")
}

