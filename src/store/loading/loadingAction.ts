export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export const showLoading = () => ({
  type: SHOW_LOADING,
});

export interface ShowLoading {
  type: typeof SHOW_LOADING;
}

export const hideLoading = () => ({
  type: HIDE_LOADING,
});

export interface HideLoading {
  type: typeof HIDE_LOADING;
}
