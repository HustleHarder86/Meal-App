const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const tableName = process.env.AIRTABLE_TABLE_NAME || 'Recipes';

app.get('/api/recipes', async (req, res) => {
  const filter = req.query.tag;
  try {
    console.log(`Querying table ${tableName} in base ${process.env.AIRTABLE_BASE_ID}`);
    const records = await base(tableName).select().all();
    console.log(`Retrieved ${records.length} records`);
    const recipes = records.map(rec => ({ id: rec.id, ...rec.fields }));
    let filtered = recipes;
    if (filter) {
      filtered = recipes.filter(r => (r.Tags || []).includes(filter));
    }
    res.json(filtered);
  } catch (err) {
    console.error('Error fetching records:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
