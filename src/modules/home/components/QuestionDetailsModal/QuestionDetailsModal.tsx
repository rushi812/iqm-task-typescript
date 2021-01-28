import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { Question } from '../../../../types/state'

type Props = {
  open: boolean;
  selectedQuestion: Question;
  handleModal: () => void;
}

const QuestionDetailsModal:React.FC<Props> = ({ open, handleModal, selectedQuestion }) => {
  const learnMoreBtnHandler = (e: React.MouseEvent<HTMLButtonElement>, link: string) => {
    window.open(link, '_blank')
  }

  return (
    <Dialog
      open={open}
      onClose={handleModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth
      maxWidth='lg'
    >
      {selectedQuestion && Object.keys(selectedQuestion).length > 0 && (
        <>
          <DialogTitle id='alert-dialog-title'>
            <Box color='primary.main'>{selectedQuestion.title}</Box>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedQuestion.body
                }}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => learnMoreBtnHandler(e, selectedQuestion.link)}
            >
              Learn More
            </Button>
            <Button variant='contained' color='secondary' onClick={handleModal}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default QuestionDetailsModal
