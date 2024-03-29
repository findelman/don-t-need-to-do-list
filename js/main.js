const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const out = document.querySelector(".out-tab");
const outCompleted = document.querySelector(".completed-tab");
const arr = [];
const arrCompleted = [];
let itemCompletedCount = 0;
const tabs = document.querySelectorAll(".btn-filter");
const tabsWrapper = document.querySelectorAll(".tab-wrapper");
const dateInner = document.querySelector(".date");
const countTask = document.querySelector(".to-wrapper-count");
const toggleItem = document.querySelector(".to-wrapper-filter__toggle");

const date = new Date().toLocaleDateString();
dateInner.innerHTML = date;

btn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    arr.push(input.value);
    localStorage.setItem(input.value.trim(), input.value.trim());
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
    outInner.innerHTML += `<div class="item" ><div class="item-text">${key}</div><div class="item-btns flex"><div class="update flex-c item-btn--default"></div><div class="completed flex-c item-btn--default"></div> <div class="clear flex-c item-btn--default"></div></div></div>`;
  }

  // добавляем активный класс выполненным айтемам
  const items = document.querySelectorAll(".item");
  for (let i = 0; i < itemCompletedCount; i++) {
    items[i].classList.add("item--completed");
  }
};

// Скролл в начало
const scrollTop = () => {
  const toItem = document.querySelectorAll(".item");
  if (toItem.length >= 1) {
    toItem[toItem.length - 1].scrollIntoView();
  }
};

// Клик по айтему / Удаление айтемов / Переделать по индексу(удаление по elem.textContent может неправильно отрабатывать)
const itemClick = () => {
  const items = document.querySelectorAll(".item");
  items.forEach((elem, index) => {
    const itemClose = elem.querySelector(".clear");
    const itemCompleted = elem.querySelector(".completed");
    const itemUpdate = elem.querySelector(".update");

    itemClose.addEventListener("click", () => {
      if (elem.classList.contains("item--completed")) {
        itemCompletedCount--;
      }
      arr.splice(arr.indexOf(elem.textContent.trim()), 1);
      arrCompleted.splice(arrCompleted.indexOf(elem.textContent.trim()), 1);
      localStorage.removeItem(elem.textContent.trim());
      elem.remove();
      arrOut(arrCompleted, outCompleted);
      console.log(arr, arrCompleted);
      countTask.innerHTML = arr.length + " задач";
    });

    itemCompleted.addEventListener("click", () => {
      if (elem.classList.contains("item--completed")) {
        elem.classList.remove("item--completed");
        itemCompletedClick(elem, "completed");
        return;
      }
      itemCompletedClick(elem);
    });

    // Желательно переделать
    itemUpdate.addEventListener("click", () => {
      const elemText = elem.textContent;
      elem.outerHTML = `<div class="item item--update"><input class="item__input" value="${elem.textContent}"> <div class="item-btns flex"><div class="accept  flex-c item-btn--default"></div></div>`;
      const itemUpdate = document.querySelector(".item--update");
      const itemAccept = itemUpdate.querySelector(".accept");
      const itemInput = itemUpdate.querySelector(".item__input");
      itemInput.focus();
      localStorage.removeItem(elem.textContent.trim());
      itemAccept.addEventListener("click", () => {
        itemUpdate.outerHTML = `<div class="item">${itemInput.value}<div class="item-btns flex"><div class="update flex-c"></div><div class="completed flex-c"></div> <div class="clear flex-c"></div></div></div>`;
        arr.splice(arr.indexOf(elemText.trim()), 1, itemInput.value);
        localStorage.setItem(itemInput.value.trim(), itemInput.value.trim());
        arrOut(arr, out);
        itemClick();
      });
    });
  });
  countTask.innerHTML = `${arr.length} задач`;
};

input.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    btn.click();
  }
});

// Логика клика по галочке
const itemCompletedClick = (elem, completedCheck = "false") => {
  if (completedCheck === "completed") {
    arrCompleted.splice(arrCompleted.indexOf(elem.textContent.trim()), 1);
    arr.splice(arr.indexOf(elem.textContent.trim()), 1);
    arr.push(elem.textContent.trim());
    itemCompletedCount--;
  } else {
    arrCompleted.push(elem.textContent.trim());
    arr.splice(arr.indexOf(elem.textContent.trim()), 1);
    arr.unshift(elem.textContent.trim());
    itemCompletedCount++;
  }
  arrOut(arr, out);
  arrOut(arrCompleted, outCompleted);
  itemClick();
};

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
    let items = document.querySelectorAll(".item");

    tabsToggleAnimation(tab);
    tabs.forEach((e) => {
      e.classList.remove("btn-filter--active");
    });
    // Нужен рефакторинг
    tabsWrapper.forEach((wrapper) => {
      wrapper.classList.remove("tab--active");
      if (tab.id === wrapper.dataset.tab) {
        wrapper.classList.add("tab--active");
        tab.classList.add("btn-filter--active");
        countTask.innerHTML = wrapper.children.length + " задач";
      }
      // if (tab.innerHTML === "Активные") {
      //   let items = document.getElementsByClassName(".item");
      //   // items.forEach((item) => {
      //   //   if (item.classList.contains("item--completed")) {
      //   //     item.style.display = "none";
      //   //   }
      //   // });
      //   console.log(items);
      //   wrapper.children;
      //   // countTask.innerHTML = wrapper.children.length + " задач";
      //   return;
      // }
      items.forEach((item) => {
        if (item.classList.contains("item--completed")) {
          item.style.display = "flex";
        }
      });
    });
  });
});

if (localStorage.length >= 1) {
  for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    arr.push(key);
  }
  arrOut(arr, out);
  itemClick();
  scrollTop();
}
