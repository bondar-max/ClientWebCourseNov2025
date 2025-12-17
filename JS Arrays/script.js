/*const x = 3;
const array = [1, 2, 3, 4, 5];
console.log(array);
array.push(6); // добавление в конец массива
array.push(7, 8); // можно вставлять сколько угодно за раз
console.log(array);
array.pop();
console.log(array);*/

/*const array = [1, 2, 3, 4, 5];
array.unshift(0); // добавление в начало массива
console.log(array);
array.unshift(-2, -1); // можно вставлять много элем-в за раз
console.log(array);
array.shift();
console.log(array);*/

/*const array = [1, 2, 3, 4, 5];
array.reverse();
console.log(array.join(", "));*/

/*const array1 = [1, 2, 3];
const array2 = [4, 5];
const array3 = array1.concat(array2);
console.log(array3);*/

/*const array = [1, 2, 3, 4, 5];
const array1 = array.slice(1, 4);
// [2, 3] – подмассив от начального индекса до конечного
const array2 = array.slice(3);
// [4, 5] – подмассив от индекса до конца массива
console.log(array1);
console.log(array2  );
*/

const array = [3, 1, 17, 2, 9, 6, 13, 5, 4];

array.sort(function(e1, e2)
{
    return e2 - e1;
});
console.log(array);

const array2 = array.slice(4);
console.log(array2);

const array3 = array.slice(0, 5);
console.log(array3);

const filteredArray = array.filter(e => e % 2 === 0);
console.log(filteredArray);

const sum2 = filteredArray.reduce((a, b) => a + b);
console.log(sum2);