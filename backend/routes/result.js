const express = require('express');
const router = express.Router();
const scraper = require('../scraper');

router.post('/result', async (req, res) => {
  try {
    const { rollno, type } = req.body;

    if (!rollno || !type) {
        return res.status(400).json({ error: 'Please provide both rollno and type' });
    }

    // Call the scraper utility
    const resultData = await scraper.fetchAndParseResult(rollno, type);
    
    // Check if result was actually found or if there was an error extracting it
    if (!resultData || resultData.error) {
         return res.status(404).json({ error: resultData?.error || 'Result not found or invalid roll number' });
    }

    res.json(resultData);
  } catch (error) {
    console.error('Error in /api/result route:', error.message);
    res.status(500).json({ error: 'Failed to fetch result', details: error.message });
  }
});

module.exports = router;
