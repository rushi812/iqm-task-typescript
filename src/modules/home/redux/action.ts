import * as actionTypes from './actionTypes'
import { getQuestionsAPI } from '../../../utils/api'
import { Question } from '../../../types/state'

export const getQuestions = (pageNumber: number) => ({
  type: actionTypes.GET_QUESTIONS,
  payload: getQuestionsAPI(pageNumber)
})

export const setSelectedQuestion = (question: Question) => ({
  type: actionTypes.SET_SELECTED_QUESTION,
  payload: question
})

// export type questionAction = getQuestions | setSelectedQuestion
