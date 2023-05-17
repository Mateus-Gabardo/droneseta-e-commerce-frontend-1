import { useCallback } from 'react';
import {
  removeLocalParam,
  getLocalParam,
  saveLocalParam,
} from '../../utils/session';
import { Session } from '../../shared/@types';

export const useSession = () => {
  const session: string | null = getLocalParam('session');
  let sessionObject = null;
  if (!session) {
    return sessionObject;
  }
  try {
    sessionObject = JSON.parse(session);
  } catch (error) {
    return null;
  }
  return sessionObject;
};

export const useGetSession = () =>
  useCallback((session: Session) => {
    saveLocalParam('session', JSON.stringify(session));
  }, []);

export const useClearSession = () =>
  useCallback(() => {
    removeLocalParam('session');
    return true;
  }, []);
