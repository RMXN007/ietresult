const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

async function dumpHtml() {
    const data = qs.stringify({
        rollno: '24i3054',
        typeOfStudent: 'Regular',
        Submit: 'View Result'
    });

    const res = await axios.post('http://results.ietdavv.edu.in/DisplayStudentResult', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    fs.writeFileSync('result_sample.html', res.data);
    console.log('HTML dumped to result_sample.html');
}

dumpHtml();
