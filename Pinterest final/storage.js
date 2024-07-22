export function saveBoardsToLocalStorage(boards) {
    localStorage.setItem('boards', JSON.stringify(boards));
}

export function loadBoardsFromLocalStorage() {
    const savedBoards = localStorage.getItem('boards');
    return savedBoards ? JSON.parse(savedBoards) : { 'my-feed': [] };
}
