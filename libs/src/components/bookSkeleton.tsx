import { memo } from 'react';
import { TableCell, TableRow } from '../ui';
import { Skeleton } from '../ui/skeleton';
import { tableHeaderTitles } from '../shared/constants/constant';

const BookListSkeleton = memo(() => {
  return (
    <>
      {Array.from({ length: tableHeaderTitles?.length }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: tableHeaderTitles?.length }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-6 w-full rounded-sm" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
});
BookListSkeleton.displayName = 'BookListSkeleton';

export default BookListSkeleton;
