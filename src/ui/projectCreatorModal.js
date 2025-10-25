const element = document.getElementById('create-project-modal')
const form = element.querySelector('form')
const formName = form.elements['project-title-input']
const formSummary = form.elements['project-summary-input']
const formStartDate = form.elements['project-start-date-input']
const formDueDate = form.elements['project-due-date-input']

let target = null

form.onsubmit = (e) => {
  if (target) {
    target.name = formName.value
    target.summary = formSummary.value
    target.startDate = formStartDate.value || null
    target.dueDate = formDueDate.value || null

    element.dispatchEvent(new CustomEvent("edit-project-submit", {
      detail: {
        data: target
      },
      bubbles: true
    }))
  }
  else {
    element.dispatchEvent(new CustomEvent("create-project-submit", {
      detail: {
        data: {
          name: formName.value,
          summary: formSummary.value,
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

export function edit(projectTarget = null) {
  target = projectTarget
  if (target?.name) formName.value = target.name
  if (target?.summary) formSummary.value = target.summary
  if (target?.startDate) formStartDate.value = target.startDate.slice(0, 16)
  if (target?.dueDate) formDueDate.value = target.dueDate.slice(0, 16)
  element.showModal()
  element.classList.remove('hidden')
}