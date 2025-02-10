'use client';
import { BookList } from '@books-management/libs';
import { useRouter } from 'next/navigation';
export default function Index() {
  const router = useRouter();
  const redirectToBookDetails = (id: string) => {
    router.push(`/book/${id}`);
  };

  return (
    <div>
      <BookList navigateTo={redirectToBookDetails} />
    </div>
  );
}
