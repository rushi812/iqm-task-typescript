import moment from 'moment'

export const noop = () => {}
export const formatedDate = (d: string) => moment(d).format('lll')
