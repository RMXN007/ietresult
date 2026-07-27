const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');


const BASE_URL = 'https://results.ietdavv.edu.in/';
const RESULT_URL = 'https://results.ietdavv.edu.in/DisplayStudentResult';

async function fetchAndParseResult(rollno, type) {
    try {
        const response = await axios.get(RESULT_URL, {
            params: {
                rollno: rollno.toUpperCase(),
                typeOfStudent: type
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 15000, // Add a timeout since the server is unstable
            validateStatus: (status) => status < 600
        });

        const html = response.data;
        const $ = cheerio.load(html);
        $('script').remove(); // Remove script tags to avoid catching JavaScript error handlers in the body text

        const pageText = $('body').text();
        if (response.status === 500 || pageText.includes('Invalid RollNo') || pageText.includes('Not Found') || pageText.includes('Error')) {
            return { error: 'Invalid Roll Number or Result not found.' };
        }

        const getBranchFromRoll = (roll) => {
            const match = roll.match(/[A-Z]/i);
            if (!match) return '';
            switch (match[0].toUpperCase()) {
                case 'C': return 'Computer Science';
                case 'I': return 'Information Technology';
                case 'E': return 'Electronics & Instrumentation';
                case 'T': return 'Electronics & Telecommunication';
                case 'M': return 'Mechanical';
                case 'V': return 'Civil';
                default: return '';
            }
        };

        const resultJSON = {
            name: '',
            roll: rollno.toUpperCase(),
            enrollment: '',
            semester: '', // Semester and Branch are not always explicitly defined in the table in this exact format. We'll leave them blank if not found.
            branch: getBranchFromRoll(rollno),
            subjects: [],
            total: '',
            sgpa: '',
            status: ''
        };

        // Extract Basic Info (usually the second table, width 80%)
        $('table').each((i, table) => {
            const htmlContent = $(table).html();
            if (htmlContent.includes('Enrollment Number')) {
                $(table).find('tr').each((j, tr) => {
                    const text = $(tr).text();
                    if (text.includes('Student Name')) {
                        resultJSON.name = $(tr).find('td').eq(1).text().trim();
                    }
                    if (text.includes('Enrollment Number')) {
                        resultJSON.enrollment = $(tr).find('td').eq(1).text().trim();
                    }
                    // In case branch/semester are there on some pages
                    if (text.includes('Branch') || text.includes('Programme')) {
                        const scrapedBranch = $(tr).find('td').eq(1).text().trim();
                        if (!resultJSON.branch) {
                            resultJSON.branch = scrapedBranch;
                        }
                    }
                });
            }
        });

        // Extract Subjects (table with Subjects header)
        let subjectsParsed = false;
        $('table').each((i, table) => {
            if (subjectsParsed) return false;
            const htmlContent = $(table).html();
            if (htmlContent.includes('Subjects') && htmlContent.includes('Subject Code')) {
                let foundAny = false;
                $(table).find('tr').each((j, tr) => {
                    if (j === 0) return; // Skip headers

                    const tds = $(tr).find('td');
                    if (tds.length >= 3) {
                        const subjectName = $(tds[0]).text().trim();
                        // Ignore the "Grade" and "Marks Range" rows which often appear at the end of the table
                        const lowerName = subjectName.toLowerCase();
                        if (lowerName === 'grade' || lowerName.includes('marks range')) return;

                        const subjectCode = $(tds[1]).text().trim();
                        const theoryMarks = $(tds[2]).text().trim() || '-';
                        const practicalMarks = tds.length >= 4 ? $(tds[3]).text().trim() : '-';

                        if (subjectName) {
                            foundAny = true;
                            resultJSON.subjects.push({
                                subject: subjectName,
                                code: subjectCode,
                                theory: theoryMarks,
                                practical: practicalMarks || '-'
                            });
                        }
                    }
                });
                if (foundAny) subjectsParsed = true;
            }
        });

        // Extract Result and SGPA
        $('table').each((i, table) => {
            const htmlContent = $(table).html();
            if (htmlContent.includes('Result') || htmlContent.includes('SGPA')) {
                $(table).find('tr').each((j, tr) => {
                    const text = $(tr).text();
                    if (text.includes('Result')) {
                        resultJSON.status = $(tr).find('td').last().text().trim().toUpperCase();
                    }
                    if (text.includes('SGPA')) {
                        resultJSON.sgpa = $(tr).find('td').last().text().trim();
                    }
                });
            }
        });

        return resultJSON;

    } catch (error) {
        console.error('Error scraping result:', error.message);
        throw new Error('Failed to fetch and parse result from portal.');
    }
}

module.exports = { fetchAndParseResult };
