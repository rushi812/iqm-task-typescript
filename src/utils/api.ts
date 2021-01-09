import axios from 'axios'

export const getQuestionsAPI = (pageNumber: number) => {
  return axios
    .get(
      `https://api.stackexchange.com/2.2/questions?page=${pageNumber}&order=desc&sort=activity&site=stackoverflow&filter=!9_bDDxJY5`
    )
    .then((res) => {
      if (res && res.status === 200 && res.data && res.data.items.length > 0) {
        return res.data
      }
    })
}
