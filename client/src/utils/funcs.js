import moment from "moment";
import 'moment/locale/ru'

export const formatDate = (date) => {
    let momentDate = moment(new Date(date))
    momentDate.locale('ru')
    return momentDate.fromNow()
}