export function showBoardModal(itemId) {
    const boardModal = document.getElementById('board-modal');
    const boardModalOverlay = document.getElementById('report-modal-overlay');
    boardModal.style.display = 'block';
    boardModalOverlay.style.display = 'block';
    boardModal.dataset.itemId = itemId;
}

export function showReportModal(itemId) {
    const reportModal = document.getElementById('report-modal');
    const reportModalOverlay = document.getElementById('report-modal-overlay');
    reportModal.style.display = 'block';
    reportModalOverlay.style.display = 'block';
    reportModal.dataset.itemId = itemId;
}

export function closeModals() {
    const modals = document.querySelectorAll('.modal');
    const overlays = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.style.display = 'none');
    overlays.forEach(overlay => overlay.style.display = 'none');
}
