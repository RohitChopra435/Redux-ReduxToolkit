import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data",
      })
    );
    const sentRequest = async () => {
      const response = await fetch(
        "https://react-http-a8fc0-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    try {
      await sentRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent Cart Data Successfully!",
        })
      );
    } catch (error) {
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!",
      });
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-a8fc0-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Fetching cart data failed!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!",
      });
    }
  };
};
