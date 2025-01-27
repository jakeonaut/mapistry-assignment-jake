import { useCallback, useEffect, useState } from 'react';
import {
  FetchLogEntriesResponse,
  fetchLogEntries,
} from '../shared/apiClient/logsApi';

type UseLogEntriesParams = {
  logId: string;
};
type Cache = {
  [logId: string]: FetchLogEntriesResponse;
};

const cache: Cache = {};

export const useLogEntries = ({ logId }: UseLogEntriesParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logEntries, setLogEntries] = useState([] as FetchLogEntriesResponse);
  const [error, setError] = useState<unknown>();

  const fetcher = useCallback(async () => {
    try {
      setIsLoading(true);
      if (cache[logId]) {
        setIsLoading(false);
        setLogEntries(cache[logId] || []);
      } else {
        const result = await fetchLogEntries(logId);
        cache[logId] = result;
        setIsLoading(false);
        setLogEntries(result);
      }
    } catch (e: unknown) {
      setIsLoading(false);
      setError(e);
    }
  }, [logId]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  const refreshLogEntries = () => {
    delete cache[logId];
    fetcher();
  };

  return {
    error,
    logEntries: logEntries || [],
    isLoading,
    refreshLogEntries,
  };
};
