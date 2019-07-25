import { getCurrent } from '@/services/user';
import { setAuthority } from '@/utils/authority'

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(payload, { call, put }) {
      const response = yield call(getCurrent, payload.payload);
      if (response.code == '1') {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data || {},
        });
        const roles = []
        setAuthority(roles)
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
