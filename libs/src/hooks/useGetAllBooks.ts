import { useQuery } from '@tanstack/react-query';
import { apiClient, apiUrlObjects } from '../httpservice';

const getAllBooks = async (queryparams?: any): Promise<any> => {
  try {
    const response = await apiClient.get(apiUrlObjects.getAllBooks, {
      params: queryparams,
    });
    console.log('🚀 ~ getAllBooks ~ response:', response);
    return response?.data;
  } catch (error) {
    console.log('🚀 ~ getAllBooks ~ error:', error);
  }
};

const QUERY_KEY = ['Books'];

export const useGetAllBooks = (config?: any, queryparams?: any) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllBooks(queryparams),
    ...config,
  });
};
