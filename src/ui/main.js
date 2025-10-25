const element = document.querySelector('main')
const cardDetail = document.getElementById('detail')
const cardList = document.getElementById('card-list')
const noProjMsg = document.getElementById('no-projects-message')
const noTaskMsg = document.getElementById('no-tasks-message')

export function hideChildren() {
  const children = element.children
  for (let i = 0; i < children.length; i++) {
    if (!children[i].classList.contains('hidden')) {
      children[i].classList.add('hidden')
    }
  }
}
export function showCardList() {
  cardList.classList.remove('hidden')
}
export function showCardDetails() {
  cardDetail.classList.remove('hidden')
}
export function showNoProjectMessage() {
  noProjMsg.classList.remove('hidden')
}
export function showNoTaskMessage() {
  noTaskMsg.classList.remove('hidden')
}
export function hideNoProjectMessage() {
  noProjMsg.classList.add('hidden')
}
export function hideNoTaskMessage() {
  noTaskMsg.classList.add('hidden')
}
