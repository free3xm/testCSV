module.exports = function csvJSON(csv) {
  const lines = csv.split("\r\n");
  const result = [];
  const headers = lines[0].split(";");
  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {};
    const currentline = lines[i].split(";");
    headers.forEach((header, j) => (obj[header] = currentline[j]));
    result.push(obj);
  }
  return result;
};
