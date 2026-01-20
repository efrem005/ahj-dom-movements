import createGame, { getRandomIndex } from "../app"

describe("createGame", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="game-board" id="gameBoard"></div>
      </div>
    `
  })

  test("создаёт поле 4x4 и помещает одного персонажа в случайную клетку", () => {
    const randomSpy = jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.0)

    const game = createGame({ intervalMs: 1000 })

    expect(game.cells).toHaveLength(16)
    expect(game.board.querySelectorAll(".cell")).toHaveLength(16)

    const characters = game.board.querySelectorAll("img.character")
    expect(characters).toHaveLength(1)
    expect(game.getCurrentIndex()).toBe(0)

    game.stop()
    randomSpy.mockRestore()
  })

  test("перемещает персонажа в другую клетку", () => {
    jest.useFakeTimers()

    const randomSpy = jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.0)
      .mockReturnValueOnce(0.0)
      .mockReturnValueOnce(1 / 16)

    const game = createGame({ intervalMs: 1000 })
    expect(game.getCurrentIndex()).toBe(0)

    jest.advanceTimersByTime(1000)
    expect(game.getCurrentIndex()).toBe(1)

    const characters = game.board.querySelectorAll("img.character")
    expect(characters).toHaveLength(1)
    expect(game.cells[1].querySelector("img.character")).not.toBeNull()

    game.stop()
    randomSpy.mockRestore()
    jest.useRealTimers()
  })
})

describe("getRandomIndex", () => {
  test("бросает ошибку, если max меньше или равно 1", () => {
    expect(() => getRandomIndex(1, 0)).toThrow(
      "max должен быть целым числом больше 1",
    )
    expect(() => getRandomIndex(0, 0)).toThrow(
      "max должен быть целым числом больше 1",
    )
  })

  test("возвращает индекс, отличный от excludedIndex, даже если excludedIndex не целое число", () => {
    const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.6)

    const result = getRandomIndex(4, 1.5)

    expect(result).toBe(Math.floor(0.6 * 4))

    randomSpy.mockRestore()
  })
})

describe("ошибки createGame", () => {
  test("бросает ошибку, если игровое поле не найдено по селектору", () => {
    document.body.innerHTML = `<div id="otherBoard"></div>`

    expect(() =>
      createGame({ boardSelector: "#gameBoard" }),
    ).toThrowError("Игровое поле не найдено по селектору: #gameBoard")
  })
})