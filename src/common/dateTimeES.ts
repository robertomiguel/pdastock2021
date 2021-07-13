import moment from 'moment'

export const dateTimeES = (d: Date | undefined) =>
    d ? moment(d).format('DD-MM-YYYY HH:ss') : ''
