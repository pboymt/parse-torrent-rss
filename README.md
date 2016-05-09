# parse-torrent-rss

Parse some torrent sites' RSS link... Such as [DMHY](http://share.dmhy.org) and [NYAA](http://www.nyaa.se).

## 安装

> 注意！
> - 本工具可能不能够在使用中国大陆IPv4地址的计算机和服务器中运行，使用时请自备代理工具！
> - 安装使用前请务必安装好Node.js和npm管理工具！

```sh
$ git clone https://github.com/pboymt/parse-torrent-rss.git
$ npm install
```
然后就可以使用了

## 使用

只需执行命令
```sh
$ cd path/to/parse-torrent-rss
$ npm test dmhy/myaa //可获取dmhy/nyaa的最近50/100个种子资源
```
下载的Torrent文件将会被保存在path/to/parse-torrent-rss/nyaa或dmhy/main中。
