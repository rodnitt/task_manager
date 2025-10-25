import mainController from "../controllers/mainController.js"

document.addEventListener("card-select", (e) => {
  if (e.detail.type === 'project') {
    mainController.renderTasks(e.detail.data)
      .then(
        () => mainController.showProjectDetails(e.detail.data)
      )
  }
  else if (e.detail.type === 'task') {
    mainController.showTaskDetails(e.detail.data)
  }
  e.stopPropagation()
})

document.addEventListener("click-edit-project", (e) => {
  mainController.beginProjectEditing(e.detail.data)
})
document.addEventListener("edit-project-submit", (e) => {
  mainController.updateProject(e.detail.data)
})
document.addEventListener("create-project-submit", (e) => {
  mainController.createProject(e.detail.data)
})

document.addEventListener("click-delete-project", (e) => {
  mainController.deleteProject(e.detail.data)
})

document.addEventListener("click-edit-task", (e) => {
  mainController.beginTaskEditing(e.detail.data)
})
document.addEventListener("edit-task-submit", (e) => {
  mainController.updateTask(e.detail.data)
})
document.addEventListener("create-task-submit", (e) => {
  mainController.createTask(e.detail.data)
})

document.addEventListener("click-change-status", (e) => {
  mainController.beginStatusChanging(e.detail.data)
})
document.addEventListener("status-task-submit", (e) => {
  mainController.updateTask(e.detail.data)
})

document.addEventListener("click-delete-task", (e) => {
  mainController.deleteTask(e.detail.data)
})

document.addEventListener("click-create-project", (_) => {
  mainController.beginProjectEditing()
})
document.addEventListener("click-view-project", (_) => {
  mainController.showProjectDetails()
})
document.addEventListener("click-my-projects", (_) => {
  mainController.renderProjects()
})
document.addEventListener("click-create-task", (_) => {
  mainController.beginTaskEditing()
})

mainController.renderProjects()
