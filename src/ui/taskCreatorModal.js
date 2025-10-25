const element = document.getElementById('create-task-modal')
const form = element.querySelector('form')
const formTitle = form.elements['task-title-input']
const formDescription = form.elements['task-description-input']
const formPriority = form.elements['task-priority']
const formStartDate = form.elements['task-start-date-input']
const formDueDate = form.elements['task-due-date-input']

const priorityStr2Num = {
  "optional": 0,
  "normal": 1,
  "important": 2,
  "urgent": 3
}
const priorityNum2Str = ["optional", "normal", "important", "urgent"]

let target = null

form.onsubmit = (e) => {
  if (target) {
    target.title = formTitle.value
    target.description = formDescription.value
    target.priority = priorityStr2Num[formPriority.value]
    target.startDate = formStartDate.value || null
    target.dueDate = formDueDate.value || null
    element.dispatchEvent(new CustomEvent("edit-task-submit", {
      detail: {
        data: target
      },
      bubbles: true
    }))
  }
  else {
    element.dispatchEvent(new CustomEvent("create-task-submit", {
      detail: {
        data: {
          title: formTitle.value,
          description: formDescription.value,
          priority: priorityStr2Num[formPriority.value],
          startDate: formStartDate.value || null,
          dueDate: formDueDate.value || null
        }
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

export function edit(taskTarget = null) {
  target = taskTarget
  if (target?.title) formTitle.value = target.title
  if (target?.description) formDescription.value = target.description
  if (typeof(target?.priority) === typeof(0)) formPriority.value = priorityNum2Str[target.priority]
  if (target?.startDate) formStartDate.value = target.startDate.slice(0, 16)
  if (target?.dueDate) formDueDate.value = target.dueDate.slice(0, 16)
  element.showModal()
  element.classList.remove('hidden')
}
