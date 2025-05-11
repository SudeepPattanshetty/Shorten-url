const { nanoid } = require('nanoid');
const URL = require('../models/urlSchema');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    const shortId = nanoid(8); // Always generate a new unique ID

    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        const allUrls = await URL.find({});

        return res.render("home", {
            id: shortId,
            url: allUrls
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}