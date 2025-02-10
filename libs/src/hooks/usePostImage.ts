import { useMutation } from '@tanstack/react-query';
import { apiUrlObjects, apiClient } from '../httpservice';
import { AxiosResponse } from 'axios';

const postImageOnCdn = async (params: any): Promise<any> => {
  try {
    const res: AxiosResponse = await apiClient.post(
      apiUrlObjects.postImageOnCdn,
      params
    );
    return (res && res?.data) || null;
  } catch (error) {
    console.log('🚀 ~ postImageOnCdn ~ error:', error);
  }
};

const QUERY_KEY = ['postImageOnCdn'];

export const usePostImageOnCdn = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: (payload: any): any => postImageOnCdn(payload),
  });
