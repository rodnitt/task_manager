import mainController from "../controllers/mainController.js"
import projectListController from "../controllers/projectListController.js"

const createProjectBtn = document.getElementById('create-button')
const createForm = document.getElementById('create-project-form')
const cancelBtn = document.getElementById('cancel-button')

createProjectBtn.addEventListener('click', () => {
  mainController.switchToCreateProject()
})

createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(createForm)
  const projectName = formData.get('project-name')
  const projectSummary = formData.get('project-summary')
  if (projectName && projectName.length >= 3) {
    createForm.reset()
    projectListController.createProject({name: projectName, summary: projectSummary, tasks: []})
    mainController.switchToProjectList()
  }
})

cancelBtn.addEventListener('click', () => {
  createForm.reset()
  mainController.switchToProjectList()
})

export default createProjectBtn