import moment from 'moment';

export const getDate = dueDate => {
  const momenObject = moment(`${dueDate}`).format('YYYY-MM-DD');
  const diffDays = moment(momenObject).diff(moment(new Date()).format('YYYY-MM-DD'), 'days');

  if (diffDays > 1) {
    return moment(momenObject).format('DD MMMM, YYYY').toLocaleUpperCase();
  }
  if (diffDays >= -1) {
    return moment(momenObject).calendar().split(' at ')[0].toLocaleUpperCase();
  }
  return moment(momenObject).format('DD MMMM, YYYY').toLocaleUpperCase();
};
