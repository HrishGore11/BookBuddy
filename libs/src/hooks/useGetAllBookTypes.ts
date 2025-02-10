import { useQuery } from '@tanstack/react-query';
import { apiUrlObjects, apiClient } from '../httpservice';

const getAllBookTypes = async (queryparams?: any): Promise<any> => {
  try {
    const response = await apiClient.get(apiUrlObjects.getAllBookTypes, {
      params: queryparams,
    });
    console.log('🚀 ~ getAllBookTypes ~ response:', response);
    return response?.data;
  } catch (error) {
    console.log('🚀 ~ getAllBookTypes ~ error:', error);
  }
};

const QUERY_KEY = ['BookTypes'];

export const useGetAllBookTypes = (config?: any, queryparams?: any) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllBookTypes(queryparams),
    ...config,
  });
};
