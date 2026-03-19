# translate_deepl_aicode
自用翻译小插件，使用deepl的api接口，ai编写的代码

# 使用事项
首先npm i

然后在main-window.html文件中

338-339行

将自己的deepl-api-key更改保存即可

# 如下
const apiKey = 'YOUR_DEEPL_API_KEY,注意:免费版:fx保留'; // 请替换为您的DeepL API密钥

const url = 'https://api-free.deepl.com/v2/translate'; //目前请求为免费版，非免费版url=https://api.deepl.com/v2/translate

# 留言
本来作者使用cursor搞了一个更加完美的版本，

不仅优化了主进程与渲染进程的关系，更避免了key的明文展示

但由于作者操作失误而至文件死无葬身之地，过往勃勃生机，万物竟发的情景犹在眼前~
