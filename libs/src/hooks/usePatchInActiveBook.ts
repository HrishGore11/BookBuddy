import { useMutation, useQuery } from '@tanstack/react-query';
import { apiUrlObjects, apiClient } from '../httpservice';

const inActiveBook = async (id: string, queryparams?: any): Promise<any> => {
  try {
    const response = await apiClient.patch(
      `${apiUrlObjects.inActiveBook}/${id}`,
      {
        params: queryparams,
      }
    );
    console.log('🚀 ~ inActiveBook ~ response:', response);
    return response?.data;
  } catch (error) {
    console.log('🚀 ~ inActiveBook ~ error:', error);
  }
};

const QUERY_KEY = ['InActiveBook'];

export const useInActiveBook = () => {
  return useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: (id: string) => inActiveBook(id),
  });
};
