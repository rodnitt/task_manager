import * as cards from "../ui/cardList.js"
import * as api from "../api/projectApi.js"

const list = []
let activeId

export async function createProject(projectData) {
  try {
    const projectJson = await api.postProject(projectData)
    cards.addProject(projectJson)
    list.unshift(projectJson)
    return projectJson
  }
  catch (error) {
    console.error("Error creating project:", error)
  }
}
export async function getProjects() {
  try {
    if (list.length === 0)
      list.push(...(await api.getProjects()))
    for (let project of list) {
      const progress = await api.getProjectProgress(project.id)
      project.tasks = [progress[2], progress[0] + progress[1] + progress[2]]
    }
    cards.clearList()
    if (list.length > 0)
      cards.populateProjectList(list)
    return list.length
  }
  catch (error) {
    console.error("Error finding projects:", error)
    return -1
  }
}

export async function updateProject(projectData) {
  try {
    await api.putProject(projectData.id, projectData)
    for (let i = 0; i < list.length; i++) {
      if (list[i].id != projectData.id) continue
      list[i] = projectData
      break
    }
  }
  catch (error) {
    console.error("Error updating project:", error)
  }
}

export async function deleteProject(projectData) {
  try {
    await api.deleteProject(projectData.id)
  }
  catch (error) {
    console.error("Attempt to delete project failed", error)
  }
}

export function clearList() {
  activeId = undefined
  while (list.length > 0) list.pop()
}
