import "../css/style.css"
import characterImage from "../img/goblin.png"

export function getRandomIndex(max, excludedIndex) {
  if (!Number.isInteger(max) || max <= 1) {
    throw new Error("max должен быть целым числом больше 1")
  }

  const excluded = Number.isInteger(excludedIndex) ? excludedIndex : -1

  let next = excluded
  while (next === excluded) {
    next = Math.floor(Math.random() * max)
  }
  return next
}

export default function createGame({
  boardSelector = "#gameBoard",
  size = 4,
  intervalMs = 1000,
} = {}) {
  const board = document.querySelector(boardSelector)
  if (!board) {
    throw new Error(`Игровое поле не найдено по селектору: ${boardSelector}`)
  }

  board.textContent = ""
  const cells = []
  for (let i = 0; i < size * size; i += 1) {
    const cell = document.createElement("div")
    cell.className = "cell"
    cell.dataset.index = String(i)
    board.append(cell)
    cells.push(cell)
  }

  const character = document.createElement("img")
  character.className = "character"
  character.src = characterImage
  character.alt = "гном"

  let currentIndex = getRandomIndex(cells.length, -1)
  cells[currentIndex].append(character)

  const intervalId = setInterval(() => {
    const nextIndex = getRandomIndex(cells.length, currentIndex)
    cells[nextIndex].append(character)
    currentIndex = nextIndex
  }, intervalMs)

  return {
    board,
    cells,
    character,
    getCurrentIndex: () => currentIndex,
    stop: () => clearInterval(intervalId),
  }
}
