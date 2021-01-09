import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { formatedDate, noop } from '../../../utils'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: '100vh'
  },
  table: {
    minWidth: 650
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

const Home = ({
  questions,
  viewDetailsBtnHandler,
  getQuestionsLoading,
  getQuestions,
  currentPage,
  setCurrentPage
}) => {
  const observer = useRef()
  const pageNumber = useRef(0)
  const lastQuestionElementref = useCallback(
    (node) => {
      if (getQuestionsLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && questions.has_more) {
          pageNumber.current = currentPage + 1
          setCurrentPage(pageNumber.current)
          getQuestions(pageNumber.current)
        }
      })
      if (node) observer.current.observe(node)
    },
    [getQuestionsLoading, questions.has_more]
  )
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      {questions && questions.items && questions.items.length > 0 ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label='simple table'
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Creation Date</StyledTableCell>
                  <StyledTableCell>View Details</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {questions.items.map((question, index) => {
                  return (
                    <StyledTableRow
                      key={question.question_id}
                      ref={
                        questions.items.length === index + 1
                          ? lastQuestionElementref
                          : null
                      }
                    >
                      <StyledTableCell component='th' scope='row'>
                        {question.owner.display_name}
                      </StyledTableCell>
                      <StyledTableCell>{question.title}</StyledTableCell>
                      <StyledTableCell>
                        {formatedDate(question.creation_date)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={(e) => viewDetailsBtnHandler(e, question)}
                        >
                          View
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <>
          {getQuestionsLoading && (
            <div className={classes.spinner}>
              <CircularProgress color='secondary' />
            </div>
          )}
        </>
      )}
    </>
  )
}

Home.propTypes = {
  questions: PropTypes.instanceOf(Object),
  viewDetailsBtnHandler: PropTypes.func,
  getQuestionsLoading: PropTypes.bool,
  getQuestions: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func
}

Home.defaultProps = {
  questions: {},
  viewDetailsBtnHandler: noop,
  getQuestionsLoading: false,
  getQuestions: noop,
  currentPage: 0,
  setCurrentPage: noop
}

export default Home
