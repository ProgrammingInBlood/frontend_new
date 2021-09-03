import styles from "./Cart.module.scss";
import CartItems from "../../components/utils/CartItems";
import Navbar from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";

//actions
import { addToCart, removeFromCart } from "../../store/actions/cartActions";

function Cart({ session }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  const qtyHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  return (
    <div>
      <Navbar session={session} />
      <div className={styles.container}>
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              Your Cart Is Empty
            </div>
          ) : (
            <>
              <p>
                My Bag <span> {cartItems.length} item (s)</span>
              </p>
              {cartItems.map((item) => {
                console.log(item);
                return (
                  <>
                    <CartItems
                      item={item}
                      removeFromCartHandler={removeFromCartHandler}
                      qtyHandler={qtyHandler}
                    />
                  </>
                );
              })}
            </>
          )}
        </div>
        <div className={styles.checkout}>
          <div className={styles.invoice}>
            <div className={styles.price}>
              <p>Price Summary </p>
            </div>
            <div className={styles.price}>
              <p>Total MRP (Incl. of taxes) </p>
              <p>
                {cartItems.length === 0 ? (
                  <div> £0 </div>
                ) : (
                  <>£{getSubTotal().toFixed(2)}</>
                )}
              </p>
            </div>
            <div className={styles.price}>
              <p>Delivery Fee </p>
              <p>FREE</p>
            </div>
            <div className={styles.price}>
              <p>Bag Discount </p>
              <p>£ 1024</p>
            </div>
            <div className={styles.price}>
              <p>Subtotal </p>
              <p>£ {getSubTotal().toFixed(2)}</p>
            </div>
            <p className={styles.green} style={{ textAlign: "center" }}>
              You are saving £ 3090 on this order
            </p>

            <div className={styles.finalCheckout}>
              <div className={styles.text}>
                <p>Total</p>
                <p>£{getSubTotal().toFixed(2)}</p>
              </div>
              <div>
                <button>Proceed To Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.finalCheckouts}>
          <div className={styles.text}>
            <p>Total</p>
            <p>£{getSubTotal().toFixed(2)}</p>
          </div>
          <div>
            <button>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
