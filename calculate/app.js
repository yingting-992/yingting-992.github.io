
const csvToJson = require('csvtojson')
const jsonTocsv = require('json2csv').parse
const { writeFileSync } = require('fs')
 

csvToJson().fromFile('./dataorg.csv').then(dataorg => {
    console.log(dataorg);
    dataorg.push({
        '時間戳記': '2024/10/26 下午 3:11:24',
        '電子郵件地址' : 'c112156104@nkust.edu.tw',
        '姓名' : 'a555a',
        '性別' : '女',
        '年齡' : '100',
        '身高' : '10',
        '體重' : '10'
    });
    const csv = jsonTocsv(dataorg, { fields: ['時間戳記', '電子郵件地址', '姓名', '性別', '年齡', '身高', '體重'] });
    writeFileSync('./dataorg111.csv', csv);
});
