import { useQuery } from '@tanstack/react-query';
import { apiUrlObjects, apiClient } from '../httpservice';

export const getBookById = async (
  id: string,
  queryparams?: any
): Promise<any> => {
  try {
    const response = await apiClient.get(`${apiUrlObjects.getBookById}/${id}`, {
      params: queryparams,
    });
    console.log('🚀 ~ getBookById ~ response:', response);
    return response?.data;
  } catch (error) {
    console.log('🚀 ~ getBookById ~ error:', error);
  }
};

const QUERY_KEY = ['Books'];

export const useGetBookById = (id: string, config?: any, queryparams?: any) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getBookById(id, queryparams),
    ...config,
  });
};
