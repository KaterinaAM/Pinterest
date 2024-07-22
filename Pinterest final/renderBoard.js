import { renderGrid } from './grid.js';

export function renderBoard(boardId, boards) {
    const boardSection = document.getElementById('pinterest-grid');
    boardSection.innerHTML = '';
    const items = boards[boardId] || [];
    renderGrid(items);
}
