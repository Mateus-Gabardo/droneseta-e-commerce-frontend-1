export const getSessionParam = (key: string) => sessionStorage.getItem(key);

export const saveSessionParam = (key: string, value: string) =>
  sessionStorage.setItem(key, value);

export const removeSessionParam = (key: string) =>
  sessionStorage.removeItem(key);

export const clearSessionParams = () => sessionStorage.clear();

export const saveLocalParam = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getLocalParam = (key: string) => localStorage.getItem(key);

export const removeLocalParam = (key: string) => localStorage.removeItem(key);

export const clearLocalParams = () => localStorage.clear();
