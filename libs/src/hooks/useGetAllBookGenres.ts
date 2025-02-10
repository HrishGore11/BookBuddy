import { useQuery } from '@tanstack/react-query';
import { apiUrlObjects, apiClient } from '../httpservice';

const getAllBookGenres = async (queryparams?: any): Promise<any> => {
  try {
    const response = await apiClient.get(apiUrlObjects.getAllBookGenres, {
      params: queryparams,
    });
    console.log('🚀 ~ getAllGenres ~ response:', response);
    return response?.data;
  } catch (error) {
    console.log('🚀 ~ getAllGenres ~ error:', error);
  }
};

const QUERY_KEY = ['BookGenres'];

export const useGetAllBookGenres = (config?: any, queryparams?: any) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllBookGenres(queryparams),
    ...config,
  });
};
