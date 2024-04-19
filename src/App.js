import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";
import ContextRct from "./Context/index";
import Home from "./Components/Home";
// import NotFound from "./components/NotFound";
import Cart from "./Components/Cart";
import RestDetails from "./Components/RestDetails";

const sortByOptions = [
  {
    id: 0,
    displayText: "Highest",
    value: "Highest",
  },
  {
    id: 2,
    displayText: "Lowest",
    value: "Lowest",
  },
];

function App() {
  const [cartItems, setCartitems] = useState([]);

  const addCartItems = (lov) => {
    const jnu = {
      id: lov.id,
      cost: lov.cost,
      foodType: lov.food_type,
      imageUrl: lov.image_url,
      name: lov.name,
      rating: lov.rating,
      quantity: 1,
      totalCost: lov.cost,
    };

    const a = JSON.parse(localStorage.getItem("cartData"));
    let lst = [jnu];
    if (a !== null) {
      lst = [...a, jnu];
    }

    localStorage.setItem("cartData", JSON.stringify(lst));

    // const locaList = JSON.parse(localStorage.getItem('arry'))
    // console.log(locaList)
    // localStorage.removeItem('arry')
    setCartitems([...cartItems, jnu]);

    // this.setState(prevS => ({cartItems: [...prevS.cartItems, jnu]}))
  };

  const QtyIncr = (jnu) => {
    setCartitems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.id === jnu) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );

    const darling = JSON.parse(localStorage.getItem("cartData"));
    const darlingList = darling.map((item) => {
      if (item.id === jnu) {
        return {
          id: item.id,

          imageUrl: item.imageUrl,
          name: item.name,

          quantity: item.quantity + 1,
          cost: item.cost,
        };
      }
      return item;
    });
    localStorage.setItem("cartData", JSON.stringify(darlingList));
  };

  const QtyDcr = (jnu) => {
    setCartitems((prevCartItems) =>
      prevCartItems
        .map((item) => {
          if (item.id === jnu) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => item !== null)
    );

    const darling = JSON.parse(localStorage.getItem("cartData"));
    const darlingList = darling
      .map((item) => {
        if (item.id === jnu) {
          if (item.quantity === 1) {
            //   console.log('map0')
            return null;
          }
          // console.log('map1')
          return {
            id: item.id,

            imageUrl: item.imageUrl,
            name: item.name,

            quantity: item.quantity - 1,
            cost: item.cost,
          };
        }
        return item;
      })
      .filter((item) => item !== null);
    localStorage.setItem("cartData", JSON.stringify(darlingList));
  };

  const emptyCart = () => {
    this.setState({ cartItems: [] });
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/restaurant/:id",
      element: <RestDetails />,
    },
  ]);
  return (
    <ContextRct.Provider
      value={{
        sortByOptions,
        cartItems,
        addCartItems: addCartItems,
        QtyIncr: QtyIncr,
        QtyDcr: QtyDcr,
        emptyCart: emptyCart,
      }}
    >
      <RouterProvider router={router} />
    </ContextRct.Provider>
  );
}

export default App;
