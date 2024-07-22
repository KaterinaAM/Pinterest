import { populateFilterOptions, renderGrid, filterByHashtag } from './grid.js';
import { showBoardModal, showReportModal, closeModals } from './modals.js';
import { addToBoard, submitReport, hideItem } from './actions.js';
import { loadBoardsFromLocalStorage, saveBoardsToLocalStorage } from './storage.js';
import { updateView } from './view.js';

document.addEventListener('DOMContentLoaded', function () {
    const data = [
        {
          "picture": "https://loremflickr.com/640/480/animals",
          "hashtag": "reboot",
          "user": "Ruben_Bartoletti17",
          "photo": "https://loremflickr.com/640/480/technics",
          "id": "1"
        },
        {
          "picture": "https://loremflickr.com/640/480/abstract",
          "hashtag": "microchip",
          "user": "Eliza_Grimes",
          "photo": "https://loremflickr.com/640/480/nature",
          "id": "2"
        },
        {
          "picture": "https://loremflickr.com/640/480/city",
          "hashtag": "cartilage",
          "user": "Darby.Reichel20",
          "photo": "https://loremflickr.com/640/480/abstract",
          "id": "3"
        },
        {
          "picture": "https://loremflickr.com/640/480/business",
          "hashtag": "Grocery",
          "user": "Brady23",
          "photo": "https://loremflickr.com/640/480/city",
          "id": "4"
        },
        {
          "picture": "https://loremflickr.com/640/480/fashion",
          "hashtag": "Internal",
          "user": "Ethelyn_Blanda43",
          "photo": "https://loremflickr.com/640/480/city",
          "id": "5"
        },
        {
          "picture": "https://loremflickr.com/640/480/nightlife",
          "hashtag": "Massachusetts",
          "user": "Jensen.Bednar",
          "photo": "https://loremflickr.com/640/480/cats",
          "id": "6"
        },
        {
          "picture": "https://loremflickr.com/640/480/nightlife",
          "hashtag": "array",
          "user": "Logan63",
          "photo": "https://loremflickr.com/640/480/animals",
          "id": "7"
        },
        {
          "picture": "https://loremflickr.com/640/480/people",
          "hashtag": "revolutionary",
          "user": "Gillian10",
          "photo": "https://loremflickr.com/640/480/city",
          "id": "8"
        },
        {
          "picture": "https://loremflickr.com/640/480/fashion",
          "hashtag": "Croatia",
          "user": "Carli.Abbott87",
          "photo": "https://loremflickr.com/640/480/nightlife",
          "id": "9"
        },
        {
          "picture": "https://loremflickr.com/640/480/city",
          "hashtag": "Pound",
          "user": "Jermain.Funk",
          "photo": "https://loremflickr.com/640/480/people",
          "id": "10"
        },
        {
          "picture": "https://loremflickr.com/640/480/abstract",
          "hashtag": "invoice",
          "user": "Sydni94",
          "photo": "https://loremflickr.com/640/480/nightlife",
          "id": "11"
        },
        {
          "picture": "https://loremflickr.com/640/480/sports",
          "hashtag": "Gibraltar",
          "user": "Rahul_Mraz",
          "photo": "https://loremflickr.com/640/480/animals",
          "id": "12"
        },
        {
          "picture": "https://loremflickr.com/640/480/animals",
          "hashtag": "Nampa",
          "user": "Annabel82",
          "photo": "https://loremflickr.com/640/480/business",
          "id": "13"
        },
        {
          "picture": "https://loremflickr.com/640/480/nightlife",
          "hashtag": "encryption",
          "user": "Gaetano_Lemke37",
          "photo": "https://loremflickr.com/640/480/business",
          "id": "14"
        },
        {
          "picture": "https://loremflickr.com/640/480/city",
          "hashtag": "Account",
          "user": "Lulu_Wolf66",
          "photo": "https://loremflickr.com/640/480/cats",
          "id": "15"
        },
        {
          "picture": "https://loremflickr.com/640/480/city",
          "hashtag": "haptic",
          "user": "Gregorio.Vandervort",
          "photo": "https://loremflickr.com/640/480/sports",
          "id": "16"
        },
        {
          "picture": "https://loremflickr.com/640/480/city",
          "hashtag": "magni",
          "user": "Willow.Okuneva55",
          "photo": "https://loremflickr.com/640/480/nightlife",
          "id": "17"
        },
        {
          "picture": "https://loremflickr.com/640/480/city",
          "hashtag": "Visionary",
          "user": "Kelly95",
          "photo": "https://loremflickr.com/640/480/cats",
          "id": "18"
        },
        {
          "picture": "https://loremflickr.com/640/480/transport",
          "hashtag": "facilis",
          "user": "Kailee.Cassin",
          "photo": "https://loremflickr.com/640/480/business",
          "id": "19"
        },
        {
          "picture": "https://loremflickr.com/640/480/nightlife",
          "hashtag": "Dinar",
          "user": "Alice74",
          "photo": "https://loremflickr.com/640/480/city",
          "id": "20"
        },
        {
          "picture": "https://loremflickr.com/640/480/business",
          "hashtag": "connecting",
          "user": "Katlynn.Kuvalis",
          "photo": "https://loremflickr.com/640/480/sports",
          "id": "21"
        },
        {
          "picture": "https://loremflickr.com/640/480/animals",
          "hashtag": "Hip",
          "user": "Dayne.Smith60",
          "photo": "https://loremflickr.com/640/480/sports",
          "id": "22"
        },
        {
          "picture": "https://loremflickr.com/640/480/cats",
          "hashtag": "Persistent",
          "user": "Jermey52",
          "photo": "https://loremflickr.com/640/480/abstract",
          "id": "23"
        },
        {
          "picture": "https://loremflickr.com/640/480/transport",
          "hashtag": "Grocery",
          "user": "Fausto8",
          "photo": "https://loremflickr.com/640/480/business",
          "id": "24"
        },
        {
          "picture": "https://loremflickr.com/640/480/cats",
          "hashtag": "Small",
          "user": "Elsie43",
          "photo": "https://loremflickr.com/640/480/food",
          "id": "25"
        },
        {
          "picture": "https://loremflickr.com/640/480/cats",
          "hashtag": "Nickel",
          "user": "Dana56",
          "photo": "https://loremflickr.com/640/480/animals",
          "id": "26"
        },
        {
          "picture": "https://loremflickr.com/640/480/technics",
          "hashtag": "Ohio",
          "user": "Margot_Sanford30",
          "photo": "https://loremflickr.com/640/480/fashion",
          "id": "27"
        },
        {
          "picture": "https://loremflickr.com/640/480/nightlife",
          "hashtag": "Chief",
          "user": "Kadin.Pollich",
          "photo": "https://loremflickr.com/640/480/people",
          "id": "28"
        }
      ];
    
    const boards = loadBoardsFromLocalStorage(); 

    const pinterestGrid = document.getElementById('pinterest-grid');
    const hashtagFilter = document.getElementById('hashtag-filter');
    const viewSelect = document.getElementById('view-select');
    const saveBoardBtn = document.getElementById('save-board-btn');
    const closeBoardModal = document.getElementById('close-board-modal');
    const closeReportModal = document.getElementById('close-report-modal');
    const submitReportBtn = document.getElementById('submit-report-btn');

    // Event Listeners
    hashtagFilter.addEventListener('change', function () {
        if (viewSelect.value === 'my-feed') {
            filterByHashtag(data, hashtagFilter.value, boards);
        }
    });

    viewSelect.addEventListener('change', () => updateView(data, boards));

    saveBoardBtn.addEventListener('click', function () {
        const boardId = document.querySelector('input[name="board-select"]:checked').value;
        const itemId = document.getElementById('board-modal').dataset.itemId;
        addToBoard(data, boards, boardId, itemId);
        closeModals();
    });

    closeBoardModal.addEventListener('click', closeModals);
    closeReportModal.addEventListener('click', closeModals);

    submitReportBtn.addEventListener('click', function () {
        const itemId = document.getElementById('report-modal').dataset.itemId;
        const reason = document.querySelector('input[name="report-reason"]:checked').value;
        submitReport(itemId, reason, boards);
        closeModals();
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('show-board-modal')) {
            showBoardModal(event.target.dataset.id);
        }
        if (event.target.classList.contains('show-report-modal')) {
            showReportModal(event.target.dataset.id);
        }
    });

    // Инициализация
    populateFilterOptions(data);
    updateView(data, boards); 
});
