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

      <div className="container text-center mt-8 mb-6 cart-heading">
        <h1>Your basket and service options</h1>
      </div>
      <div
        className="container-fluid"
        style={{ background: "rgb(243, 243, 248)" }}
      >
        <div className="container ">
          <div className="row ">
            <div className="col-md-7 mt-6"></div>
            <div className="col-md-5 mt-6">
              {cartItems.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="cart-product"
                >
                  {" "}
                  Your Cart Is Empty
                </div>
              ) : (
                <>
                  <p
                    style={{
                      color: "#0e3f70",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    My Bag{" "}
                    <span style={{ color: "#c84577" }}>
                      {" "}
                      {cartItems.length}
                    </span>{" "}
                    item (s)
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

              <div className="mt-8 cart-scndbox">
                <div>
                  <div className="cart-priceh">
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
                  <p className="cart-savebtn">
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
