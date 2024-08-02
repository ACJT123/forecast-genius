import axios from "axios";

export const getData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};