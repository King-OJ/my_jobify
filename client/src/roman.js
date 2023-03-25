function convertToRoman(num, romanResultArr = []) {
  // make an object containing keys and values
  // the keys will be the roman numerals
  // while the values will be the number equivalent
  // the closest object value to the given number calling the function will be used and then subtracted from the number.
  var romanObj = {
    i: 1,
    iv: 4,
    v: 5,
    ix: 9,
    x: 10,
    xl: 40,
    l: 50,
    xc: 90,
    c: 100,
    cd: 400,
    d: 500,
    cm: 900,
    m: 1000
  };
  let romanObjValueArr = Object.values(romanObj);
  let romanObjKeyArr = Object.keys(romanObj);
 let closest;
 let i = 0;
 while(i <= romanObjValueArr.length && romanObjValueArr[i] <= num) {
   i++;
   if(romanObjValueArr[i] > num) {
     closest = romanObjValueArr[i - 1];
   }
   else if(num > 1000) {
     closest = romanObjValueArr[romanObjValueArr.length-1];
   }
 };
  if(num == 0) {
    return romanResultArr.join("").toUpperCase();
  }
  else if(num > 0) {
    if(num > closest) {
      romanObjKeyArr.forEach(val => {
        if(romanObj[val] == closest) {
          romanResultArr.push(val);
        }
      });
    return convertToRoman(num - closest, romanResultArr);
    }
    else if(num > 1000) {
      romanObjKeyArr.forEach(val => {
        if(romanObj[val] == 1000) {
          romanResultArr.push(val);
        }
      });
     return convertToRoman(num - closest, romanResultArr); 
    }
    else {
      romanObjKeyArr.forEach(val => {
        if(romanObj[val] == num) {
          romanResultArr.push(val);
        }
      });
      closest = num;
      return convertToRoman(num - closest, romanResultArr);
    }
  }
  console.log(closest);
}

convertToRoman(12)
