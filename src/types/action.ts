import { Items, Question } from './state'

export type ActionType<Name, Payload = {}> = Payload & {
  type: Name
}

// export type ReducerAction =
//   | ActionType<
//       'GET_QUESTIONS',
//       Promise<{
//         items: any
//         has_more: boolean
//         quota_max: number
//         quota_remaining: number
//       }>
//     >
//   | ActionType<'SET_SELECTED_QUESTION', { payload: Question }>

export type ReducerAction = {
  type: string
  payload: any
}
