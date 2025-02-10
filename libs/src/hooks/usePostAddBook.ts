import { useMutation } from '@tanstack/react-query';
import { apiUrlObjects, apiClient } from '../httpservice';
import { AxiosResponse } from 'axios';

const postAddBook = async (params: any): Promise<any> => {
  try {
    const res: AxiosResponse = await apiClient.post(
      apiUrlObjects.addBook,
      params
    );
    return (res && res?.data) || null;
  } catch (error) {
    console.log('🚀 ~ postAddBook ~ error:', error);
  }
};

const QUERY_KEY = ['postAddBook'];

export const usePostAddBook = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: (payload: any) => postAddBook(payload),
  });
