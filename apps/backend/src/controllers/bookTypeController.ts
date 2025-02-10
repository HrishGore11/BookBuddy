import { Request, Response } from 'express';
import { listOfAllBookTypeService } from '../services/bookTypeService';
import { BookTypeDto } from '../dto/bookTypeDto';

const getAllBookTypes = async (req: Request, res: Response) => {
  try {
    const listOfBookType = await listOfAllBookTypeService();
    const bookTypedto = BookTypeDto.toDto(listOfBookType);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: bookTypedto
        ? 'Book type list fetched successfully.'
        : 'no Book types found',
      data: bookTypedto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllBookTypes };
