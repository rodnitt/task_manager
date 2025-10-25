import * as detailPanel from "../ui/detailPanel.js"
import * as projectApi from "../api/projectApi.js"

export async function setProject(projectData) {
  try {
    if (!projectData.collaborators) {
      const collaborators = await projectApi.getProjectColabs(projectData.id)
      projectData.collaborators = collaborators
    }
    detailPanel.setProjectFormat(projectData)
  }
  catch (error) {
    console.error('Fail to fetch project\'s collaborators:', error)
  }
}

export function setTask(taskData) {
  detailPanel.setTaskFormat(taskData)
}
