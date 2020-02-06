module.exports = function copyObj(data){
    return data.map((e, i) => {
      const obj = Object.assign(e)._doc;
      obj.num = i;
      return obj;
    });
}