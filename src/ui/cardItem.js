import { prettyfyDateStr } from '../utils/dateParser.js'

const CHAR_LIMIT = 60

function createCardLi({
  title, text, author, start, due, priority, tasks, status
}) {
  const li = document.createElement('li')
  li.classList.add(
    "card",
    "card-shaped",
    "card-bg",
    "drop-shadow",
    "flex-row-center",
    "gap-small"
  )
  if (tasks && tasks[1] != 0) {
    const progress = (tasks[0] / tasks[1] * 100).toString() + '%'
    const divBarFill = document.createElement('div')
    divBarFill.classList.add('progress-bar-fill')
    divBarFill.style.setProperty('width', progress)
    const spanCounter = document.createElement('span')
    spanCounter.innerText = `${tasks[0]}/${tasks[1]}`
    spanCounter.classList.add('label')
    li.appendChild(divBarFill)
    li.appendChild(spanCounter)
  }
  else if (status === "completed") {
    const divBarFill = document.createElement('div')
    divBarFill.classList.add('progress-bar-fill')
    divBarFill.style.setProperty('width', '100%')
    li.appendChild(divBarFill)
  }
  if (author) {
    const imgUser = document.createElement('img')
    imgUser.src = '../../images/user-icon.png'
    imgUser.alt = author.name || 'Author'
    imgUser.classList.add('user-icon')
    li.appendChild(imgUser)
  }
  if ([0, 2, 3].includes(priority)) {
    const imgPriority = document.createElement('img')
    imgPriority.src = `../../images/${priority === 0 ? 'optional' :
      priority === 2 ? 'important' :
        'urgent'
      }.png`
    imgPriority.alt = `${priority === 0 ? 'Optional' :
      priority === 2 ? 'Important' :
        'Urgent'
      } Icon`
    imgPriority.classList.add('card-icon')
    li.appendChild(imgPriority)
  }
  if (title) {
    const spanTitle = document.createElement('span')
    spanTitle.innerText = title || 'Title'
    spanTitle.classList.add('label')
    li.appendChild(spanTitle)
  }
  const canShowStart = start && (!due || Date.now() < new Date(start).getTime())
  if (canShowStart) {
    const imgFlag = document.createElement('img')
    imgFlag.src = '../../images/flag.png'
    imgFlag.alt = 'Start Date Icon'
    imgFlag.classList.add('card-icon')
    const spanDate = document.createElement('span')
    spanDate.innerText = prettyfyDateStr(start)
    spanDate.classList.add('label')
    if (status === "backlog" && Date.now() > new Date(start).getTime())
      spanDate.classList.add('alert-red')
    li.appendChild(imgFlag)
    li.appendChild(spanDate)
  }
  if (due && !canShowStart) {
    const imgClock = document.createElement('img')
    imgClock.src = '../../images/clock.png'
    imgClock.alt = 'Due Date Icon'
    imgClock.classList.add('card-icon')
    const spanDate = document.createElement('span')
    spanDate.innerText = prettyfyDateStr(due)
    spanDate.classList.add('label')
    if (status !== "completed" && Date.now() > new Date(due).getTime())
      spanDate.classList.add('alert-red')
    li.appendChild(imgClock)
    li.appendChild(spanDate)
  }
  if (text) {
    const spanText = document.createElement('span')
    spanText.innerText = text.slice(0, CHAR_LIMIT)
    spanText.classList.add('label-faded')
    li.appendChild(spanText)
  }

  return li
}

export function createProjectLi({ id, name, summary, startDate, dueDate, tasks = [0, 0] }) {
  const li = createCardLi({
    title: name,
    text: summary,
    start: startDate,
    due: dueDate,
    tasks,
    status: tasks[0] === tasks[1] ? "completed" : "not-completed"
  })
  li.id = `card--id-${id}`
  li.setAttribute("data-type", "project")
  li.setAttribute("data-id", id)
  return li
}

export function createTaskLi({ id, title, description, dueDate, priority, responsible, status }) {
  const li = createCardLi({
    title,
    text: description,
    author: responsible,
    due: dueDate,
    priority,
    status
  })
  li.id = `card--id-${id}`
  li.setAttribute("data-type", "task")
  li.setAttribute("data-id", id)
  return li
}