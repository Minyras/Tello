import { instance } from ".";

const API_KEY = import.meta.env.VITE_CHEC_PUBLIC_KEY;
const options = {
  headers: { "X-Authorization": API_KEY },
};

const fetchPageProducts = async ({ sortBy, sortOrder, category, query }) => {
  try {
    const { data } = await instance.get(
      `products?&sortBy=${sortBy}&sortDirection=${sortOrder}${
        category && `&category_slug=${category}`
      }${query != undefined ? `&query=${query}` : ""}&include=variant_groups`,
      options
    );
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchSelectedProducts = async ({ order, category }) => {
  try {
    const { data } = await instance.get(
      `products?&sortBy=${order}${
        category && `&category_slug=${category}`
      }&limit=5`,
      options
    );
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchSearchedProducts = async ({ query }) => {
  try {
    const { data } = await instance.get(
      `products?&query=${query}&limit=3`,
      options
    );
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchProduct = async ({ id }) => {
  try {
    const { data } = await instance.get(`products/${id}`, options);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchProductVariants = async ({ id }) => {
  try {
    const { data } = await instance.get(`products/${id}/variants`, options);
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  fetchPageProducts,
  fetchSelectedProducts,
  fetchSearchedProducts,
  fetchProduct,
  fetchProductVariants,
};
