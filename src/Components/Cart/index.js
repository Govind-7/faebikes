import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import Header from "../Header";
import Cookies from "js-cookie";
import Footer from "../Footer";
import ContextRct from "../../Context/index";
import "./index.css";

class Cart extends Component {
  state = {
    status: true,
  };

  placeOrderFunc = (emptyCart) => {
    this.setState({ status: false });
    // emptyCart();
    // const a = [];
    // localStorage.setItem("cartData", JSON.stringify(a));
    localStorage.removeItem("cartData");
  };

  render() {
    if (Cookies.get("jwt_token") === undefined) {
      return <Navigate to="/login" />;
    }
    return (
      <ContextRct.Consumer>
        {(value) => {
          const { QtyIncr, QtyDcr, emptyCart } = value;
          const lclList = JSON.parse(localStorage.getItem("cartData")) || [];

          const decrement = (id) => {
            QtyDcr(id);
          };
          let price = 0;
          lclList.map((item) => {
            price += item.cost * item.quantity;
            return price;
          });

          const increment = (id) => {
            QtyIncr(id);
          };

          const successFunction = () => {
            if (lclList.length === 0 || lclList === null) {
              return (
                <div className="cart-noorders">
                  <img
                    src="https://res.cloudinary.com/dvzlfmmcb/image/upload/v1692768409/cooking_1_wilknw.png"
                    alt="empty cart"
                  />
                  <h1>No Order Yet!</h1>
                  <p>Your cart is empty. Add something from the menu.</p>

                  <Link to="/">
                    <button
                      className="header-button"
                      onClick={this.goHomePage}
                      type="button"
                    >
                      Order now
                    </button>
                  </Link>
                </div>
              );
            }
            return (
              <div>
                <ul className="cart-heading-align">
                  <li>Item</li>
                  <li>Quantity</li>
                  <li>Price</li>
                </ul>
                <ul>
                  {lclList.map((item) => (
                    <li>
                      <div key={item.id} className="cart-heading-align">
                        <div className="cart-name-spl">
                          <img
                            alt={item.name}
                            className="cart-item-size"
                            src={item.imageUrl}
                          />
                          <h4 className="mobile_view-font-size">{item.name}</h4>
                        </div>
                        <div className="cart-name-spl">
                          <button
                            onClick={() => decrement(item.id)}
                            type="button"
                          >
                            -
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            data-testid="increment-quantity"
                            onClick={() => increment(item.id)}
                            type="button"
                          >
                            +
                          </button>
                        </div>

                        <p>₹{item.cost * item.quantity}.00</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr />
                <div className="cart-heading-align">
                  <h1>Order Total:</h1>

                  <p>₹{price}.00</p>
                </div>
                <div className="cart-spl-margin">
                  <button
                    className="header-button"
                    onClick={() => this.placeOrderFunc(emptyCart)}
                    type="button"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            );
          };

          const paymentFunction = () => (
            <div className="notfound-bg">
              <AiFillCheckCircle color="green" size="60" />

              <h1>Payment Successful</h1>
              <p>
                Thank you for ordering
                <br /> Your payment is successfully completed.
              </p>
              <Link to="/">
                <button className="header-button" type="button">
                  Go To Home
                </button>
              </Link>
            </div>
          );

          const AiFunction = () => {
            const { status } = this.state;
            switch (status) {
              case true:
                return successFunction();

              case false:
                return paymentFunction();

              default:
                return "";
            }
          };

          return (
            <div>
              <Header />
              {AiFunction()}

              <Footer />
            </div>
          );
        }}
      </ContextRct.Consumer>
    );
  }
}

export default Cart;
