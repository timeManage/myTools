import marked from 'marked';
import {escape} from 'marked/src/helpers';

const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');


const renderer = new marked.Renderer();
marked.setOptions({
    renderer,
    gfm: true,//启动Github样式的Markdown
    tables: true,//支持Github表格，必须打开gfm选项
    breaks: true,//支持Github换行符，必须打开gfm选项
    pedantic: false,//只解析符合markdown.pl定义的，不修正markdown的错误
    sanitize: false,//原始输出，忽略HTML标签
    smartLists: true,//优化列表输出
    smartypants: false,
    highlight: (code, lang) => {
        if (/(tex)$/.test(lang)) lang = 'latex';
        if (/(h)$/.test(lang)) lang = 'c';
        if (/(js)$/.test(lang)) lang = 'javascript';
        if (/(tsx)$/.test(lang)) lang = 'jsx';
        if (/(bat)$/.test(lang)) lang = 'batch';
        if (/(py)$/.test(lang)) lang = 'python';
        if (/(rb)$/.test(lang)) lang = 'ruby';
        if (/(gitconfig|editorconfig|gitmodules)$/.test(lang)) lang = 'ini';
        if (/(yml)$/.test(lang)) lang = 'yaml';
        if (/(styl)$/.test(lang)) lang = 'stylus';
        if (/(stylelintrc|postcssrc)$/.test(lang)) lang = 'json';
        if (/(sh|shell|bash|bats|cgi|command|fcgi|ksh|sh.in|tmux|tool|zsh|bash_history|bash_logout|bash_profile|bashrc|cshrc|login|profile|zlogin|zlogout|zprofile|zshenv|zshrc)$/.test(lang)) lang = 'bash';
        if (/(ps1|psm1)$/.test(lang)) lang = 'powershell';
        if (/^(html|htm|xml|ejs)/.test(lang)) lang = 'html';
        lang = lang ? lang : 'bash';
        loadLanguages([lang]);
        let html = code;
        if (Prism.languages[lang]) {
            html = Prism.highlight(code, Prism.languages[lang], lang).toString().replace(/\$/g, '&#36;');
        }
        return html;
    },

});
export default ((content) => {
    return marked(content, {renderer});
});