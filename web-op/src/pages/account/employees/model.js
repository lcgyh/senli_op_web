import { getuserList } from './service';

const Model = {
  namespace: 'exployees',
  state: {
    list: [],
    pageSize: 10,
    current: 1,
    searchValue: {},
    total: 0,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getuserList, payload);
      if (response.code == '1') {
        const searchValue = payload
        yield put({
          type: 'save',
          payload: { ...response.data, searchValue },
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    initState(state) {
      const initdata = {
        list: [],
        pageSize: 10,
        current: 1,
        total: 0,
      }
      return { ...state, ...initdata };
    },
  },
};
export default Model;
