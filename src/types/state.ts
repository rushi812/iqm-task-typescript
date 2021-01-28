export type Maybe<T> = T | null

export interface Question {
  question_id: string
  owner: {
    display_name: string
  }
  title: string
  creation_date: string
  body: string
  link: string
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
