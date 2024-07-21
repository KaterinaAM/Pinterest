document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "HTTP", user: "Joanne50", photo: "https://loremflickr.com/640/480/transport", id: "1" },
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "TLS", user: "Ron_Howell", photo: "https://loremflickr.com/640/480/fashion", id: "2" },
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "orange", user: "Delores_Monahan30", photo: "https://loremflickr.com/640/480/business", id: "3" },
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "Wooden", user: "Lenna53", photo: "https://loremflickr.com/640/480/nightlife", id: "4" },
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "scalable", user: "Gregg.Cruickshank", photo: "https://loremflickr.com/640/480/nature", id: "5" },
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "hacking", user: "Adelle.Schneider", photo: "https://loremflickr.com/640/480/transport", id: "6" },
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "dynamic", user: "Jamison_Bayer", photo: "https://loremflickr.com/640/480/technics", id: "7" },
        { picture: "https://loremflickr.com/640/480/cats", hashtag: "Accounts", user: "Angie.Mills16", photo: "https://loremflickr.com/640/480/city", id: "8" }
    ];

    let boards = loadBoardsFromLocalStorage();

    const pinterestGrid = document.getElementById('pinterest-grid');
    const hashtagFilter = document.getElementById('hashtag-filter');
    const viewSelect = document.getElementById('view-select');
    const boardModal = document.getElementById('board-modal');
    const reportModal = document.getElementById('report-modal');
    const boardModalOverlay = document.getElementById('board-modal-overlay');
    const reportModalOverlay = document.getElementById('report-modal-overlay');
    const modalBoardSelect = document.getElementById('modal-board-select');
    const saveBoardBtn = document.getElementById('save-board-btn');
    const closeBoardModal = document.getElementById('close-board-modal');
    const closeReportModal = document.getElementById('close-report-modal');
    const reportReason = document.getElementById('report-reason');
    const submitReportBtn = document.getElementById('submit-report-btn');

    function renderGrid(items) {
        pinterestGrid.innerHTML = '';
        items.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.id = item.id;

            gridItem.innerHTML = `
                <img src="${item.picture}" alt="${item.hashtag}">
                <div class="info">
                    <img src="${item.photo}" alt="${item.user}" style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover;">
                    <h3>${item.user}</h3>
                    <p>#${item.hashtag}</p>
                </div>
                <div class="menu">
                    <button class="add-to-board-btn">Добавить на доску</button>
                    <button class="report-btn">Скрыть</button>
                </div>
            `;

            pinterestGrid.appendChild(gridItem);

            const addToBoardBtn = gridItem.querySelector('.add-to-board-btn');
            const reportBtn = gridItem.querySelector('.report-btn');

            addToBoardBtn.addEventListener('click', function () {
                showBoardModal(item.id);
            });

            reportBtn.addEventListener('click', function () {
                showReportModal(item.id);
            });
        });
    }

    function populateFilterOptions() {
        const hashtags = new Set(data.map(item => item.hashtag));
        hashtags.forEach(hashtag => {
            const option = document.createElement('option');
            option.value = hashtag;
            option.textContent = `#${hashtag}`;
            hashtagFilter.appendChild(option);
        });
    }

    function filterByHashtag(hashtag) {
        const filteredData = hashtag ? data.filter(item => item.hashtag === hashtag) : data;
        renderGrid(filteredData);
    }

    function showBoardModal(itemId) {
        boardModal.style.display = 'block';
        boardModalOverlay.style.display = 'block';
        boardModal.dataset.itemId = itemId;
    }

    function showReportModal(itemId) {
        reportModal.style.display = 'block';
        reportModalOverlay.style.display = 'block';
        reportModal.dataset.itemId = itemId;
    }

    function addToBoard(boardId, itemId) {
        const itemToAdd = data.find(item => item.id === itemId);
        if (itemToAdd) {
            if (!boards[boardId]) {
                boards[boardId] = [];
            }
            if (!boards[boardId].some(item => item.id === itemId)) {
                boards[boardId].push(itemToAdd);
                saveBoardsToLocalStorage();
                renderBoard(boardId);
            }
        }
    }

    function hideItem(itemId) {
        const itemToRemove = pinterestGrid.querySelector(`.grid-item[data-id="${itemId}"]`);
        if (itemToRemove) {
            itemToRemove.remove();
        }
        Object.keys(boards).forEach(boardId => {
            boards[boardId] = boards[boardId].filter(boardItem => boardItem.id !== itemId);
            renderBoard(boardId);
        });
        saveBoardsToLocalStorage();
    }

    function submitReport(itemId) {
        const reason = reportReason.value;
        if (reason) {
            console.log(`Жалоба на пин с ID ${itemId}: ${reason}`);
            hideItem(itemId);
        }
        reportModal.style.display = 'none';
        reportModalOverlay.style.display = 'none';
    }

    function saveBoardsToLocalStorage() {
        localStorage.setItem('boards', JSON.stringify(boards));
    }

    function loadBoardsFromLocalStorage() {
        const savedBoards = localStorage.getItem('boards');
        return savedBoards ? JSON.parse(savedBoards) : { 'my-feed': data };
    }

    function renderBoard(boardId) {
        const boardSection = document.getElementById('pinterest-grid');
        boardSection.innerHTML = '';
        const items = boards[boardId] || [];
        renderGrid(items);
    }

    function updateView() {
        const view = viewSelect.value;
        if (view === 'my-feed') {
            filterByHashtag(hashtagFilter.value);
        } else {
            renderBoard(view);
        }
    }

    hashtagFilter.addEventListener('change', function () {
        if (viewSelect.value === 'my-feed') {
            filterByHashtag(this.value);
        }
    });

    viewSelect.addEventListener('change', updateView);

    saveBoardBtn.addEventListener('click', function () {
        const boardId = modalBoardSelect.value;
        const itemId = boardModal.dataset.itemId;
        addToBoard(boardId, itemId);
        boardModal.style.display = 'none';
        boardModalOverlay.style.display = 'none';
    });

    closeBoardModal.addEventListener('click', function () {
        boardModal.style.display = 'none';
        boardModalOverlay.style.display = 'none';
    });

    closeReportModal.addEventListener('click', function () {
        reportModal.style.display = 'none';
        reportModalOverlay.style.display = 'none';
    });

    submitReportBtn.addEventListener('click', function () {
        const itemId = reportModal.dataset.itemId;
        submitReport(itemId);
    });

    boardModalOverlay.addEventListener('click', function () {
        boardModal.style.display = 'none';
        boardModalOverlay.style.display = 'none';
    });

    reportModalOverlay.addEventListener('click', function () {
        reportModal.style.display = 'none';
        reportModalOverlay.style.display = 'none';
    });

    populateFilterOptions();
    updateView();
});
