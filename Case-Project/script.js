//Array of items that are objects and have diffrent properties such as name, price, image, and count. The count is changed to represent and keep track of the total number of each item. 
const items = [
  {
    name: 'Banana',
    price: 0.58,
    image: 'img/banana.png',
    count: 0,
  },
  {
    name: 'Margarita Pizza',
    price: 4.99,
    image: 'img/pizza.png',
    count: 0,
  },
  {
    name: 'Organic Carrots',
    price: 1.49,
    image: 'img/carrots.png',
    count: 0,
  },
  {
    name: 'Strawberries',
    price: 3.99,
    image: 'img/strawberries.png',
    count: 0,
  },
  {
    name: 'Carton of Eggs',
    price: 1.24,
    image: 'img/eggs.png',
    count: 0,
  },
  {
    name: 'Apple',
    price: 0.99,
    image: 'img/apple.png',
    count: 0,
  },
  {
    name: 'Toilet Paper',
    price: 7.59,
    image: 'img/toilet-paper.png',
    count: 0,
  },
  {
    name: 'Toothbrush',
    price: 2.99,
    image: 'img/toothbrush.png',
    count: 0
  },
  {
    name: 'Toothpaste',
    price: 1.67,
    image: 'img/toothpaste.png',
    count: 0
  },
  {
    name: 'Tissues',
    price: 1.99,
    image: 'img/tissues.png',
    count: 0
  },
  {
    name: 'Soap',
    price: 2.49,
    image: 'img/soap.png',
    count: 0
  },
  {
    name: 'Small Broom',
    price: 8.99,
    image: 'img/small-broom.png',
    count: 0
  },
  {
    name: 'Lettuce',
    price: 1.29,
    image: 'img/lettuce.png',
    count: 0
  },
  {
    name: 'Bag of Potatoes',
    price: 3.99,
    image: 'img/potatoes.png',
    count: 0
  },
  {
    name: 'Açai Bowl',
    price: 4.59,
    image: 'img/açai.png',
    count: 0
  },
  {
    name: 'Oatmeal',
    price: 2.99,
    image: 'img/oatmeal.png',
    count: 0
  },
  {
    name: 'Chicken Nuggets',
    price: 6.49,
    image: 'img/nuggets.png',
    count: 0
  },
  {
    name: 'Blueberries',
    price: 1.99,
    image: 'img/blueberries.png',
    count: 0
  },
];

// sets the counter that is displayed by the checkout on the navbar
let checkoutCounter = 0;

/* function is called by the addItem() or subItem() functions. This function takes two parameters the index of the item and wether or not to subtract or add, which I represent as a boolean.
*/
function addToItemCount(index, addOrSub){
  //sets the div that contains the number of total items that is located by the checkout.
  let numberOfItems = document.getElementById('item-number');
  numberOfItems.style.display = "block";
  //if the value passed in for addOrSub is true it knows to add.
  if(addOrSub == true) {
    //adds one to the global checkoutCounter.
    checkoutCounter++;

    //adds one to the item number that was passed in.
    items[index].count++;
    
    //sets the value of the input to the count of the specifc item.
    document.getElementById('input-num-' + index).value = items[index].count;

    //stores the items array in session storage.
    sessionStorage.setItem("itemsInCart", JSON.stringify(items));
  }
  //if the value passed in for addOrSub is false it knows to subtract.
  else if(addOrSub == false){
    //subtracts one to the global checkoutCounter.
    checkoutCounter--;
    //subtracts one from the specifc item that was passed in as a parameter.
    items[index].count = items[index].count - 1;
    //sets the value of the input to the count for the item.
    document.getElementById('input-num-' + index).value = items[index].count;
    sessionStorage.setItem("itemsInCart", JSON.stringify(items));
    //makes it so that if there are no items it will get rid of the item countet in the navbar.
    if(checkoutCounter < 0) {
      numberOfItems.style.display = "none";
    }
  //This checks to see if neither true or false was passed in which means the function was called in order to recaculate the total number of items by what the user inputed in the input plus whatever the total item count was before.
  }
  else {

    //gets the value of the input from the user.
      items[index].count = document.getElementById('input-num-' + index).value;
      //stores the value from the user in session storage so        that it can be used on the checkout page.
      sessionStorage.setItem('items', JSON.stringify(items));
      //sets the checkoutCounter to the count from input
      checkoutCounter = items[index].count;

  }
  numberOfItems.innerHTML = checkoutCounter;
}

/* this function is triggered from the onclick funtion that is on all add buttons. The function takes in one parameter. The parameter is a number that is passed in that indicates what item to add to the cart.

*/
function addItem(index) {
  //calls the addToItemCount() function and passes the parameters of the index of the item and true to indicate that we want to add a number to the total count of items instead of subtracting.
  addToItemCount(index, true);

  //makes the orginal add button disappear. 
  document.getElementById('btn-' + index).style.display = "none";
  
  //display the add subtract input element.
  document.getElementById('add-subtract-item-' + index).style.display = "inline";
}

/* function takes in one parameter which indicates which item to subtract from. This function is on all subtract buttons on all the items. This function is very simular to the addItem() function. 

*/
function subItem(index) {
  //calls the addToItemCount() function and passes the index of the item to subtract from. The second parameter is false to indicate that we want to subtract to the function. 
  addToItemCount(index, false);
  if(document.getElementById('input-num-' + index).value < 0) {
    document.getElementById('input-num-' + index).value = 0;
  }
  if(document.getElementById('input-num-' + index).value < 1) {
    document.getElementById('btn-' + index).style.display = "block";

    document.getElementById('add-subtract-item-' + index).style.display = "none";

    let numberOfItems = document.getElementById('item-number');
    numberOfItems.style.display = "none";
  }

}

//This function essentailly checks if the cart is empty, then it displays all items and their total price if the cart is not empty. This function also adds a add and subtract button to each item so each item can either be subtracted or added to. 
let taxPriceText = document.createElement('h4');
let theTotalPrice = 0;
let theTax = 0;
function cartLoad() {
  //gets all the items from session storage and sets them to a variable that can be used in this function.

  var itemsInCart = JSON.parse(sessionStorage.getItem(
  'itemsInCart'));
  console.log(itemsInCart);

  //sets the cart div to an element so we can append children to it.
  let cart = document.getElementById('cart');
  //creates a h2 element.
  let emptyCart = document.createElement('h2');
  //sets the id of the h2 element to 'empty-cart'.
  emptyCart.id = "empty-cart";
  //sets the intial text to 'Cart is empty :,('.
  emptyCart.innerHTML = "Cart is empty :,(";
  //appends the h2 element to the cart as a child.
  cart.appendChild(emptyCart);

  //sets the div with the id 'order-summary' to a variable. So that children can be appended to it.
  let orderSummary = document.getElementById('order-summary');

  taxPriceText.id = 'tax-price';
  taxPriceText.innerHTML = "Tax:";
  
  let checkOutBtn = document.createElement('button');
  checkOutBtn.innerText = "Checkout";
  checkOutBtn.id = "checkout-btn";

  let totalPrice = document.createElement('h3');
  totalPrice.id = "total-price"
  totalPrice.innerHTML = "Order Total:";

  calculatePrice();

  for(i = 0; i < itemsInCart.length; i++) {
    if(itemsInCart[i].count > 0) {
      emptyCart.remove();
      let itemImg = document.createElement('img');
      itemImg.id = "item-" + i;
      itemImg.src = itemsInCart[i].image;
      itemImg.alt = itemsInCart[i].name;
      cart.appendChild(itemImg);

      let itemCountText = document.createElement('h2');
      itemCountText.id = "item-count-text-" + i;
      itemCountText.classList.add('cart-item-count-num');

      let subBtn = document.createElement('button');
      subBtn.classList = "subtract-btn";
      subBtn.classList.add("cart-sub-btn");
      subBtn.id = i;
      console.log(i);

      subBtn.setAttribute("onclick","subCart(this.id);");

      subBtn.innerHTML = "-";
      cart.appendChild(subBtn);
      
      itemCountText.innerHTML = itemsInCart[i].count;
      cart.appendChild(itemCountText);

      let addBtn = document.createElement('button');
      addBtn.classList = "add-btn";
      addBtn.classList.add("cart-add-btn");
      addBtn.id = i;
      addBtn.setAttribute("onclick","addCart(this.id);");

      addBtn.innerHTML = "+";
      cart.appendChild(addBtn);

      let itemTitle = document.createElement('h2');
      itemTitle.innerHTML = itemsInCart[i].name;
      cart.appendChild(itemTitle);
      
      let itemPriceText = document.createElement('h4');
      itemPriceText.id = "item-price-text-" + i;
      itemPriceText.innerHTML = itemsInCart[i].name + " $" + itemsInCart[i].price + " x " + itemsInCart[i].count;
      orderSummary.appendChild(itemPriceText);

      taxPriceText.innerHTML = "Tax: $" + parseFloat(theTax).toFixed(2);

      totalPrice.innerHTML = "Order total: $" + parseFloat(theTotalPrice*(1.07)).toFixed(2);
        
    }
  }

  orderSummary.appendChild(taxPriceText);

  orderSummary.appendChild(totalPrice);

  orderSummary.appendChild(checkOutBtn);
}

//This fucntion get the itemsInCart array in session storage and then updates the cart and order summary to reflect the new total after subtracting one to the item.
function subCart(index) {
  console.log(index);

  var itemsInCart = JSON.parse(sessionStorage.getItem(
  'itemsInCart'));


      let itemCount = itemsInCart[index].count;
      // console.log(itemCount)
      if(itemCount > 0) {
        itemsInCart[index].count--;
        sessionStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
        calculatePrice();
        itemCount = itemsInCart[index].count;
        let itemCountText = document.getElementById('item-count-text-' + index);
        itemCountText.innerHTML = itemCount;

        let itemPriceText = document.getElementById('item-price-text-' + index);
        itemPriceText.innerHTML = itemsInCart[index].name + " $" + itemsInCart[index].price + " x " + itemCount;

        taxPriceText.innerHTML = "Tax: $" + parseFloat(theTax).toFixed(2);

        let totalPrice = document.getElementById('total-price');

        totalPrice.innerHTML = "Order total: $" + parseFloat(theTotalPrice*(1.07)).toFixed(2);
      }
      if(itemCount < 1) {
        window.location.reload(true);
        // sessionStorage.setItem('items', JSON.stringify(items));
      }
}

//This fucntion get the itemsInCart array in session storage and then updates the cart and order summary to reflect the new total after adding one to the item.
function addCart(index) {
  console.log(index);

  var itemsInCart = JSON.parse(sessionStorage.getItem(
  'itemsInCart'));

      let itemCount = itemsInCart[index].count;
      // console.log(itemCount)
      if(itemCount > 0) {
        itemsInCart[index].count++;
        sessionStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
        calculatePrice();
        itemCount = itemsInCart[index].count;
        let itemCountText = document.getElementById('item-count-text-' + index);
        itemCountText.innerHTML = itemCount;

        let itemPriceText = document.getElementById('item-price-text-' + index);
        itemPriceText.innerHTML = itemsInCart[index].name + " $" + itemsInCart[index].price + " x " + itemCount;

      
        taxPriceText.innerHTML = "Tax: $" + parseFloat(theTax).toFixed(2);

        let totalPrice = document.getElementById('total-price');

        totalPrice.innerHTML = "Order total: $" + parseFloat(theTotalPrice*(1.07)).toFixed(2);
      }
}

//This function calulates the total price of each item. It does this by going through the entire array of items and checking the count and the price of each item and then addding it to the total price. 
function calculatePrice() {
  var itemsInCart = JSON.parse(sessionStorage.getItem(
  'itemsInCart'));
  
  theTotalPrice = 0;
  for(m = 0; m < itemsInCart.length; m++) { 
    theTotalPrice = theTotalPrice + (itemsInCart[m].price * itemsInCart[m].count);
    theTax = (theTotalPrice * 1.07) - theTotalPrice;
  }
  taxTaxPrice = "Tax: $" + parseFloat(theTax).toFixed();
}

/* updates the number of items based on the user inputing a number. 
*/
function updateValue(index) {
    //if the enter key is pressed then it will update the number for the specific item that is selected.
    if(event.key === 'Enter') {
      sessionStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
        //sets the appleCount to the value of the user input.
        itemCount = document.getElementById('input-num-' + index).value;
        //calls the addToItemCount() function and passes the parameters of the index and gives a null parameter to indicate that we neither want to subtract nor add but update the value to a custom number. 
        addToItemCount(index, null);
    }
}

/*
  First when writing this block of code I made sure to fix any potential syntax errors my code editor flagged. From there I checked to make sure there were no run time errors in my program by running my program and making sure there were no errors thrown in the console. I then check my program for logic errors, To make sure my code does what I intend it to do. I check for logic errors by using Chrome's debugger tool. I then checked every variable in my code to make sure it acted as I intended by using breakpoints in places where necessary to check my code. I then stepped through my code checking the variables as they reach each break point.
*/
/*
  Added if statements that check if the drop down has a blank input and another if statement that checks if both radio buttons have not been clicked. I also made use of indeOf to check if the email inputed by the user has a @ symbbol as well as .com included.
*/
function validateForm(event) {
  event.preventDefault();
  var formErrors = false;
  try {
    var firstName = document.getElementById('firstName').value;
    if(firstName === "") {
      throw "Please enter in your first name";
    }

    var lastName = document.getElementById('lastName').value;
    if(lastName === "") {
      throw "Please enter in your last name";
    }

    var email = document.getElementById('email').value;
    

    if(email.indexOf('@')===-1 || email.indexOf('.com')===-1) {
      throw "Please enter in a valid email address";
    }

    if(email === "") {
      throw "Please enter in your email address";
    }

    var dropDown = document.getElementById('offers').value;
    if(dropDown === "") {
      throw "Please select a option for how often you would like to recieve special offers";
    }

    var terms = document.getElementsByName('terms-of-service');
    let k = 0;
    for(i = 0; i < terms.length; i++) {
      if(!terms[i].checked) {
        k++;
        if(k == terms.length) {
          throw "Please select wether or not you agree to the terms of service";
        }
      }
    }
  }
  catch(errorMessage) {
    console.log(errorMessage);
    formErrors = true;
    document.getElementById('error').innerHTML = errorMessage;
    document.getElementById('error').style.display = 'block';
  }
  finally {
    if(formErrors) {
      console.log("Please fix form errors");
    }
    else {
      document.getElementById('error').style.display = 'none';
      alert("Congratulations you are officially signed up for our newsletter!");

      document.getElementById("newsletter-form").reset();
    }

  }
}

//Creates event listener for the submit button on the form. 
function createEventListeners() {
  var submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', validateForm, false);
}
//Once the home page loads the createEventListeners() function is called.
window.addEventListener('load', createEventListeners, false);

//Creates all the elements necessary for the web security page as well as sets the innerHTML to the correct data needed to be displayed.
function webSecurity() {
  var infoSection = document.getElementById('info');

  var theAppName = document.createElement('p');
  theAppName.innerHTML = "Your App Name is " + navigator.appName;
  theAppName.classList.add('first-row');
  infoSection.appendChild(theAppName);

  var theAppVersion = theAppName.cloneNode(true);
  theAppVersion.innerHTML = "Your App Version is " + navigator.appVersion;
  theAppVersion.classList.add('first-row');
  infoSection.appendChild(theAppVersion);

  var thePlatform = theAppName.cloneNode(true);
  thePlatform.innerHTML = "Your Platform is " + navigator.platform;
  thePlatform.classList.add('first-row');
  infoSection.appendChild(thePlatform);

  var theUserAgent = theAppName.cloneNode(true);
  theUserAgent.innerHTML = "Your User Agent is " + navigator.userAgent;
  theUserAgent.classList.add('first-row');
  infoSection.appendChild(theUserAgent);

  var online = theAppName.cloneNode(true);
  online.innerHTML = "Is the User online: " + navigator.onLine;
  online.classList.add('second-row');
  infoSection.appendChild(online);

  var width = theAppName.cloneNode(true);
  width.innerHTML = "Your screen width is " + screen.width;
  width.classList.add('second-row');
  infoSection.appendChild(width);

  var height = theAppName.cloneNode(true);
  height.innerHTML = "Your screen height is " + screen.height;
  height.classList.add('second-row');
  infoSection.appendChild(height);
}