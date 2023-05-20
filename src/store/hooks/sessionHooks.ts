import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  removeLocalParam,
  getLocalParam,
  saveLocalParam,
} from '../../utils/session';
import { CartItem, Session } from '../../shared/@types';

import * as sessionActions from '../session/sessionAction';
import { RootState } from '../reducers';

const useSessionState = () =>
  useSelector((rootState: RootState) => rootState.sessionState);

export const useSession = () => {
  const session: string | null = getLocalParam('session');
  let sessionObject: Session | null = null;
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

export const useCart = () => useSessionState().cart;

export const useGetCart = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(sessionActions.getCart(useSession()?.cart ?? []));
  }, [dispatch]);
};

export const useClearCart = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    const session: string | null = getLocalParam('session');
    let sessionObject: Session | null = null;
    if (session === null || !session) {
      return null;
    }
    try {
      sessionObject = JSON.parse(session);
    } catch (error) {
      return null;
    }

    if (sessionObject && sessionObject.cart) {
      sessionObject.cart = [];
      saveLocalParam('session', JSON.stringify(sessionObject));
      dispatch(sessionActions.getCart(sessionObject.cart));
    }

    return sessionObject;
  }, []);
};

export const useAddCart = () => {
  const dispatch = useDispatch();

  return useCallback((cart: CartItem) => {
    const session: string | null = getLocalParam('session');
    let sessionObject: Session | null = null;
    if (session === null || !session) {
      return null;
    }
    try {
      sessionObject = JSON.parse(session);
    } catch (error) {
      return null;
    }

    if (sessionObject !== null) {
      if (sessionObject.cart) {
        if (sessionObject.cart.find((value) => value.id === cart.id)) {
          return null;
        }
        sessionObject.cart.push(cart);
        dispatch(sessionActions.getCart(sessionObject.cart));
        toast.success('Item adicionado ao carrinho!');
      } else {
        sessionObject.cart = [cart];
        dispatch(sessionActions.getCart(sessionObject.cart));
        toast.success('Item adicionado ao carrinho!');
      }
      saveLocalParam('session', JSON.stringify(sessionObject));
    }

    return true;
  }, []);
};

export const useRemoveCart = () => {
  const dispatch = useDispatch();

  return useCallback((index: number) => {
    const session: string | null = getLocalParam('session');
    let sessionObject: Session | null = null;
    if (session === null || !session) {
      return null;
    }
    try {
      sessionObject = JSON.parse(session);
    } catch (error) {
      return null;
    }

    if (sessionObject) {
      if (sessionObject.cart) {
        sessionObject.cart.splice(index, 1);
        dispatch(sessionActions.getCart(sessionObject.cart));
        saveLocalParam('session', JSON.stringify(sessionObject));
        toast.success('Item removido do carrinho!');
      }
    }

    return true;
  }, []);
};
