import { getBookById } from '@/libs/src';
import { Card, CardContent, CardDescription, Label } from '@/libs/src/ui';
import Image from 'next/image';
const Page = async (props: any) => {
  const { params } = props;
  if (!params?.id) return <p>Invalid book ID</p>;

  try {
    const { data } = await getBookById(params?.id);
    // const data = [];
    console.log('🚀 ~ Page ~ data:', data);

    if (!data) return <p>Book not found</p>;

    const {
      bookName,
      author,
      bookType,
      genre,
      publication,
      pages,
      price,
      coverPhoto,
    } = data;

    return (
      <div className="container mx-auto flex items-center justify-center self-center mt-10">
        <Card className="w-full max-w-6xl rounded-md shadow-lg space-x-7 md:flex md:h-[500px]">
          <div className="md:min-w-[100px]">
            <Image
              className="h-[500px] w-[500px] rounded-sm"
              src={coverPhoto || null}
              alt={bookName}
              width={500}
              height={500}
            />
          </div>
          <CardContent className="p-6 flex flex-col justify-between ml-0">
            <div>
              <h2 className="text-2xl font-bold">{bookName}</h2>
              <p className="text-gray-500 text-sm mt-1">by {author}</p>
              <div className="mt-6 space-y-3">
                <div className="flex space-x-4 items-center">
                  <Label className="uppercase">Publisher :</Label>
                  <span className="text-base font-medium rounded">
                    {publication}
                  </span>
                </div>
                <div className="flex space-x-4 items-center">
                  <Label className="uppercase">Type :</Label>
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {bookType?.bookTypeName}
                  </span>
                </div>
                <div className="flex space-x-4 items-center">
                  <Label className="uppercase">Genre :</Label>

                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                    {genre?.genreName}
                  </span>
                </div>
                <div className="flex space-x-4 items-center">
                  <label className="uppercase">Pages :</label>
                  <span className="text-sm font-semibold">{pages}</span>
                </div>
                <div className="space-y-2">
                  <Label className="uppercase">Description :</Label>
                  <div className="text-clip text-gray-500">
                    This is a brief description of the book. It gives readers an
                    idea about the story and its essence.
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <Label className="uppercase">Price :</Label>
              <span className="text-xl font-bold ">₹ {price}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error fetching book:', error);
    return <p>Failed to load book details</p>;
  }
};

export default Page;
