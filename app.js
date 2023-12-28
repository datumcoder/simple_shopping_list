import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings ={

  databaseURL:"https://playground-321d5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopItemsDB = ref(database, "products")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const  shoppingListEl = document.getElementById('shopping-list')



addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shopItemsDB, inputValue)

    shoppingListEl.innerHTML += `<li>${inputValue}</li>`

    inputFieldEl.value = ""
  })


  function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

inputFieldEl.addEventListener('keydown', function(event) {
  // Check if the Enter key is pressed
  if (event.key === 'Enter') {
    inputFieldEl();
  }
});