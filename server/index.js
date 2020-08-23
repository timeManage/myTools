const axios = require('axios');
const express = require('express');
const app = express();
import {search, article, info, test} from '../plugins/cheerio';

axios.interceptors.response.use(value => {
        console.log('请求一次');
        if (!value || !test(value.data))
            axios(value.config);
    },
    error => {
        console.log(error);
    });

app.get('/search', (req, res) => {
    console.log("search:\t" + req.query.searchkey);
    axios.get('http://xbiquge.la/modules/article/waps.php', {params: req.query, headers: {'Referer': 'http://xbiquge'}, timeout: 10000,}).then(response => {
        res.status(200).send(search());
    });
});
app.get('/info', (req, res) => {
    console.log(req.query.link);
    axios.get(req.query.link, {headers: {'Referer': 'http://xbiquge'}, timeout: 10000}).then(data => {
        res.status(200).send(info());
    });
});
app.get('/article', (req, res) => {
    console.log(req.query.link);
    axios.get(req.query.link, {headers: {'Referer': 'http://xbiquge'}, timeout: 10000}).then(data => {
        res.status(200).send(article());
    });
});
module.exports = {
    path: 'api',
    handler: app
};