import * as a from './const';
import * as m from '../mutations/const';

import globalAxios from 'axios';

export default {

  [a.saveScore]({rootState}, score) {

    const token = rootState.auth.idToken;
    const highScoreArray = rootState.code.highscores;
    const language = rootState.code.language.toLowerCase();
    const codeId = score.codeId;

    // sort array from lowest to highest seconds

    highScoreArray.sort((a, b) => {
      return a.score - b.score;
    });

    // if it's a better score, replace the score in Array
    for (let i = 0; i < highScoreArray.length; i++) {
      if (highScoreArray.length <= 6) {
        if (score.score < highScoreArray[i].score) {
          highScoreArray.splice(i, 0, {score: score.score, username: score.username});
          break;
        } else if (score.score < highScoreArray[i].score) {
          highScoreArray.splice(i, 1, {score: score.score, username: score.username});
          break;
        }
      }
    }
    globalAxios.put(`/${language}/${score.codeId}/highscores.json?auth=${token}`, highScoreArray)
      .then((res) => {
        console.log(res, 'response');
        })
      .catch((error) => {
        console.log(error);
    });
  }
};
