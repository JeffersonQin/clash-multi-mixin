module.exports.parse = ({ content, name, url }, { yaml, axios, notify }) => {
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
    'enhanced-mode': 'fake-ip',
    fallback: [],
    'fake-ip-filter': [
        'dns.msftncsi.com',
        'www.msftncsi.com',
        'www.msftconnecttest.com',
    ]
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
  // 自定义 DIRECT / REJECT 条目
  [
    'PROCESS-NAME,qbittorrent.exe,DIRECT',
    'PROCESS-NAME,NeteaseMusic.exe,DIRECT',
    'DOMAIN,clash.razord.top,DIRECT',
    'DOMAIN,yacd.haishan.me,DIRECT',
    'DOMAIN-SUFFIX,msftncsi.com,DIRECT',
    // 'DOMAIN-SUFFIX,cdn.jsdelivr.net,DIRECT',
    // custom 可以删除，用于我的个人用途
    'PROCESS-NAME,ddns.exe,DIRECT',
    'DOMAIN-SUFFIX,home.gyrojeff.moe,DIRECT',
    'DOMAIN-SUFFIX,home.gyrojeff.top,DIRECT',
  ].forEach(rule => {
    content.rules.unshift(rule);
  });
  // 自定义走梯子的条目, 无需写尾部的后缀, 末尾带上逗号
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
    'DOMAIN-SUFFIX,cdn.jsdelivr.net,',
  ]
  
  // 需要对每个 Plan 配置相应的 GroupName
  var proxyGroupName = '';
  
  if (name == '机场1') {
    proxyGroupName = '组1';
  } else if (name == '机场2') {
    proxyGroupName = '组2';
  } else if (name == '机场3') {
    proxyGroupName = '组3';
  }
  // 还可以继续添加

  customProxy.forEach(rule => {
    content.rules.unshift(rule + proxyGroupName);
  });

  // bilibili 港澳台 proxy-group
  content['proxy-groups'].push({
    name: '📺 Bilibili',
    type: 'select',
    proxies: [
      'DIRECT', proxyGroupName
    ]
  });

  content.rules.unshift('DOMAIN-SUFFIX,bilibili.com,📺 Bilibili')
  
  // Debug
  // axios.get('http://localhost:4016/openFile?path=' + yaml.stringify(content));
  
  return content
}
