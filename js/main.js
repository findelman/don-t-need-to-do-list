let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let out = document.querySelector(".out");
let arr = [];
let arrCompleted = []
let itemCompletedCount = 0

btn.addEventListener("click", () => {
  if (input.value !== "") {
    arr.push(input.value);
  }
  inputReset();
  arrOut(arr);
  itemClick();
  scrollTop()
  console.log(arr);
});

// Обнволение и рефокус инпута
const inputReset = () => {
  input.value = ``;
  input.focus();
};

// Вывод цифр
const arrOut = (arr) => {
  out.innerHTML = ``;
  for (let key of arr) {
    out.innerHTML += `<div class="item" >${key}<div class="item-btns flex"><div class="completed flex-c"></div> <div class="clear flex-c"></div></div></div>`;
  }

  // добавляем активный класс выполненным айтемам
  let items = document.querySelectorAll(".item")
  for(let i = 0; i < itemCompletedCount; i++){ 
    items[i].classList.add('item--completed')
  }
};

// Скролл в начало
const scrollTop = () => {
  let toItem = document.querySelectorAll('.item')
  if(toItem.length >= 1) {
    toItem[toItem.length - 1].scrollIntoView()
  }
}

// Клик по айтему / Удаление айтемов / Переделать по индексу(удаление по elem.textContent может неправильно отрабатывать)
const itemClick = () => {
  let items = document.querySelectorAll(".item");  
  items.forEach((elem, index) => {
    let itemClose = elem.querySelector('.clear')
    let itemCompleted = elem.querySelector('.completed')
    itemClose.addEventListener("click", () => {
      if(elem.classList.contains('item--completed')) {
        itemCompletedCount--
      }
      arr.splice(arr.indexOf(elem.textContent.trim()), 1);
      elem.remove();
    });
    itemCompleted.addEventListener('click', () => {
      arr.splice(arr.indexOf(elem.textContent.trim()),1)
      arr.unshift(elem.textContent.trim())
      itemCompletedCount++
      arrOut(arr)
      itemClick()
    // alert('ща сделаю')
    })
  });
};

input.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    btn.click();
  }
});
