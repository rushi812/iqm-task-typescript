import { ReducerAction } from './../../../types/action'
import { AppState, StateResult, Questions } from './../../../types/state'
import * as actionTypes from './actionTypes'

// interface INITIAL_STATE {
//   questions: object
//   selectedQuestion: object
//   getQuestionsLoading: boolean
// }

const INITIAL_STATE:AppState = {
  questions: {
    items: [],
    has_more: false,
    quota_max: 0,
    quota_remaining: 0
  },
  selectedQuestion: null,
  getQuestionsLoading: null
}

// type State = INITIAL_STATE[]

const appReducer = (state: AppState = INITIAL_STATE, action: ReducerAction) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.GET_QUESTIONS_LOADING:
      return {
        ...state,
        getQuestionsLoading: true
      }
    case actionTypes.GET_QUESTIONS_SUCCESS: {
      let tempItems
      if (state.questions.items && state.questions.items.length > 0) {
        tempItems = [...state.questions.items, ...payload.items]
      } else {
        tempItems = payload.items
      }
      return {
        ...state,
        getQuestionsLoading: false,
        questions: {
          ...payload,
          items: tempItems
        }
      }
    }
    case actionTypes.GET_QUESTIONS_ERROR:
      return {
        ...state,
        getQuestionsLoading: false
      }
    case actionTypes.SET_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestion: payload
      }
    default:
      return state
  }
}

export default appReducer
