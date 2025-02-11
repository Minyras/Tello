import { instance } from ".";

const API_KEY = import.meta.env.VITE_CHEC_PUBLIC_KEY;

const createCart = async ({ submit = false }) => {
  try {
    const { data } = await instance.get(`carts`, {
      headers: { "X-Authorization": API_KEY },
    });
    if (submit) {
      localStorage.setItem("submitCartId", data.id);
    } else {
      localStorage.setItem("cartId", data.id);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const addToCart = async ({ cartId, productId, quantity, options }) => {
  try {
    const datab = {
      id: productId,
      quantity: quantity,
      options: options,
    };
    const { data } = await instance.post(`carts/${cartId}`, datab, {
      headers: {
        "X-Authorization": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItemInCart = async ({ cartId, itemId, quantity }) => {
  try {
    const datab = {
      quantity: quantity,
    };
    const { data } = await instance.put(
      `carts/${cartId}/items/${itemId}`,
      datab,
      {
        headers: {
          "X-Authorization": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const removeItemFromCart = async ({ cartId, itemId }) => {
  try {
    const { data } = await instance.delete(`carts/${cartId}/items/${itemId}`, {
      headers: {
        "X-Authorization": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const removeItemsFromCart = async ({ cartId }) => {
  try {
    const { data } = await instance.delete(`carts/${cartId}/items`, {
      headers: {
        "X-Authorization": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  createCart,
  addToCart,
  updateItemInCart,
  removeItemFromCart,
  removeItemsFromCart,
};
