import { useMutation } from '@tanstack/react-query';
import { apiUrlObjects, apiClient } from '../httpservice';
import { AxiosResponse } from 'axios';

const postUpdateBook = async (data: any): Promise<any> => {
  try {
    const res: AxiosResponse = await apiClient.put(
      `${apiUrlObjects.updateBook}/${data?.bookId}`,
      data
    );
    return (res && res?.data) || null;
  } catch (error) {
    console.log('🚀 ~ postUpdateBook ~ error:', error);
  }
};

const QUERY_KEY = ['postUpdateBook'];

export const usePostUpdateBook = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: (payload: any) => postUpdateBook(payload),
  });
