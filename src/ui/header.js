const mainMenu = document.getElementById('main-menu')
const nameSpan = document.getElementById('user-name')
const btnCreateProj = document.getElementById('menu-item--create-project')
const btnViewProj = document.getElementById('menu-item--view-project')
const btnCreateTask = document.getElementById('menu-item--create-task')
const btnMyProjects = document.getElementById('menu-item--my-projects')

btnCreateProj.onclick = (e) => {
  mainMenu.dispatchEvent(new Event("click-create-project", { bubbles: true }))
  e.stopPropagation()
}
btnViewProj.onclick = (e) => {
  mainMenu.dispatchEvent(new Event("click-view-project", { bubbles: true }))
  e.stopPropagation()
}
btnMyProjects.onclick = (e) => {
  mainMenu.dispatchEvent(new Event("click-my-projects", { bubbles: true }))
  e.stopPropagation()
}
btnCreateTask.onclick = (e) => {
  mainMenu.dispatchEvent(new Event("click-create-task", { bubbles: true }))
  e.stopPropagation()
}

export function setProjectMode() {
  mainMenu.setAttribute('data-type', 'project')
}
export function setTaskMode() {
  mainMenu.setAttribute('data-type', 'task')
}

export function setName(name="Project") {
  nameSpan.innerText = name
}
export function resetName() {
  nameSpan.innerText = "My projects"
}
