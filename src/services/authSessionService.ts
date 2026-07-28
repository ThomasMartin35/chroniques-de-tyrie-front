type SessionExpiredHandler = () => void;

let sessionExpiredHandler: SessionExpiredHandler | null = null;

export const authSessionService = {
  setSessionExpiredHandler(handler: SessionExpiredHandler) {
    sessionExpiredHandler = handler;
  },

  clearSessionExpiredHandler() {
    sessionExpiredHandler = null;
  },

  notifySessionExpired() {
    sessionExpiredHandler?.();
  },
};