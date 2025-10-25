import { SERVER_URL } from "../config/config.js"

export async function getProjects() {
  const response = await fetch(`${SERVER_URL}/project/list`)
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to fetch projects')
  return await response.json()
}

export async function getProjectProgress(id) {
  const response = await fetch(`${SERVER_URL}/project/${id}/progress`)
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to fetch project data')
  return await response.json()
}

export async function getProjectColabs(id) {
  const response = await fetch(`${SERVER_URL}/project/${id}/users`)
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to fetch project data')
  return await response.json()
}

export async function putProject(projectId, projectData) {
  const response = await fetch(`${SERVER_URL}/project/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(projectData)
  })
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to update project')
  return await response.json()
}

export async function postProject(projectData) {
  const response = await fetch(`${SERVER_URL}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(projectData)
  })
  if (!response.ok)
    throw new Error((await response.json()).error || 'Failed to create project')
  return await response.json()
}

export async function deleteProject(projectId) {
  const response = await fetch(`${SERVER_URL}/project/${projectId}`, {
    method: "DELETE"
  })
  if (!response.ok)
    throw new Error((await response.json()).error || "Failed to delete project")
  return await response.json()
}
