//import fs from './components/fs'


module.exports = {
    telemetry: false,
    /*
    ** Headers of the page
    */
    head: {
        title: '{{ name }}',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: '{{escape description }}'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ]
    },
    css: [
        'view-design/dist/styles/iview.css',
        './static/css/index.css'
    ],
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        proxy: true,
    },
    proxy: {
        '/server': {
            target: 'http://localhost:8080',
            pathRewrite: {'^/server': ''}
        },
        '/bing': {
            target: 'https://cn.bing.com',
            pathRewrite: {'^/bing': ''}
        },
        '/biQuGe': {
            target: 'http://xbiquge.la',
            pathRewrite: {'^/biQuGe': ''},
            changeOrigin: true,
            headers:{
                referer:'http://xbiquge'
            }
        }
    },
    plugins: [
        {src: '~plugins/iview', ssr: true},
        {src: '~plugins/cheerio', ssr: false},
    ],
    serverMiddleware: [
        // API middleware
        '~/server/index.js'
    ],
    server: {
      port: 80,
      host: '0.0.0.0'
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
    },
    router: {
        base: '/myTools/'
    },
};