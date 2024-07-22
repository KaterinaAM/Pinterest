import { filterByHashtag } from './grid.js';
import { renderBoard } from './renderBoard.js';

export function updateView(data, boards) {
    const viewSelect = document.getElementById('view-select');
    const view = viewSelect.value;
    if (view === 'my-feed') {
        const hashtagFilter = document.getElementById('hashtag-filter');
        filterByHashtag(data, hashtagFilter.value);
    } else {
        renderBoard(view, boards);
    }
}
