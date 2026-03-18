const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
axios.get('http://results.ietdavv.edu.in/').then(res => {
  const $ = cheerio.load(res.data);
  let out=''; 
  $('form').each((i, form) => { 
    out += 'Form action: ' + $(form).attr('action') + '\n'; 
    $(form).find('input, select').each((j, el) => { 
      out += '  ' + $(el).attr('name') + ' ' + ($(el).attr('type') || el.tagName) + ' ' + ($(el).attr('value') || '') + '\n'; 
    }); 
  }); 
  fs.writeFileSync('form_info.txt', out);
}).catch(console.error);
