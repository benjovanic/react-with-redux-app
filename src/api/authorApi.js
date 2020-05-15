import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export const getAuthors = () => {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
};
