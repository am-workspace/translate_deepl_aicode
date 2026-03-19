# translate_deepl_aicode
自用翻译小插件，使用deepl的api接口，ai编写的代码

# 使用事项
在main-window.html文件中
312-313行
将自己的deepl-api-key更改保存即可

# 如下
const apiKey = 'YOUR_DEEPL_API_KEY,注意:免费版:fx保留'; // 请替换为您的DeepL API密钥
const url = 'https://api-free.deepl.com/v2/translate';//目前请求为免费版，非免费版url=https://api.deepl.com/v2/translate
