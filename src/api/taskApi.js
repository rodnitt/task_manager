import { SERVER_URL } from "../config/config.js"

export async function getTasks(projectId) {
  const response = await fetch(`${SERVER_URL}/project/${projectId}/tasks`)
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to fetch tasks')
  return await response.json()
}

export async function postTask(projectId, taskData) {
  const response = await fetch(`${SERVER_URL}/task/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskData)
  })
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to create task')
  return await response.json()
}

export async function putTask(taskId, taskData) {
  const response = await fetch(`${SERVER_URL}/task/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskData)
  })
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to update task')
  return await response.json()
}

export async function deleteTask(taskId) {
  const response = await fetch(`${SERVER_URL}/task/${taskId}`, {
    method: "DELETE"
  })
  if (!response.ok)
    throw new Error((await response.json()).error || "Failed to delete task")
  return await response.json()
}