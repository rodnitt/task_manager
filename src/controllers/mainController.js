import * as main from '../ui/main.js'
import * as header from '../ui/header.js'
import * as projectListController from './projectListController.js'
import * as taskListController from './taskListController.js'
import * as detailPanelController from './detailPanelController.js'
import * as projectCreatorModal from '../ui/projectCreatorModal.js'
import * as taskCreatorModal from '../ui/taskCreatorModal.js'
import * as taskStatusModal from '../ui/taskStatusModal.js'

let activeTask
let activeProject
let isProjectModified = false

const mainController = {
  hideMain: () => {
    main.hideChildren()
  },
  renderProjects: async (refresh = false) => {
    taskListController.clearList()
    if (refresh)
      projectListController.clearList()
    header.setProjectMode()
    header.resetName()
    main.hideChildren()
    if (await projectListController.getProjects() == 0)
      main.showNoProjectMessage()
    main.showCardList()
    activeProject = undefined
  },
  renderTasks: async (projectData) => {
    header.setTaskMode()
    header.setName(projectData.name)
    if (await taskListController.getTasks(projectData.id) == 0)
      main.showNoTaskMessage()
    main.showCardList()
    activeProject = projectData
  },
  beginProjectEditing: (target = null) => {
    projectCreatorModal.edit(target)
  },
  beginTaskEditing: (target = null) => {
    taskCreatorModal.edit(target)
  },
  beginStatusChanging: (target) => {
    taskStatusModal.edit(target)
  },
  showProjectDetails: (projectData) => {
    if (!(projectData || activeProject)) return
    detailPanelController.setProject(projectData || activeProject)
    main.showCardDetails()
  },
  showTaskDetails: (taskData) => {
    detailPanelController.setTask(taskData)
    main.showCardDetails()
    taskListController.selectTask(taskData)
  },
  createProject: (projectData) => {
    projectListController.createProject(projectData)
      .then((newProjData) => {
        main.hideNoProjectMessage()
        mainController.renderTasks(newProjData)
        mainController.showProjectDetails(newProjData)
      })
  },
  updateProject: (projectData) => {
    projectListController.updateProject(projectData)
      .then(() => detailPanelController.setProject(projectData))
  },
  deleteProject: (projectData) => {
    projectListController.deleteProject(projectData)
      .then(() => mainController.renderProjects(true))
  },
  createTask: (taskData) => {
    taskListController.createTask(activeProject.id, taskData)
      .then((newTaskData) => {
        main.hideNoTaskMessage()
        detailPanelController.setTask(newTaskData)
        taskListController.selectTask(newTaskData)
        activeTask = newTaskData
        isProjectModified = true
      })

  },
  updateTask: (taskData) => {
    taskListController.updateTask(taskData)
      .then(() => {
        taskListController.selectTask(taskData)
        detailPanelController.setTask(taskData)
        activeTask = taskData
      })
  },
  deleteTask: (taskData) => {
    taskListController.deleteTask(taskData)
    detailPanelController.setProject(activeProject)
  }
}

export default mainController
