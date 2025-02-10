'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CLOUDINARY_UPLOAD_PRESET,
  dialogTitles,
  tableHeaderTitles,
} from '../shared/constants/constant';
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Avatar,
  AvatarImage,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';
import BookListSkeleton from './bookSkeleton';
import {
  useGetAllBookGenres,
  useGetAllBooks,
  useGetAllBookTypes,
  useInActiveBook,
  usePostAddBook,
  usePostImageOnCdn,
  usePostUpdateBook,
} from '../hooks';

const BookList = (props: any) => {
  const { navigateTo } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const [selectedBookId, setSelectedBookId] = useState(null);
  const [dialogHeaderIndex, setdialogHeaderIndex] = useState<0 | 1>(0);
  const formSchema = z.object({
    bookName: z.string().min(2, {
      message: 'Book name Required',
    }),
    author: z.string().min(4, {
      message: 'Author name is Required',
    }),
    type: z.string().min(4, {
      message: 'Book type is required',
    }),
    genre: z.string().min(4, {
      message: 'Genre is required',
    }),
    publication: z.string().min(4, {
      message: 'Publication is required',
    }),
    price: z.coerce
      .number({
        message: 'Price is required',
      })
      .positive({
        message: 'Number must be positve',
      }),
    size: z.coerce
      .number({
        message: 'Size is required',
      })
      .positive({
        message: 'Number must be positve',
      }),
    photo: z
      .string({
        required_error: 'Cover Photo is required',
      })
      .url({
        message: 'image url is required',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookName: '',
      author: '',
      type: '',
      genre: '',
      publication: '',
      price: 0,
      size: 0,
      photo: '',
    },
  });

  const { data: bookListData, refetch } = useGetAllBooks();
  const { mutate } = usePostImageOnCdn();
  const { mutate: addBookMutate } = usePostAddBook();
  const { mutate: updateBookMutate } = usePostUpdateBook();
  const { mutate: inActiveBookMutate } = useInActiveBook();
  const { data: bookTypes } = useGetAllBookTypes();
  const { data: genres } = useGetAllBookGenres();

  const { watch, setValue, reset } = form;
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { bookName, author, type, genre, photo, price, publication, size } =
      values;
    console.log(values);
    const payload = {
      bookName,
      author,
      book_type: type,
      genre: genre,
      publication,
      pages: size,
      price,
      coverPhoto: photo,
      isActive: true,
    };
    const afterUpdate = {
      onSuccess: () => {
        setOpenDialog(false);
        resetValues();
        setSelectedBookId(null);
        refetch();
      },
      onError: (error: any) => {
        console.log('🚀 ~ onSubmit ~ error:', error);
      },
    };
    if (dialogHeaderIndex === 0) {
      addBookMutate(payload, afterUpdate);
    } else {
      updateBookMutate({ ...payload, bookId: selectedBookId }, afterUpdate);
    }
  }
  const coverPhoto = watch('photo'); // Watch URL

  const resetValues = () => {
    reset(
      {
        bookName: '',
        author: '',
        type: '',
        genre: '',
        publication: '',
        price: 0,
        size: 0,
        photo: '',
      },
      { keepDefaultValues: true }
    );
  };

  const upLoadToCdn = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${CLOUDINARY_UPLOAD_PRESET}`);
    mutate(formData, {
      onSuccess: (data: any) => {
        setValue('photo', data?.url);
      },
      onError: (error: any) => {
        console.log('🚀 ~ BookList ~ error:', error);
      },
    });
  };

  const inactiveBookHandler = () => {
    inActiveBookMutate(selectedBookId || ('' as string), {
      onSuccess: (data) => {
        refetch();
      },
      onError: (error) => {
        console.log('🚀 ~ inactiveBookHandler ~ error:', error);
      },
    });
  };

  const editBookHandler = (book: any) => {
    const {
      bookId,
      bookType,
      genre,
      bookName,
      author,
      publication,
      price,
      pages,
      coverPhoto,
    } = book;
    const payload = {
      bookName,
      author,
      type: bookType?.bookTypeId,
      genre: genre?.genreId,
      publication,
      price,
      size: pages,
      photo: coverPhoto,
    };
    setSelectedBookId(bookId);
    reset(payload, { keepDefaultValues: true });
    setOpenDialog(true);
  };

  return (
    <section className="mb-12 xl:mb-36 mt-6 ">
      <div className="container mx-auto flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger
            asChild
            onClick={() => {
              setdialogHeaderIndex(0);
              resetValues();
            }}
          >
            <Button>
              <Plus size={18} />
              New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader className="sticky">
              <DialogTitle>
                {dialogTitles[dialogHeaderIndex]?.title}
              </DialogTitle>
              <DialogDescription>
                {dialogTitles[dialogHeaderIndex]?.description}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="bookName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book</FormLabel>
                      <FormControl>
                        <Input placeholder="name of the Book" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input placeholder="name of Author" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name of Publication.."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Book Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full ">
                              <SelectValue placeholder="Select a book type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bookTypes?.data?.map((type: any) => (
                              <SelectItem
                                key={type?.bookTypeId}
                                value={type?.bookTypeId}
                              >
                                {type?.bookTypeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a book genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genres?.data?.map((genre: any) => (
                              <SelectItem
                                value={genre?.genreId}
                                key={genre?.genreId}
                              >
                                {genre?.genreName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <FormControl>
                        {!coverPhoto ? (
                          <Input
                            type="file"
                            {...field}
                            onChange={upLoadToCdn}
                          />
                        ) : (
                          <div className="flex justify-between">
                            <Avatar className="w-24 h-24 rounded-sm">
                              <AvatarImage src={coverPhoto} />
                              {/* <AvatarFallback>BU</AvatarFallback> */}
                            </Avatar>
                            <X
                              onClick={() => setValue('photo', '')}
                              className="cursor-pointer"
                            />
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="type price of book" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="type number of pages.."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <DialogClose asChild onClick={resetValues}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-1/3 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="w-1/3">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="container mx-auto mt-6">
        <Table>
          <TableCaption>A list of all Books.</TableCaption>
          <TableHeader>
            <TableRow>
              {tableHeaderTitles?.map((title, index) => (
                <TableHead key={index}>{title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense fallback={<BookListSkeleton />}>
              {bookListData?.data?.map((book: any) => (
                <TableRow key={book?.bookId} className="h-12">
                  <TableCell
                    className="font-medium cursor-pointer text-blue-500"
                    onClick={() => navigateTo(book?.bookId)}
                  >
                    {book?.bookName}
                  </TableCell>
                  <TableCell>{book?.author}</TableCell>
                  <TableCell>{book?.bookType?.bookTypeName}</TableCell>
                  <TableCell>{book?.genre?.genreName}</TableCell>
                  <TableCell>{book?.publication}</TableCell>
                  <TableCell>{book?.pages}</TableCell>
                  <TableCell>{book?.price}</TableCell>

                  <TableCell className="flex items-center gap-x-4 h-12">
                    <Pencil
                      size={20}
                      className="cursor-pointer text-blue-500"
                      onClick={() => {
                        editBookHandler(book);
                        setdialogHeaderIndex(1);
                      }}
                    />
                    <Trash2
                      size={20}
                      className=" cursor-pointer text-red-600"
                      onClick={() => {
                        setOpenAlertDialog(true);
                        setSelectedBookId(book?.bookId);
                        // setdialogHeaderIndex(1);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </Suspense>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total Books</TableCell>
              <TableCell className="text-right">
                {bookListData?.data?.length || 0}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <AlertDialog onOpenChange={setOpenAlertDialog} open={openAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              book from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setSelectedBookId(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={inactiveBookHandler}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default BookList;
