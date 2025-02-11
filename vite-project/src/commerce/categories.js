import { instance } from ".";

const API_KEY = import.meta.env.VITE_CHEC_PUBLIC_KEY;

const options = {
  headers: { "X-Authorization": API_KEY },
};
const fetchMenuCategories = async () => {
  try {
    const { data } = await instance.get(`categories`, options);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export { fetchMenuCategories };
