export const formatDate = (date: Date, includeTime = false) => {
  let str;

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  str = `${year}年${month}月${day}日`;

  if (includeTime) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getHours().toString().padStart(2, '0');
    str += ` ${hour}:${minute}`;
  }

  return str;
};
