import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings ={

  databaseURL:"https://playground-321d5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "products")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")



addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value.trim();

  
  if (inputValue !== "") {
      
      push(shoppingListInDB, inputValue);

      inputFieldEl.value = "";
  } else {
     
      alert("Please enter something before clicking the button.");
  }
});

inputFieldEl.addEventListener("keypress", function(event) {
  
  let inputValue = inputFieldEl.value.trim();

  
  if (event.key === "Enter") {
   
      event.preventDefault();

      
      if (inputValue !== "") {
         
          push(shoppingListInDB, inputValue);

          
          inputFieldEl.value = "";
      } else {
         
          alert("Please enter something before pressing Enter.");
      }
  }
});

  onValue(shoppingListInDB, function(snapshot){
    
     if(snapshot.exists()){
       let itemsArray = Object.entries(snapshot.val())
       
       clearShoppingListEl()
       for (let i = 0; i < itemsArray.length; i++){
         
         let currentItem = itemsArray[i]
         let currentItemID = currentItem[0]
   
   
         appendItemToShoppingListEl(currentItem)
       }
       
     }else {

      shoppingListEl.innerHTML = "No Items yet!"

     }
  })

  function clearShoppingListEl() {
    
    shoppingListEl.innerHTML = ""
}
  function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(item) {
    
  let itemID = item[0]
  let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {
      
      let exactLocationOfItemInDB = ref(database, `products/${itemID}`)
      
      remove(exactLocationOfItemInDB)
      
    })
    shoppingListEl.append(newEl)
}

