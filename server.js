const express = require('express');
const mercury = require('@postlight/mercury-parser');
const app = express();

app.get('/parser', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send({ error: 'Missing URL' });

  try {
    const result = await mercury.parse(url);
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to parse URL', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mercury Parser running on port ${PORT}`);
});
