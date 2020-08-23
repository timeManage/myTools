const cheerio = require('cheerio');
let $;

export function test(html) {
    $ = cheerio.load(html);
    return $('div').hasClass('header');
}

export function info() {
    const content = {cover: '', bookName: '', author: '', date: '', newArticle: '', list: []};
    content.cover = $('#fmimg img').attr('src');
    content.bookName = $('#info h1').text();
    content.author = $('#info p').eq(0).text();
    content.date = $('#info p').eq(2).text();
    content.newArticle = $('#info p').eq(3).children('a').text();
    $('#list dl dd a').each(function () {
        const catalog = {name: '', link: ''};
        catalog.name = $(this).text();
        catalog.link = 'http://xbiquge.la' + $(this).attr('href');
        content.list.push(catalog);
    });
    return content;
}

export function article(html) {
    const article = {articleName: '', articleContent: '', nextArticleLink: ''};
    $('p').remove();
    article.articleName = $('.bookname h1').text();
    article.articleContent = $('#content').html();
    article.nextArticleLink = 'http://xbiquge.la' + $('.bottem2 a').eq(3).attr('href');
    //console.log(article);
    return article;
}

export function search() {
    const books = [];
    console.log($('tbody tr').eq(0).nextAll().length + "条记录");
    $('tbody tr').eq(0).nextAll().each(function (e) {
        /*console.log($(this).children('td').html());*/
        const book = {name: {bookName: '', link: ''}, new: {articleName: '', link: ''}, author: '', date: ''};
        book.name.bookName = $(this).children('td').eq(0).children('a').text();
        book.name.link = $(this).children('td').eq(0).children('a').attr('href');
        book.new.articleName = $(this).children('td').eq(1).children('a').text();
        book.new.link = $(this).children('td').eq(1).children('a').attr('href');
        book.author = $(this).children('td').eq(2).text();
        book.date = $(this).children('td').eq(3).text();
        books.push(book);
    });
    return books;
}

export default {}