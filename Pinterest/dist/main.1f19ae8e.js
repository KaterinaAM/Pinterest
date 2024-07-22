// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByHashtag = filterByHashtag;
exports.populateFilterOptions = populateFilterOptions;
exports.renderGrid = renderGrid;
function renderGrid(items) {
  var pinterestGrid = document.getElementById('pinterest-grid');
  pinterestGrid.innerHTML = '';
  items.forEach(function (item) {
    var gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.dataset.id = item.id;
    gridItem.innerHTML = "\n        <img src=\"".concat(item.picture, "\" alt=\"").concat(item.hashtag, "\">\n        <div class=\"info\">\n          <img src=\"").concat(item.photo, "\" alt=\"").concat(item.user, "\">\n          <p>").concat(item.user, "</p>\n          <p>#").concat(item.hashtag, "</p>\n        </div>\n        <div class=\"menu\">\n          <button class=\"show-board-modal\" data-id=\"").concat(item.id, "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u0434\u043E\u0441\u043A\u0443</button>\n          <button class=\"show-report-modal\" data-id=\"").concat(item.id, "\">\u0421\u043A\u0440\u044B\u0442\u044C</button>\n        </div>\n      ");
    pinterestGrid.appendChild(gridItem);
  });
}
function populateFilterOptions(data) {
  var hashtagFilter = document.getElementById('hashtag-filter');
  var hashtags = new Set(data.map(function (item) {
    return item.hashtag;
  }));
  hashtags.forEach(function (hashtag) {
    var option = document.createElement('option');
    option.value = hashtag;
    option.textContent = "#".concat(hashtag);
    hashtagFilter.appendChild(option);
  });
}
function filterByHashtag(data, hashtag) {
  var filteredData = hashtag ? data.filter(function (item) {
    return item.hashtag === hashtag;
  }) : data;
  renderGrid(filteredData);
}
},{}],"modals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeModals = closeModals;
exports.showBoardModal = showBoardModal;
exports.showReportModal = showReportModal;
function showBoardModal(itemId) {
  var boardModal = document.getElementById('board-modal');
  var boardModalOverlay = document.getElementById('report-modal-overlay');
  boardModal.style.display = 'block';
  boardModalOverlay.style.display = 'block';
  boardModal.dataset.itemId = itemId;
}
function showReportModal(itemId) {
  var reportModal = document.getElementById('report-modal');
  var reportModalOverlay = document.getElementById('report-modal-overlay');
  reportModal.style.display = 'block';
  reportModalOverlay.style.display = 'block';
  reportModal.dataset.itemId = itemId;
}
function closeModals() {
  var modals = document.querySelectorAll('.modal');
  var overlays = document.querySelectorAll('.modal-overlay');
  modals.forEach(function (modal) {
    return modal.style.display = 'none';
  });
  overlays.forEach(function (overlay) {
    return overlay.style.display = 'none';
  });
}
},{}],"storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBoardsFromLocalStorage = loadBoardsFromLocalStorage;
exports.saveBoardsToLocalStorage = saveBoardsToLocalStorage;
function saveBoardsToLocalStorage(boards) {
  localStorage.setItem('boards', JSON.stringify(boards));
}
function loadBoardsFromLocalStorage() {
  var savedBoards = localStorage.getItem('boards');
  return savedBoards ? JSON.parse(savedBoards) : {
    'my-feed': []
  };
}
},{}],"renderBoard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBoard = renderBoard;
var _grid = require("./grid.js");
function renderBoard(boardId, boards) {
  var boardSection = document.getElementById('pinterest-grid');
  boardSection.innerHTML = '';
  var items = boards[boardId] || [];
  (0, _grid.renderGrid)(items);
}
},{"./grid.js":"grid.js"}],"actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToBoard = addToBoard;
exports.hideItem = hideItem;
exports.submitReport = submitReport;
var _storage = require("./storage.js");
var _renderBoard = require("./renderBoard.js");
function addToBoard(data, boards, boardId, itemId) {
  var itemToAdd = data.find(function (item) {
    return item.id === itemId;
  });
  if (itemToAdd) {
    if (!boards[boardId]) {
      boards[boardId] = [];
    }
    if (!boards[boardId].some(function (item) {
      return item.id === itemId;
    })) {
      boards[boardId].push(itemToAdd);
      (0, _storage.saveBoardsToLocalStorage)(boards);
      (0, _renderBoard.renderBoard)(boardId, boards);
    }
  }
}
function hideItem(itemId, boards) {
  var pinterestGrid = document.getElementById('pinterest-grid');
  var itemToRemove = pinterestGrid.querySelector(".grid-item[data-id=\"".concat(itemId, "\"]"));
  if (itemToRemove) {
    itemToRemove.remove();
  }
  Object.keys(boards).forEach(function (boardId) {
    boards[boardId] = boards[boardId].filter(function (boardItem) {
      return boardItem.id !== itemId;
    });
    (0, _renderBoard.renderBoard)(boardId, boards);
  });
  (0, _storage.saveBoardsToLocalStorage)(boards);
}
function submitReport(itemId, reason, boards) {
  if (reason) {
    console.log("\u0416\u0430\u043B\u043E\u0431\u0430 \u043D\u0430 \u043F\u0438\u043D \u0441 ID ".concat(itemId, ": ").concat(reason));
    hideItem(itemId, boards);
  }
}
},{"./storage.js":"storage.js","./renderBoard.js":"renderBoard.js"}],"view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateView = updateView;
var _grid = require("./grid.js");
var _renderBoard = require("./renderBoard.js");
function updateView(data, boards) {
  var viewSelect = document.getElementById('view-select');
  var view = viewSelect.value;
  if (view === 'my-feed') {
    var hashtagFilter = document.getElementById('hashtag-filter');
    (0, _grid.filterByHashtag)(data, hashtagFilter.value);
  } else {
    (0, _renderBoard.renderBoard)(view, boards);
  }
}
},{"./grid.js":"grid.js","./renderBoard.js":"renderBoard.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _grid = require("./grid.js");
var _modals = require("./modals.js");
var _actions = require("./actions.js");
var _storage = require("./storage.js");
var _view = require("./view.js");
document.addEventListener('DOMContentLoaded', function () {
  var data = [{
    "picture": "https://loremflickr.com/640/480/animals",
    "hashtag": "reboot",
    "user": "Ruben_Bartoletti17",
    "photo": "https://loremflickr.com/640/480/technics",
    "id": "1"
  }, {
    "picture": "https://loremflickr.com/640/480/abstract",
    "hashtag": "microchip",
    "user": "Eliza_Grimes",
    "photo": "https://loremflickr.com/640/480/nature",
    "id": "2"
  }, {
    "picture": "https://loremflickr.com/640/480/city",
    "hashtag": "cartilage",
    "user": "Darby.Reichel20",
    "photo": "https://loremflickr.com/640/480/abstract",
    "id": "3"
  }, {
    "picture": "https://loremflickr.com/640/480/business",
    "hashtag": "Grocery",
    "user": "Brady23",
    "photo": "https://loremflickr.com/640/480/city",
    "id": "4"
  }, {
    "picture": "https://loremflickr.com/640/480/fashion",
    "hashtag": "Internal",
    "user": "Ethelyn_Blanda43",
    "photo": "https://loremflickr.com/640/480/city",
    "id": "5"
  }, {
    "picture": "https://loremflickr.com/640/480/nightlife",
    "hashtag": "Massachusetts",
    "user": "Jensen.Bednar",
    "photo": "https://loremflickr.com/640/480/cats",
    "id": "6"
  }, {
    "picture": "https://loremflickr.com/640/480/nightlife",
    "hashtag": "array",
    "user": "Logan63",
    "photo": "https://loremflickr.com/640/480/animals",
    "id": "7"
  }, {
    "picture": "https://loremflickr.com/640/480/people",
    "hashtag": "revolutionary",
    "user": "Gillian10",
    "photo": "https://loremflickr.com/640/480/city",
    "id": "8"
  }, {
    "picture": "https://loremflickr.com/640/480/fashion",
    "hashtag": "Croatia",
    "user": "Carli.Abbott87",
    "photo": "https://loremflickr.com/640/480/nightlife",
    "id": "9"
  }, {
    "picture": "https://loremflickr.com/640/480/city",
    "hashtag": "Pound",
    "user": "Jermain.Funk",
    "photo": "https://loremflickr.com/640/480/people",
    "id": "10"
  }, {
    "picture": "https://loremflickr.com/640/480/abstract",
    "hashtag": "invoice",
    "user": "Sydni94",
    "photo": "https://loremflickr.com/640/480/nightlife",
    "id": "11"
  }, {
    "picture": "https://loremflickr.com/640/480/sports",
    "hashtag": "Gibraltar",
    "user": "Rahul_Mraz",
    "photo": "https://loremflickr.com/640/480/animals",
    "id": "12"
  }, {
    "picture": "https://loremflickr.com/640/480/animals",
    "hashtag": "Nampa",
    "user": "Annabel82",
    "photo": "https://loremflickr.com/640/480/business",
    "id": "13"
  }, {
    "picture": "https://loremflickr.com/640/480/nightlife",
    "hashtag": "encryption",
    "user": "Gaetano_Lemke37",
    "photo": "https://loremflickr.com/640/480/business",
    "id": "14"
  }, {
    "picture": "https://loremflickr.com/640/480/city",
    "hashtag": "Account",
    "user": "Lulu_Wolf66",
    "photo": "https://loremflickr.com/640/480/cats",
    "id": "15"
  }, {
    "picture": "https://loremflickr.com/640/480/city",
    "hashtag": "haptic",
    "user": "Gregorio.Vandervort",
    "photo": "https://loremflickr.com/640/480/sports",
    "id": "16"
  }, {
    "picture": "https://loremflickr.com/640/480/city",
    "hashtag": "magni",
    "user": "Willow.Okuneva55",
    "photo": "https://loremflickr.com/640/480/nightlife",
    "id": "17"
  }, {
    "picture": "https://loremflickr.com/640/480/city",
    "hashtag": "Visionary",
    "user": "Kelly95",
    "photo": "https://loremflickr.com/640/480/cats",
    "id": "18"
  }, {
    "picture": "https://loremflickr.com/640/480/transport",
    "hashtag": "facilis",
    "user": "Kailee.Cassin",
    "photo": "https://loremflickr.com/640/480/business",
    "id": "19"
  }, {
    "picture": "https://loremflickr.com/640/480/nightlife",
    "hashtag": "Dinar",
    "user": "Alice74",
    "photo": "https://loremflickr.com/640/480/city",
    "id": "20"
  }, {
    "picture": "https://loremflickr.com/640/480/business",
    "hashtag": "connecting",
    "user": "Katlynn.Kuvalis",
    "photo": "https://loremflickr.com/640/480/sports",
    "id": "21"
  }, {
    "picture": "https://loremflickr.com/640/480/animals",
    "hashtag": "Hip",
    "user": "Dayne.Smith60",
    "photo": "https://loremflickr.com/640/480/sports",
    "id": "22"
  }, {
    "picture": "https://loremflickr.com/640/480/cats",
    "hashtag": "Persistent",
    "user": "Jermey52",
    "photo": "https://loremflickr.com/640/480/abstract",
    "id": "23"
  }, {
    "picture": "https://loremflickr.com/640/480/transport",
    "hashtag": "Grocery",
    "user": "Fausto8",
    "photo": "https://loremflickr.com/640/480/business",
    "id": "24"
  }, {
    "picture": "https://loremflickr.com/640/480/cats",
    "hashtag": "Small",
    "user": "Elsie43",
    "photo": "https://loremflickr.com/640/480/food",
    "id": "25"
  }, {
    "picture": "https://loremflickr.com/640/480/cats",
    "hashtag": "Nickel",
    "user": "Dana56",
    "photo": "https://loremflickr.com/640/480/animals",
    "id": "26"
  }, {
    "picture": "https://loremflickr.com/640/480/technics",
    "hashtag": "Ohio",
    "user": "Margot_Sanford30",
    "photo": "https://loremflickr.com/640/480/fashion",
    "id": "27"
  }, {
    "picture": "https://loremflickr.com/640/480/nightlife",
    "hashtag": "Chief",
    "user": "Kadin.Pollich",
    "photo": "https://loremflickr.com/640/480/people",
    "id": "28"
  }];
  var boards = (0, _storage.loadBoardsFromLocalStorage)();
  var pinterestGrid = document.getElementById('pinterest-grid');
  var hashtagFilter = document.getElementById('hashtag-filter');
  var viewSelect = document.getElementById('view-select');
  var saveBoardBtn = document.getElementById('save-board-btn');
  var closeBoardModal = document.getElementById('close-board-modal');
  var closeReportModal = document.getElementById('close-report-modal');
  var submitReportBtn = document.getElementById('submit-report-btn');

  // Event Listeners
  hashtagFilter.addEventListener('change', function () {
    if (viewSelect.value === 'my-feed') {
      (0, _grid.filterByHashtag)(data, hashtagFilter.value, boards);
    }
  });
  viewSelect.addEventListener('change', function () {
    return (0, _view.updateView)(data, boards);
  });
  saveBoardBtn.addEventListener('click', function () {
    var boardId = document.querySelector('input[name="board-select"]:checked').value;
    var itemId = document.getElementById('board-modal').dataset.itemId;
    (0, _actions.addToBoard)(data, boards, boardId, itemId);
    (0, _modals.closeModals)();
  });
  closeBoardModal.addEventListener('click', _modals.closeModals);
  closeReportModal.addEventListener('click', _modals.closeModals);
  submitReportBtn.addEventListener('click', function () {
    var itemId = document.getElementById('report-modal').dataset.itemId;
    var reason = document.querySelector('input[name="report-reason"]:checked').value;
    (0, _actions.submitReport)(itemId, reason, boards);
    (0, _modals.closeModals)();
  });
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('show-board-modal')) {
      (0, _modals.showBoardModal)(event.target.dataset.id);
    }
    if (event.target.classList.contains('show-report-modal')) {
      (0, _modals.showReportModal)(event.target.dataset.id);
    }
  });

  // Инициализация
  (0, _grid.populateFilterOptions)(data);
  (0, _view.updateView)(data, boards);
});
},{"./grid.js":"grid.js","./modals.js":"modals.js","./actions.js":"actions.js","./storage.js":"storage.js","./view.js":"view.js"}],"../Users/USER/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "6177" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../Users/USER/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map