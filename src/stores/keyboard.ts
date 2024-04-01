export type Key = {
    key: string,
    status?: 'wrong' | 'wrong-location' | 'correct' | 'initial'
}

let qwerty = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '', '', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Back']
let initials: Key[] = qwerty.map((key) => {
    return {
        key,
        status: 'initial'
    }
})
let keys: Key[] = initials

export const createKeyboard = () => {
    return {
        get keys() {return keys},
        update: (_keys: Key[]) => {return keys = _keys},
        reset: () => {return keys = initials}
    }
}