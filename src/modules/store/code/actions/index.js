import * as a from './const';
import * as m from '../mutations/const';

import globalAxios from 'axios';

export default {

  [a.getCode]({commit}, language) {
    return globalAxios.get(`/${language}.json`)
    .then((res) => {
      const codeObject = res.data;
      const codeArray = [];

      for (let i in codeObject) {
        codeArray.push(codeObject[i]);
      }

      const randomIndex = Math.floor(Math.random() * codeArray.length);

      commit(m.STORE_CODE, codeArray[randomIndex]);
      commit(m.STORE_HIGHSCORES, codeArray[randomIndex].highscores);
      commit(m.STORE_CODEID, Object.keys(res.data)[randomIndex]);
      return res;
      })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
  }
};
