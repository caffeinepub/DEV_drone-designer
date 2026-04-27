export function getAuthGatingMessage(action: 'save' | 'load' | 'list' | 'rename' | 'delete'): string {
  const actionMessages = {
    save: 'Sign in to save your designs',
    load: 'Sign in to load your saved designs',
    list: 'Sign in to view your saved designs',
    rename: 'Sign in to rename designs',
    delete: 'Sign in to delete designs',
  };
  
  return actionMessages[action];
}

export function isAuthenticationRequired(isAuthenticated: boolean): boolean {
  return !isAuthenticated;
}
