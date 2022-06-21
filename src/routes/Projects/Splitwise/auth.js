import localStore from "../../../utils/localStore";
import CONSTANTS from "./constants.json";
import { getAccessToken, getCurrentUser } from "./services";

const SplitwiseAuthProvider = {
  authStatus() {
    const splitwiseAuthPayload = localStore.getData(
      CONSTANTS.LOCAL_STORE_KEYS.splitwiseAuthPayload
    );
    return Boolean(splitwiseAuthPayload?.accessToken);
  },
  async signIn(code) {
    const splitwiseAuthPayload = localStore.getData(
      CONSTANTS.LOCAL_STORE_KEYS.splitwiseAuthPayload
    );
    try {
      if (!splitwiseAuthPayload?.accessToken) {
        const response = await getAccessToken(code);
        localStore.setData(CONSTANTS.LOCAL_STORE_KEYS.splitwiseAuthPayload, {
          code,
          accessToken: response.data.access_token,
          tokenType: response.data.token_type,
        });
      }
      return true;
    } catch (err) {
      return false;
    }
  },
  signOut() {
    Object.values(CONSTANTS.LOCAL_STORE_KEYS).forEach((localStoreKey) => {
      localStore.deleteDataWith(localStoreKey);
    });
  },
  async fetchCurrentUser(setUser) {
    let response;
    if (!localStore.getData(CONSTANTS.LOCAL_STORE_KEYS.user)) {
      response = await getCurrentUser();
      localStore.setData(CONSTANTS.LOCAL_STORE_KEYS.user, response.data.user);
      setUser(localStore.getData(CONSTANTS.LOCAL_STORE_KEYS.user));
    } else {
      setUser(localStore.getData(CONSTANTS.LOCAL_STORE_KEYS.user));
    }
  },
};

export default SplitwiseAuthProvider;
