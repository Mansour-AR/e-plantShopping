import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  
 
   // Calculate total amount for all products in the cart
   const calculateTotalAmount = () => {
     if (!cart || cart.length === 0) {
       console.log("Cart is empty or undefined");
       return "0.00";
     }
       const total = cart.reduce((total, item) => {
       const cost = Number(item.cost.replace(/[^0-9.-]+/g, ""));  // Remove any currency symbols and convert to number
       const quantity = parseInt(item.quantity) || 0;
       return total + (quantity * cost);
     }, 0);
 
     return total.toFixed(2);
   };

   const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  const handleIncrement = (item) => {
    const currentQuantity = parseInt(item.quantity) || 0;
    dispatch(updateQuantity({
      ...item,                             // Spread existing item properties
      quantity: currentQuantity + 1        // Increment quantity
    }));
  };

  const handleDecrement = (item) => {
    const currentQuantity = parseInt(item.quantity) || 0;
    if (currentQuantity > 1) {
      // If quantity is greater than 1, decrease it
      dispatch(updateQuantity({
        ...item,
        quantity: currentQuantity - 1
      }));
    } else {
      // If quantity would become 0, remove the item
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
          // Convert cost and quantity to numbers and check if they're valid
          const cost = Number(item.cost.replace(/[^0-9.-]+/g, ""));  // Remove any currency symbols
          const quantity = parseInt(item.quantity) || 0;
          return cost * quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


