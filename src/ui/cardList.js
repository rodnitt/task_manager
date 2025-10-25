import { createProjectLi, createTaskLi } from "./cardItem.js"

const list = document.getElementById('card-list')

let active

function createEvents(card, data) {
  card.addEventListener("click", (e) => {
    list.dispatchEvent(new CustomEvent("card-select", {
      detail: {
        type: card.dataset.type,
        id: Number(card.dataset.id),
        data
      },
      bubbles: true
    }))
    e.stopPropagation()
  })
}

export function clearList() {
  list.innerHTML = ""
  active = undefined
}

export function activateCard(cardId) {
  active?.classList.remove("card--activated")
  const card = document.getElementById(`card--id-${cardId}`)
  card?.classList.add("card--activated")
  active = card
  return card
}
export function deactivateCard() {
  const a = active
  active?.classList.remove("card--activated")
  active = undefined
  return a
}

export function populateProjectList(projects) {
  projects.forEach(project => {
    const projectItem = createProjectLi(project)
    createEvents(projectItem, project)
    list.appendChild(projectItem)
  })
}
export function populateTaskList(tasks) {
  tasks.forEach(task => {
    const taskItem = createTaskLi(task)
    createEvents(taskItem, task)
    list.appendChild(taskItem)
  })
}

export function addProject(project) {
  const projectItem = createProjectLi(project)
  createEvents(projectItem, project)
  list.prepend(projectItem)
  return projectItem
}
export function addTask(task) {
  const taskItem = createTaskLi(task)
  createEvents(taskItem, task)
  list.prepend(taskItem)
  return taskItem
}

export function updateCard(cardId, newData) {
  let i = 0
  while (i < list.children.length) {
    if (list.children[i].dataset.id == cardId)
      break
    i++
  }
  if (i >= list.children.length) { throw new Error('Card not found') }
  list.children[i].remove()
  const updated = createTaskLi(newData)
  list.prepend(updated)
  createEvents(updated, newData)
}
