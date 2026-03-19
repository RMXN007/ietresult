const scraper = require('./scraper');

async function run() {
    try {
        const result = await scraper.fetchAndParseResult('24I3059', 'Regular');
        console.log(JSON.stringify(result, null, 2));
    } catch (e) {
        console.error('Failed to fetch:', e.message);
    }
}
run();
