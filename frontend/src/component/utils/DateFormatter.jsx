import React from 'react';
import moment from 'moment';

function DateFormatter({ date }) {
  const formattedDate = moment(date).format('MMMM Do YYYY');

  return <p>{formattedDate}</p>;
}
export default DateFormatter