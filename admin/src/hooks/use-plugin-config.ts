import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import { REDUCER_SET_CONFIG, REDUCER_SET_LOADING, REDUCER_ID } from '../reducers'

const usePluginConfig = () => {
  const dispatch = useDispatch();
  const fetchClient = useFetchClient();
  const toggleNotification = useNotification();
  const { config, isLoading, isLoaded } = useSelector((state: any) => state[REDUCER_ID]);

  const loadData = useCallback(
    async () => {
      try {
        dispatch({
          type: REDUCER_SET_LOADING,
        });

        const response = await fetchClient.get('/strapi-preview-link/config')

        if (response && response.data) {
          dispatch({
            type: REDUCER_SET_CONFIG,
            data: response.data,
          });
        }

      } catch (err) {
        const error = err as any
        console.error(error)

        if ('code' in error && error?.code === 'ERR_CANCELED') {
          return;
        }

        toggleNotification({
          type: 'warning',
          message: { id: 'notification.error' },
        });
      }
    },
    [dispatch, fetchClient, toggleNotification],
  )
  

  useEffect(() => {
    if (isLoading || isLoaded) {
      return;
    }

    loadData();
  }, [isLoading, isLoaded, loadData]);

  if (isLoading && !isLoaded) {
    return null
  }

  return config
};

export default usePluginConfig;
