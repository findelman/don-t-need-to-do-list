let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let out = document.querySelector(".out");
let arr = [];

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
};

// Скролл в начало
const scrollTop = () => {
  let toItem = document.querySelectorAll('.item')
  if(toItem.length >= 1) {
    toItem[toItem.length - 1].scrollIntoView()
    console.log(toItem[toItem.length - 1])
  }
}

// Клик по айтему / Удаление айтемов / Переделать по индексу(удаление по elem.textContent может неправильно отрабатывать)
const itemClick = () => {
  let items = document.querySelectorAll(".item");  
  items.forEach((elem, index) => {
    let itemClose = elem.querySelector('.clear')
    let itemCompleted = elem.querySelector('.completed')
    itemClose.addEventListener("click", () => {
      
      arr.splice(arr.indexOf(elem.textContent.trim()), 1);
      elem.remove();
      console.log(arr);
    });
    itemCompleted.addEventListener('click', () => {
    //   console.log('comp')
    //   arr.splice(arr.indexOf(elem.textContent.trim()),1)
    //   console.log(arr)
    //   arr.unshift(elem.textContent.trim())
    //   console.log(arr)
    //   arrOut(arr)
    //   elem.classList.add('item--completed')
    alert('ща сделаю')
    })
  });
};

input.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    btn.click();
  }
});
