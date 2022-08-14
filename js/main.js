let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let out = document.querySelector(".out-tab");
let outCompleted = document.querySelector(".completed-tab");
let arr = [];
let arrCompleted = [];
let itemCompletedCount = 0;
let tabs = document.querySelectorAll(".btn-filter");
let tabsWrapper = document.querySelectorAll(".tab-wrapper");
let dateInner = document.querySelector(".date");
let countTask = document.querySelector(".to-wrapper-count");
let toggleItem = document.querySelector(".to-wrapper-filter__toggle");

let date = new Date().toLocaleDateString();
dateInner.innerHTML = date;

btn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    arr.push(input.value);
  }
  inputReset();
  arrOut(arr, out);
  itemClick();
  scrollTop();
  console.log(arr);
});

// Обнволение и рефокус инпута
const inputReset = () => {
  input.value = ``;
  input.focus();
};

// Вывод значении массива
const arrOut = (arr, outInner) => {
  outInner.innerHTML = ``;
  for (let key of arr) {
    outInner.innerHTML += `<div class="item" >${key}<div class="item-btns flex"><div class="update flex-c item-btn--default"></div><div class="completed flex-c item-btn--default"></div> <div class="clear flex-c item-btn--default"></div></div></div>`;
  }

  // добавляем активный класс выполненным айтемам
  let items = document.querySelectorAll(".item");
  for (let i = 0; i < itemCompletedCount; i++) {
    items[i].classList.add("item--completed");
  }
};

// Скролл в начало
const scrollTop = () => {
  let toItem = document.querySelectorAll(".item");
  if (toItem.length >= 1) {
    toItem[toItem.length - 1].scrollIntoView();
  }
};

// Клик по айтему / Удаление айтемов / Переделать по индексу(удаление по elem.textContent может неправильно отрабатывать)
const itemClick = () => {
  let items = document.querySelectorAll(".item");
  items.forEach((elem, index) => {
    let itemClose = elem.querySelector(".clear");
    let itemCompleted = elem.querySelector(".completed");
    let itemUpdate = elem.querySelector(".update");

    itemClose.addEventListener("click", () => {
      if (elem.classList.contains("item--completed")) {
        itemCompletedCount--;
      }
      arr.splice(arr.indexOf(elem.textContent.trim()), 1);
      arrCompleted.splice(arrCompleted.indexOf(elem.textContent.trim()), 1);
      elem.remove();
      arrOut(arrCompleted, outCompleted);
      console.log(arr,arrCompleted)
      countTask.innerHTML = arr.length + " задач";
    });

    itemCompleted.addEventListener("click", () => {
      arrCompleted.push(elem.textContent.trim());
      console.log(arrCompleted, arr);
      arr.splice(arr.indexOf(elem.textContent.trim()), 1);
      arr.unshift(elem.textContent.trim());
      itemCompletedCount++;
      arrOut(arr, out);
      arrOut(arrCompleted, outCompleted);
      itemClick();
    });

    // Желательно переделать
    itemUpdate.addEventListener("click", () => {
      console.dir(elem.outerHTML);
      let elemText = elem.textContent;
      elem.outerHTML = `<div class="item item--update"><input class="item__input" value="${elem.textContent}"> <div class="item-btns flex"><div class="accept  flex-c item-btn--default"></div></div>`;
      let itemUpdate = document.querySelector(".item--update");
      let itemAccept = itemUpdate.querySelector(".accept");
      let itemInput = itemUpdate.querySelector(".item__input");
      itemInput.focus();
      itemAccept.addEventListener("click", () => {
        console.log(elem);
        itemUpdate.outerHTML = `<div class="item">${itemInput.value}<div class="item-btns flex"><div class="update flex-c"></div><div class="completed flex-c"></div> <div class="clear flex-c"></div></div></div>`;
        console.log(arr);
        arr.splice(arr.indexOf(elemText.trim()), 1, itemInput.value);
        console.log(arr);
        arrOut(arr, out);
        itemClick();
      });
      console.log(itemAccept);
    });
  });
  countTask.innerHTML = arr.length + " задач";
};

input.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    btn.click();
  }
});

// Анимация линии под табами
const tabsToggleAnimation = (tab) => {
  let wrapperInfo = document
    .querySelector(".to-wrapper")
    .getBoundingClientRect();
  let tabInfo = tab.getBoundingClientRect();
  toggleItem.style.transform = `translateX(${
    tabInfo.left - wrapperInfo.left - 30
  }px)`;
  toggleItem.style.width = `${tabInfo.width}px`;
};

// Логика табов
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabsToggleAnimation(tab);
    tabs.forEach((e) => {
      e.classList.remove("btn-filter--active");
    });
    tabsWrapper.forEach((wrapper) => {
      wrapper.classList.remove("tab--active");
      if (tab.id === wrapper.dataset.tab) {
        wrapper.classList.add("tab--active");
        tab.classList.add("btn-filter--active");
      }
    });
  });
});
