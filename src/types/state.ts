export type Maybe<T> = T | null

export interface Question {
  is_answered: boolean
  view_count: number
}

export type Items = Maybe<Array<Question>>

export interface Questions {
  items: any
  has_more: boolean
  quota_max: number
  quota_remaining: number
}

export interface AppState {
  questions: Questions
  selectedQuestion: any
  getQuestionsLoading: any
}

export interface StateResult {
  app: AppState
}
