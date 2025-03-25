const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

router.post("/upload", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  

  const accessToken = req.user.accessToken;
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = { 
    name: "Letter.docx", 
    mimeType: "application/vnd.google-apps.document" 
  };

  const media = { 
    mimeType: "text/plain", 
    body: req.body.text 
  };

  try {
    const response = await drive.files.create({ 
      resource: fileMetadata, 
      media, 
      fields: "id" 
    });
    res.json({ fileId: response.data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
