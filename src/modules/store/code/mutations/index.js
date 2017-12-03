import * as m from './const';
import * as s from '../state/const';

export default {
  [m.START](state) {
    state[s.started] = true;
    state[s.completed] = false;
  },
  [m.STOP](state) {
    state[s.started] = false;
    state[s.completed] = true;
  },
  [m.STORE_CODE](state, code) {
    state[s.code] = code;
  },
  [m.STORE_HIGHSCORES](state, highscores) {
    state[s.highscores] = highscores;
  },
  [m.STORE_CODEID](state, id) {
    state[s.codeId] = id;
  },
  [m.STORE_LANGUAGE](state, language) {
    state[s.language] = language;
  }
};
