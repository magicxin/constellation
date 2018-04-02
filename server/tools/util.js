var http = require("http")
var querystring = require('querystring');

var $ = {
  post: function(params){
    return new Promise((resolve,reject)=>{
      const postData = querystring.stringify(params)
      const options = {
        hostname: params.hostname ? params.hostname : 'localhost',
        path: params.path ? params.path : '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      const req = http.request(options, (res) => {
        // console.log(`状态码: ${res.statusCode}`);
        // console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          // console.log(`响应主体: ${chunk}`);
          resolve(chunk)
        });
        res.on('end', () => {
          // console.log('响应中已无数据。');
        });
      });

      req.on('error', (e) => {
        // console.error(`请求遇到问题: ${e.message}`);
        reject(e.message)
      });
      // 写入数据到请求主体
      req.write(postData);
      req.end();
    })
  }
}
module.exports = $