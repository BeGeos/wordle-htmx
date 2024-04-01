const INITIAL_PAGE = 1
let page = INITIAL_PAGE

export const createPager = () => {
    return {
        get page() {return page},
        increment: () => {++page},
        decrement: () => {page > 1 ? --page : page},
        reset: () => {page = INITIAL_PAGE}
    }
}