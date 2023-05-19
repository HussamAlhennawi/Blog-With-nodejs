const fs = require('fs');

fs.copyFileSync('.env.example', '.env.test')

fs.readFile('.env.test', 'utf8', function (err,data) {
    if (err) console.log(err);

    fs.writeFile(
        '.env.test',
        data.replace("JWT_SECRET_KEY=", 'JWT_SECRET_KEY="'+ randomString(90) +'"'),
        'utf8',
        (err) => {if (err) console.log(err)}
    );
});


const randomString = (length) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+={}[]<>?/|';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

