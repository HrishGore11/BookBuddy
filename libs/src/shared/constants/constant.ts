const CLOUDINARY_CLOUD_NAME = 'rossi1494';
const CLOUDINARY_UPLOAD_PRESET = 'Book_Management_App';
const tableHeaderTitles = [
  'Title',
  'Author',
  'Type',
  'Genre',
  'Publication',
  'Size(pages)',
  'Price',
  'Actions',
];
const dialogTitles = [
  {
    title: 'New book',
    description: 'Fill all details to add a new book.',
  },
  {
    title: 'Edit book',
    description: 'Update all details to update a book.',
  },
];

export {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  dialogTitles,
  tableHeaderTitles,
};
