import type { Cell } from "./grid"
import type { Key } from "./keyboard"

import WORDS from '../../words.json'

import {ROWS} from './grid'

const randomIndex = Math.floor(Math.random() *  WORDS.length - 1)
const WORD_OF_THE_DAY = WORDS[randomIndex]
console.log(WORD_OF_THE_DAY)

export type CheckedCells = [Cell, Cell, Cell, Cell, Cell]

const _check = (cell: Cell, index: number) => {
    // If letter is in the correct position
    if (WORD_OF_THE_DAY.at(index) === cell.letter) return 1

    // If letter is in the word
    if (WORD_OF_THE_DAY.includes(cell.letter!)) return 0

    // If letter is not in word
    return -1
}

const _check_keys = (cells: Cell[], keys: Key[]) => {
    const temp = structuredClone(keys)
    cells.forEach(({letter, status}) => {
        const key = temp.find(({key}) => key === letter) as Key
        return key.status = status
    })

    return temp
}

const _hasWon = (cells: CheckedCells) => {
    return cells.every((cell) => cell.status === 'correct')
}

const _hasLost = (cells: CheckedCells, page: number) => {
    if (_hasWon(cells)) return false

    return page === ROWS
}

const _isWord = (word: string) => {
    return WORDS.includes(word)
}

const check = (cells: CheckedCells): CheckedCells => {

    const checked = cells.map((cell, index) => {
        const score = _check(cell, index)
        const checked = true

        if (score === 1) return {...cell, status: 'correct', checked}
        if (score === 0) return {...cell, status: 'wrong-location', checked}
        if (score < 0) return {...cell, status: 'wrong', checked}
    })

    return checked as CheckedCells
}

let winner = false
let canPlay = true

export const createChecker = () => {
    return {
        get winner() {return winner},
        get canPlay() {return canPlay},
        isWord: _isWord,
        check,
        hasWon: _hasWon,
        hasLost: _hasLost,
        setWinner: () => {return winner = true},
        endGame: () => {return canPlay = false},
        updateKeys: (cells: Cell[], keys: Key[]) => {return _check_keys(cells, keys)},
        reset: () => {
            winner = false,
            canPlay = true
        }
    }
}   