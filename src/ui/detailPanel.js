import { prettyfyDateStr } from "../utils/dateParser.js"

const element = document.getElementById('detail')
const alertBacklog = document.getElementById('detail--backlog')
const alertInProgress = document.getElementById('detail--in-progress')
const alertAccomplished = document.getElementById('detail--accomplished')
const title = document.getElementById('detail__title')
const options = document.getElementById('detail__options')
const btnEditProj = document.getElementById('edit-project')
// const btnManageCol = document.getElementById('manage-collaborators-project')
const btnDeleteProj = document.getElementById('delete-project')
const btnEditTask = document.getElementById('edit-task')
// const btnSetAuthor = document.getElementById('set-author-task')
const btnStatus = document.getElementById('change-status-task')
const btnDeleteTask = document.getElementById('delete-task')
const text = document.getElementById('detail__text')
const authorInfo = document.getElementById('resp-info')
// const authorIcon = document.getElementById('resp-icon')
const authorName = document.getElementById('resp-name')
const priorityOptional = document.getElementById('detail__task-priority--optional')
const priorityImportant = document.getElementById('detail__task-priority--important')
const priorityUrgent = document.getElementById('detail__task-priority--urgent')
// const dates = document.getElementById('detail__dates')
const startDate = document.getElementById('detail__start-date')
const startDateText = document.getElementById('detail__start-date__text')
const dueDate = document.getElementById('detail__due-date')
const dueDateText = document.getElementById('detail__due-date__text')
const dueDateOvertime = document.getElementById('detail__due-date__overtime')
const progress = document.getElementById('detail__progress')
const progressFill = document.getElementById('detail__progress-bar__fill')
const progressStatus = document.getElementById('detail__progress__status')
const collaborators = document.getElementById('detail__collaborators')

const COLAB_LIST_MAX_LEN = 5
let dataObj = {}

;[
  [btnEditProj, "click-edit-project"],
  [btnDeleteProj, "click-delete-project"],
  [btnEditTask, "click-edit-task"],
  [btnStatus, "click-change-status"],
  [btnDeleteTask, "click-delete-task"]
]
  .forEach(i => {
    i[0].addEventListener('click', (e) => {
      e.stopPropagation()
      element.dispatchEvent(new CustomEvent(i[1], {
        detail: {
          data: dataObj
        },
        bubbles: true
      }))
    })
  })

export function getData() { return dataObj }
export function setProjectFormat(data) {
  dataObj = { ...data }
  alertBacklog.classList.add('hidden')
  alertInProgress.classList.add('hidden')

  title.innerText = data.name || "Project"
  options.setAttribute('data-type', 'project')
  text.innerText = data.summary

  authorInfo.classList.add('hidden')
  priorityOptional.classList.add('hidden')
  priorityImportant.classList.add('hidden')
  priorityUrgent.classList.add('hidden')

  if (data.startDate) {
    startDateText.innerText = prettyfyDateStr(data.startDate)
    startDate.classList.remove('hidden')
  }
  else startDate.classList.add('hidden')
  if (data.dueDate) {
    dueDateText.innerText = prettyfyDateStr(data.dueDate)
    dueDate.classList.remove('hidden')
    if (Date.now() > new Date(data.dueDate).getTime())
      dueDateOvertime.classList.remove('hidden')
    else dueDateOvertime.classList.add('hidden')
  }
  else dueDate.classList.add('hidden')

  if (data.tasks && data.tasks[1] > 0) {
    progressFill.style.width = `${data.tasks[0] / data.tasks[1] * 100}%`
    progressStatus.innerText = `${data.tasks[0]}/${data.tasks[1]} tasks completed`
    progress.classList.remove('hidden')
    if (data.tasks[0] === data.tasks[1])
      alertAccomplished.classList.remove('hidden')
    else
      alertAccomplished.classList.add('hidden')
  }
  else {
    progress.classList.add('hidden')
    alertAccomplished.classList.add('hidden')
  }

  collaborators.innerHTML = ""
  if (data.collaborators) {
    for (let i = 0; i < data.collaborators.count && i < COLAB_LIST_MAX_LEN; i++) {
      const icon = document.createElement('img')
      icon.src = "images/user-icon.png"
      icon.title = data.collaborators.rows[i].User.name
      icon.alt = icon.title + " Icon"
      icon.classList.add('user-icon')
      collaborators.appendChild(icon)
    }
    if (data.collaborators.count > COLAB_LIST_MAX_LEN) {
      const howManyLeft = data.collaborators.count - COLAB_LIST_MAX_LEN
      const span = document.createElement('span')
      span.innerText = `+${howManyLeft} more`
      span.classList.add('label')
      collaborators.appendChild(span)
    }
  }
}
export function setTaskFormat(data) {
  dataObj = { ...data }
  if (data.status === 'backlog')
    alertBacklog.classList.remove('hidden')
  else
    alertBacklog.classList.add('hidden')
  if (data.status === 'in progress')
    alertInProgress.classList.remove('hidden')
  else
    alertInProgress.classList.add('hidden')
  if (data.status === 'completed')
    alertAccomplished.classList.remove('hidden')
  else
    alertAccomplished.classList.add('hidden')

  title.innerText = data.title || "Task"
  options.setAttribute('data-type', 'task')
  text.innerText = data.description

  if (data.responsible) {
    authorName.innerText = data.responsible.name
    authorInfo.classList.remove('hidden')
  }
  else authorInfo.classList.add('hidden')

  if (data.priority === 0)
    priorityOptional.classList.remove('hidden')
  else
    priorityOptional.classList.add('hidden')
  if (data.priority === 2)
    priorityImportant.classList.remove('hidden')
  else
    priorityImportant.classList.add('hidden')
  if (data.priority === 3)
    priorityUrgent.classList.remove('hidden')
  else
    priorityUrgent.classList.add('hidden')

  if (data.startDate) {
    startDateText.innerText = prettyfyDateStr(data.startDate)
    startDate.classList.remove('hidden')
  }
  else startDate.classList.add('hidden')
  if (data.dueDate) {
    dueDateText.innerText = prettyfyDateStr(data.dueDate)
    dueDate.classList.remove('hidden')
    if ( data.status !== 'completed' && Date.now() > new Date(data.dueDate).getTime())
      dueDateOvertime.classList.remove('hidden')
    else dueDateOvertime.classList.add('hidden')
  }
  else dueDate.classList.add('hidden')

  progress.classList.add('hidden')

  collaborators.innerHTML = ""
}
