// const fs = require('fs');
// const csv = require('csv-parser');

// // 準備 JSON 數據的空數組      
// let results = [];

// // 讀取 CSV 檔案
// fs.createReadStream('./dataorg.csv')
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         // 將結果寫入 data.json
//         fs.writeFileSync('data.json', JSON.stringify(results, null, 2), 'utf-8');
//         console.log('CSV 轉換為 JSON 完成！');
//     });


// 這裡可以添加任何其他與計算相關的代碼
const fs = require('fs');
const { google } = require('googleapis');
const csv = require('csv-parser');

// 認證設置
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

// 載入憑據
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // 檢查是否有已保存的 token
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: 'your_spreadsheet_id',  // Google 表單對應的試算表 ID
        range: 'Sheet1!A:F',  // 試算表中的範圍
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            console.log('Name, Age, Gender, Height, Weight:');
            let results = [];
            rows.map((row) => {
                let user = {
                    date: row[0],
                    name: row[1],
                    age: row[2],
                    gender: row[3],
                    height: row[4],
                    weight: row[5]
                };
                results.push(user);
            });
            fs.writeFileSync('path/to/your/data.json', JSON.stringify(results, null, 2), 'utf-8');
            console.log('Data updated successfully');
        } else {
            console.log('No data found.');
        }
    });
}
