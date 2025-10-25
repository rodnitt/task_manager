import * as cards from "../ui/cardList.js"
import * as api from "../api/taskApi.js"

const list = []
let activeId

export async function createTask(projectId, taskData) {
  try {
    const taskJson = await api.postTask(projectId, taskData)
    list.push(taskJson)
    cards.addTask(taskJson)
    return taskJson
  }
  catch (error) {
    console.error("Task creation failed:", error)
    return null
  }
}

export async function getTasks(projectId) {
  try {
    if (list.length === 0)
      list.push(...(await api.getTasks(projectId)))
    cards.clearList()
    if (list.length > 0)
      cards.populateTaskList(list)
    return list.length
  }
  catch (error) {
    console.error("Error finding tasks:", error)
    return -1
  }
}

export function selectTask(taskData) {
  cards.activateCard(taskData.id)
  activeId = taskData.id
}
export function deselectTask() {
  cards.deactivateCard()
  activeId = undefined
}

export async function updateTask(taskData) {
  try {
    await api.putTask(taskData.id, taskData)
    cards.updateCard(taskData.id, taskData)
  }
  catch (error) {
    console.error("Error updating task:", error)
  }
}

export async function deleteTask(taskData) {
  try {
    api.deleteTask(taskData.id)
    document.getElementById(`card--id-${taskData.id}`).remove()
    list.splice(list.findIndex((v) => v.id == taskData.id), 1)
  }
  catch (error) {
    console.error("Attempt to delete task failed:", error)
  }
}

export function clearList() {
  activeId = undefined
  while (list.length > 0) list.pop()
}
