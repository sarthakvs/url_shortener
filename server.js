const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const path = require('path');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
const urlSchema = new mongoose.Schema({
    fullUrl: {
      type: String,
      required: true
    },
    shortUrl: {
      type: String,
      required: true,
      default: shortid.generate
    }
  });
  
  const Url = mongoose.model('Url', urlSchema);
  app.post('/api/shorten', async (req, res) => {
    const { fullUrl } = req.body;
    try {
      const existingUrl = await Url.findOne({ fullUrl });
      if (existingUrl) {
        res.json(existingUrl);
      } else {
        const newUrl = new Url({ fullUrl });
        await newUrl.save();
        res.json(newUrl);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  app.get('/api/urls', async (req, res) => {
    try {
      const urls = await Url.find();
      res.json({ urls });
    } catch (error) {
      console.error('Error fetching database contents:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    try {
      const url = await Url.findOne({ shortUrl });
      if (url) {
        return res.redirect(url.fullUrl);
      } else {
        return res.status(404).json({ error: 'URL not found' });
      }
    } catch (error) {
      console.error('Error retrieving URL:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
