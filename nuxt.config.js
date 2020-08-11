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
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    css: [
        'view-design/dist/styles/iview.css',
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
        }
    },
    plugins: [
        {src: '~plugins/iview', ssr: true},
    ],
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