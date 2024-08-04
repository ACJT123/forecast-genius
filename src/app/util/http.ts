import axios from "axios";

export const API_KEY = "&apikey=DRkIEgVxYkqsx0Ku4sgLZc3cLCRfplqF";

export const getData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
