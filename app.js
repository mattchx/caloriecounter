// different controllers
// Storage Controller  --> DO LATER

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 0, name: "Cookie", calories: 500 },
      { id: 0, name: "Tangyuan", calories: 100 },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new Item
      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
  };
  // Public methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += ` <li class="collection-item" id="item-${item.id}">
        <strong>${item.name} </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      //Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// App Controller (MAIN)
const App = (function (ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input form UI Controller
    const input = UICtrl.getItemInput();
    // console.log(input);

    // Check for name and calories input
    if (input.name !== "" && input.calories !== "") {
      
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    e.preventDefault();
  };

  // Public methods
  return {
    init: function () {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl); // Invocation

// Initialize App
App.init();
