export function renderGrid(items) {
  const pinterestGrid = document.getElementById('pinterest-grid');
  pinterestGrid.innerHTML = ''; 
  items.forEach(item => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      gridItem.dataset.id = item.id; 

      gridItem.innerHTML = `
        <img src="${item.picture}" alt="${item.hashtag}">
        <div class="info">
          <img src="${item.photo}" alt="${item.user}">
          <p>${item.user}</p>
          <p>#${item.hashtag}</p>
        </div>
        <div class="menu">
          <button class="show-board-modal" data-id="${item.id}">Добавить на доску</button>
          <button class="show-report-modal" data-id="${item.id}">Скрыть</button>
        </div>
      `;
      pinterestGrid.appendChild(gridItem);
  });
}

export function populateFilterOptions(data) {
  const hashtagFilter = document.getElementById('hashtag-filter');
  const hashtags = new Set(data.map(item => item.hashtag));
  hashtags.forEach(hashtag => {
      const option = document.createElement('option');
      option.value = hashtag;
      option.textContent = `#${hashtag}`;
      hashtagFilter.appendChild(option);
  });
}

export function filterByHashtag(data, hashtag) {
  const filteredData = hashtag ? data.filter(item => item.hashtag === hashtag) : data;
  renderGrid(filteredData);
}
