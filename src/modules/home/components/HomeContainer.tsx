import React, { useEffect, useState, Dispatch } from 'react'
import { connect } from 'react-redux'
import { ReducerAction } from '../../../types/action'
import { Question, Questions, StateResult } from '../../../types/state'

import * as action from '../redux/action'
import Home from './Home'
import QuestionDetailsModal from './QuestionDetailsModal/QuestionDetailsModal'

type Props = {
  questions: Questions;
  getQuestions: (pageNumber: number) =>  void;
  setSelectedQuestion: (question: Question) => void;
  selectedQuestion: any;
  getQuestionsLoading: any;
}

const HomeContainer: React.FC<Props> = ({
  questions,
  getQuestions,
  setSelectedQuestion,
  selectedQuestion,
  getQuestionsLoading
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  useEffect(() => {
    getQuestions(currentPage)
  }, [])

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const viewDetailsBtnHandler = async (e: React.MouseEvent<HTMLButtonElement>, question: Question) => {
    await setSelectedQuestion(question)
    handleModal()
  }

  return (
    <>
      <Home
        questions={questions}
        viewDetailsBtnHandler={viewDetailsBtnHandler}
        getQuestionsLoading={getQuestionsLoading}
        getQuestions={getQuestions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <QuestionDetailsModal
        open={isOpen}
        handleModal={handleModal}
        selectedQuestion={selectedQuestion}
      />
    </>
  )
}

const mapStateToProps = (state: StateResult) => ({
  questions: state.app.questions,
  selectedQuestion: state.app.selectedQuestion,
  getQuestionsLoading: state.app.getQuestionsLoading
})

const mapDispatchToProps = (dispatch: Dispatch<ReducerAction>) => ({
  getQuestions: (pageNumber: number) => dispatch(action.getQuestions(pageNumber)),
  setSelectedQuestion: (question: Question) =>
    dispatch(action.setSelectedQuestion(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
