import moment from "moment";
import "moment/locale/bn";

moment.locale("bn");

export const fromNow = time => moment(time).fromNow();

export default moment;
