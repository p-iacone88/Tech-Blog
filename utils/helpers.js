module.exports = {
  format_date: date => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    return formatter.format(date);
  }
};