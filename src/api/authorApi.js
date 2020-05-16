import { handleResponse, handleError } from './apiUtils';

const baseUrl = `${process.env.API_URL}/authors/`;

export const getAuthors = () => fetch(baseUrl)
  .then(handleResponse)
  .catch(handleError);

export const saveAuthor = (author) => fetch(baseUrl + (author.id || ''), {
  method: author.id ? 'PUT' : 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(author),
})
  .then(handleResponse)
  .catch(handleError);

export const deleteAuthor = (authorId) => fetch(baseUrl + authorId, { method: 'DELETE' })
  .then(handleResponse)
  .catch(handleError);
