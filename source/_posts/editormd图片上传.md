---
title: editormd图片上传
date: 2018-03-14 09:42:51
categories: Java
tags: 
- editormd
- 图片上传
---
### 前言
最近搞一个网站的时候觉得别的富文本编辑器看起来都太臃肿了而且配置繁琐，尤其是ueditor（百度的富文本编辑器），单纯基于前端JavaScript，无需后台代码加持，适用于任何语言，国人开发的，对中文支持很好，editormd会自动帮你排版，在右边还能看到最后的效果。

### 图片上传
怎么配置`editormd`的方法网上有很多，我就不啰嗦了，我就说一下我是用`editormd`遇到的问题。

当我要使用editormd进行图片上传时，首先你要开启图片上传功能imageUpload:true，之后你可以设置一下上传图片文件的类型`imageFormats:["jpg", "jpeg", "gif", "png", "bmp", "webp"]`，最后你要设置图片上传要调用的`controllerimageUploadURL:"/image"`。

我用的是基于spring boot开发的网站，内置tomcat，所以重启项目时上传项目的图片会清除，所以上传时要存两个地方，一个项目内，一个磁盘上。

先在`springApplication.properties`定义两个路径：

```java
# 图片上传路径
img.location= /article/images/
img.backup= G:/article/images/
```
然后将值注入到这两个变量。

```java
@Value("${img.location}")
private String location;
@Value("${img.backup}")
private String backup;
```
然后我就遇到一个坑，当你通过http上传的图片接收时，只能接受一次，也就是说我用MultipartFile file接收，然后通过file.transferTo()上传时没问题，当我再想用这个方法上传到备份地址时，发现图片就不见了，就这个问题我耽搁了半个下午，之后找到问题所在了，我就只能另辟蹊径，我有想过copy这个文件，但需要将MultipartFile转成File，就很麻烦，我也试过一开始用FileOutputStream输入输出流进行文件的上传，还是同一个问题，上传文件之后，图片就会不见，然后我仔细观察了下，发现当我进行输入输出流的时候，它是先转化成二进制文件，然后我就先把文件转成二进制文件，这个是重新new了一个byte[]对象。之后我再通过file.transferTo()上传，然后将byte[]通过输入输出流进行另一个地址的图片上传。具体代码如下：

```java
@PostMapping("image")
public Result upload(HttpServletRequest request, @RequestParam(value = "editormd-image-file", required = false) MultipartFile file) {
    String fileName = file.getOriginalFilename();
    String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
    String newFileName = new Date().getTime() + "." + suffix;
    logger.info("【fileName】={},【fileOrginName】={},【newFileName】={},【fileSize】={}", file.getName(), file.getOriginalFilename(), newFileName, file.getSize() + "字节");
    try {
        byte[] fileByte = file.getBytes();
        /**
         * 项目上传一份，重启服务器图片丢失
         */
        String filePath = request.getSession().getServletContext().getRealPath(location);
        File targetFile = new File(filePath);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        file.transferTo(new File(filePath + newFileName));
        filePath = backup;
        targetFile = new File(filePath);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        /**
         * 上传磁盘一份，重启项目后由磁盘恢复
         */
        FileOutputStream outputStream = new FileOutputStream(filePath + newFileName);
        outputStream.write(fileByte);
        outputStream.flush();
        outputStream.close();
        String url = request.getRequestURL().substring(0, request.getRequestURL().lastIndexOf("/"))+location+ newFileName;
        return ResultUtil.success("上传成功", url);
    } catch (IOException e) {
        e.printStackTrace();
        return ResultUtil.failure();
    }
}
```
### 总结
当然了，我这也是另辟蹊径，实际上还是没能解决http接收文件只能执行一次的问题，但是问题解决了总是好的。如有问题请提出。