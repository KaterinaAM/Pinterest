import { saveBoardsToLocalStorage } from './storage.js';
import { renderBoard } from './renderBoard.js';

export function addToBoard(data, boards, boardId, itemId) {
    const itemToAdd = data.find(item => item.id === itemId);
    if (itemToAdd) {
        if (!boards[boardId]) {
            boards[boardId] = [];
        }
        if (!boards[boardId].some(item => item.id === itemId)) {
            boards[boardId].push(itemToAdd);
            saveBoardsToLocalStorage(boards);
            renderBoard(boardId, boards);
        }
    }
}

export function hideItem(itemId, boards) {
    const pinterestGrid = document.getElementById('pinterest-grid');
    const itemToRemove = pinterestGrid.querySelector(`.grid-item[data-id="${itemId}"]`);
    if (itemToRemove) {
        itemToRemove.remove();
    }
    Object.keys(boards).forEach(boardId => {
        boards[boardId] = boards[boardId].filter(boardItem => boardItem.id !== itemId);
        renderBoard(boardId, boards);
    });
    saveBoardsToLocalStorage(boards);
}

export function submitReport(itemId, reason, boards) {
    if (reason) {
        console.log(`Жалоба на пин с ID ${itemId}: ${reason}`);
        hideItem(itemId, boards);
    }
}
