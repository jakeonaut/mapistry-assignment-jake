import { LOG_1_ID, PROJECT_ID } from '@mapistry/take-home-challenge-shared';

export const useLastVisitedLog = () => {
  const lastVisitedLog = {
    id: LOG_1_ID,
    projectId: PROJECT_ID,
    name: 'Test Log',
  };
  return { lastVisitedLog };
};
