import axios from "../.nuxt/axios";

const express = require('express');
const router = express.Router();
const app = express();


router.get('/search', (req, res) => {
    axios.get('http://xbiquge.la').setHeader('Referer', 'http://xibiquge')
        .end((err, response) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(response.body);
        });
});
router.use(router);
app.use('/api', router);