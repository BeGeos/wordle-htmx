export type Cell = {
    filled?: boolean
    letter?: string
    status?: 'correct' | 'wrong' | 'wrong-location' | 'initial',
    checked?: boolean
}

export const ROWS = 6;
export const COLS = 5;
export const SIZE = ROWS * COLS;

export const INITIAL_VALUE: Cell = {
  filled: false,
  letter: '',
  status: 'initial',
  checked: false
};
const initials: Cell[] = Array(SIZE).fill(INITIAL_VALUE);

let grid = initials

export const createGrid = () => {

    return {
        get grid() {return grid},
        update: (values: Cell[]) => {
            return grid = values
        },
        reset: () => {
            return grid = initials
        }
    }
}