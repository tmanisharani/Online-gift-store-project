
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = []
  
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //data will be available even browser window is close.
  storage: Storage = localStorage;

  //Data will be cleared once the browser window is closed
  //storage:Storage = sessionStorage;

  constructor() { 
    let data = JSON.parse(this.storage.getItem('cartItems'));
    if (data != null) {
      this.cartItems = data;

    }
    //compute totals based on the data that is read from storage
    this.computeCartTotals();
  }

  //adding cartItems to the Storage
  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      
      );
      //check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      //increment the quantity
      alert("Product Udated to cart");
      existingCartItem.quantity++;
    } else {
      //just ass the item to the cartItems array
      alert("new product added to cart");
      this.cartItems.push(theCartItem);
    }
    //compute cart total and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    //publish new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //persist cart data
    this.persistCartItems();
  }
  remove(theCartItem:CartItem){
    //get index of item from cartItem s array
    const itemIndex = this.cartItems.findIndex(
      (tempCartItam) => tempCartItam.id === theCartItem.id

    );
    //if found remove the item
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);

      // update cart total and cart price
      this.computeCartTotals();
    }
  }

  decrementQuantity(theCartItem:CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity ===0){
      //remove the item from cart

      this.remove(theCartItem);

    }else{
      this.computeCartTotals();
    }
  }
  incrementQuantity(theCartItem:CartItem){
    theCartItem.quantity++;
    this.computeCartTotals();
  }

}