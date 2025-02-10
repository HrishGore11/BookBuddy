import { CLOUDINARY_CLOUD_NAME } from '../shared/constants/constant';

const serverUrl = `http://localhost:3333/api`;
const cdnUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const apiUrlObjects = {
  getAllBooks: `${serverUrl}/books`,
  getBookById: `${serverUrl}/book`,
  addBook: `${serverUrl}/addBook`,
  updateBook: `${serverUrl}/updateBook`,
  inActiveBook: `${serverUrl}/inActiveBook`,
  getAllBookTypes: `${serverUrl}/bookTypes`,
  getAllBookGenres: `${serverUrl}/genres`,
  postImageOnCdn: `${cdnUrl}`,
};
