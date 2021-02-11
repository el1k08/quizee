import http from './HttpService'

export function createQuiz(quiz) {
  return http.post(`${process.env.REACT_APP_FB_DB}/quizes.json`, quiz)
}

export function getAllQuizes() {
  return http.get(`${process.env.REACT_APP_FB_DB}/quizes.json`)
}

export function getQuiz(id) {
  return http.get(`${process.env.REACT_APP_FB_DB}/quizes/${id}.json`)
}

const service = {
  createQuiz,
  getAllQuizes,
  getQuiz,
};

export default service;