# clash-multi-mixin

🚀 让 Clash 的 Mixin 同时对多个飞机场适配

## 各段内容的解释

* 通用设置，适配 TUN。如果无需 TUN 虚拟网卡，可将本段删除
  ```javascript
  // 通用设置，适配 TUN
  content['port'] = 7890;
  content['socks-port'] = 7891;
  content['allow-lan'] = true;
  content.dns = {
    enable: true,
    nameserver: [
    '223.5.5.5',
    '223.6.6.6'
    ],
    'enhanced-mode': 'redir-host'
  };
  content.tun = {
    enable: true,
    // 使用 system 需要 Clash Premium 2021.05.08 及更高版本
    stack: 'gvisor', 
    // 请勿更改
    'dns-hijack': ['198.18.0.2:53'], 
    'auto-route': true,
    // 自动检测出口网卡
    'auto-detect-interface': true
  };
  ```
* 自定义 DIRECT (直连) 、REJECT (拒绝访问) 的规则
  ```javascript
  [
    // 下面几条是一些例子
    'PROCESS-NAME,qbittorrent.exe,DIRECT',
    'PROCESS-NAME,NeteaseMusic.exe,DIRECT',
    'DOMAIN,clash.razord.top,DIRECT',
    'DOMAIN,yacd.haishan.me,DIRECT',
    'DOMAIN-SUFFIX,msftncsi.com,DIRECT',
    'DOMAIN-SUFFIX,cdn.jsdelivr.net,DIRECT',
    // 下面的可以删除，用于我的个人用途
    'PROCESS-NAME,ddns.exe,DIRECT',
    'DOMAIN-SUFFIX,home.gyrojeff.moe,DIRECT',
    'DOMAIN-SUFFIX,home.gyrojeff.top,DIRECT',
  ].forEach(rule => {
    content.rules.unshift(rule);
  });
  ```
* 自定义走梯子的条目, 无需写尾部的后缀, 末尾带上逗号
  ```javascript
  const customProxy = [
    'DOMAIN-SUFFIX,live.com,',
    'DOMAIN-SUFFIX,live.net,',
    'DOMAIN-SUFFIX,office.com,',
    'DOMAIN-SUFFIX,office.net,',
    'DOMAIN-SUFFIX,sharepoint.com,',
    'DOMAIN-SUFFIX,office365.com,',
    'DOMAIN-SUFFIX,officeppe.net,',
    'DOMAIN-SUFFIX,skype.com,',
    'DOMAIN-SUFFIX,onedrive.com,',
    'DOMAIN-SUFFIX,msocsp.com,',
    'DOMAIN-SUFFIX,msauthimages.net,',
    'DOMAIN-SUFFIX,msauth.net,',
    'DOMAIN-SUFFIX,microsoftonline.com,',
    'DOMAIN-SUFFIX,msn.com,',
    'DOMAIN-SUFFIX,onenote.com,',
    'DOMAIN-SUFFIX,onenote.net,',
    'DOMAIN-SUFFIX,1drv.com,',
    'DOMAIN-SUFFIX,cdn.v2ex.com,',
  ]
  ```
* 不同方案，对应走梯子的规则组
  ```javascript
  if (name == '机场1') {
    proxyGroupName = '组1';
  } else if (name == '机场2') {
    proxyGroupName = '组2';
  } else if (name == '机场3') {
    proxyGroupName = '组3';
  }
  // 还可以继续添加
  ```

## 链接

详细配置方法，可以访问我的[博客](https://gyrojeff.top/index.php/archives/Clash-入土为安/)
