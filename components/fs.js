const path = require('path');
const fse = require('fs-extra');
import marked from "../plugins/marked";

//npm包里的md文件
let modulesMdDir = path.resolve(process.cwd(), 'node_modules', 'linux-command', 'command');
//md要复制到的路径
let mdDir = path.resolve(process.cwd(), 'static', 'command', 'md');
//html文件创建的路径
let htmlDir = path.resolve(process.cwd(), 'static', 'command', 'html');


//复制md文件至项目路径下(若存在则不复制)
fse.copySync(modulesMdDir, mdDir, {overwrite: false});
let mdFileArr = fse.readdirSync(mdDir);
mdFileArr.forEach(item => {
    console.log("执行文件" + item);
    let htmlName=item.replace(/\.md$/, '.html');
    let htmlPath = path.join(htmlDir, htmlName);
    fse.exists(htmlPath, exist => {
        if (exist) {
            console.log(htmlName + "文件已存在，跳过该文件");
        }else {
            console.log(htmlName + "文件不存在，开始创建");
            let html = marked(fse.readFileSync(path.join(mdDir, item)).toString());
            fse.outputFileSync(htmlPath, html);
        }

    });
});

export default (name => {
    return fse.readFileSync(path.join(htmlDir, name + ".html"));
});