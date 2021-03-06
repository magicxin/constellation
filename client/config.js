/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://cxmubrhr.qcloud.la';
// var host = 'https://784046738.magicx.xyz'

var config = {
    //静态配置
    // avatarkey: 'ff3911e2f31944b6a292daabc7d467c3', 
    avatarkey: 'bef1d4393c894a9f82ec55d4bc179307',
    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,
        //上传星座接口
        uploadConstellation: `${host}/weapp/uploadConstellation`,
        //请求星座接口
        getConstellation: 'https://api.avatardata.cn/Constellation/Query'
    },
    client: {
      getConstellation: `${host}/weapp/getConstellation`,
    }
};

module.exports = config;
