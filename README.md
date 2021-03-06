# clash-multi-mixin

ð è®© Clash ç Mixin åæ¶å¯¹å¤ä¸ªé£æºåºéé

* 2021/10/27 Update: å¢å äº bilibili è§ååæ¢çè§åç»ï¼æ¹ä¾¿æµè§æ¸¯æ¾³å°åå®¹ï¼
* 2022/02/02 Update: å¢å äºä¸åçæ¬ç TUN è¯´æ

## ç¨æ³

æ ¹æ®ä¸é¢ä¸èçè§£ééå½ä¿®æ¹ `mixin.js`ï¼ç¶åå°åå®¹å¤å¶å° `CFW` ç `Profile Mixin` é¨åï¼`Type` éæ© `JavaScript`

## åæ®µåå®¹çè§£é

* éç¨è®¾ç½®ï¼éé TUNãå¦ææ é TUN èæç½å¡ï¼å¯å°æ¬æ®µå é¤ãæ³¨æï¼ä¸åç clash çæ¬æä¸¤ç§éç½®ççæ¬ãåå«ä¸º `mixin-old.js` å `mixin-new.js`ã
  * Old
    ```javascript
    // éç¨è®¾ç½®ï¼éé TUN
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
      // ä½¿ç¨ system éè¦ Clash Premium 2021.05.08 åæ´é«çæ¬
      stack: 'gvisor', 
      // è¯·å¿æ´æ¹
      'dns-hijack': ['198.18.0.2:53'], 
      'auto-route': true,
      // èªå¨æ£æµåºå£ç½å¡
      'auto-detect-interface': true
    };
    ```
  * New:
    ```javascript
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
      // ä½¿ç¨ system éè¦ Clash Premium 2021.05.08 åæ´é«çæ¬
      stack: 'gvisor', 
      // è¯·å¿æ´æ¹
      'dns-hijack': ['198.18.0.2:53'], 
      'auto-route': true,
      // èªå¨æ£æµåºå£ç½å¡
      'auto-detect-interface': true
    };
    ```
* èªå®ä¹ DIRECT (ç´è¿) ãREJECT (æç»è®¿é®) çè§å
  ```javascript
  [
    // ä¸é¢å æ¡æ¯ä¸äºä¾å­
    'PROCESS-NAME,qbittorrent.exe,DIRECT',
    'PROCESS-NAME,NeteaseMusic.exe,DIRECT',
    'DOMAIN,clash.razord.top,DIRECT',
    'DOMAIN,yacd.haishan.me,DIRECT',
    'DOMAIN-SUFFIX,msftncsi.com,DIRECT',
    // 'DOMAIN-SUFFIX,cdn.jsdelivr.net,DIRECT',
    // ä¸é¢çå¯ä»¥å é¤ï¼ç¨äºæçä¸ªäººç¨é
    'PROCESS-NAME,ddns.exe,DIRECT',
    'DOMAIN-SUFFIX,home.gyrojeff.moe,DIRECT',
    'DOMAIN-SUFFIX,home.gyrojeff.top,DIRECT',
  ].forEach(rule => {
    content.rules.unshift(rule);
  });
  ```
* èªå®ä¹èµ°æ¢¯å­çæ¡ç®, æ éåå°¾é¨çåç¼, æ«å°¾å¸¦ä¸éå·
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
	'DOMAIN-SUFFIX,cdn.jsdelivr.net,',
  ]
  ```
* ä¸åæ¹æ¡ï¼å¯¹åºèµ°æ¢¯å­çè§åç»
  ```javascript
  if (name == 'æºåº1') {
    proxyGroupName = 'ç»1';
  } else if (name == 'æºåº2') {
    proxyGroupName = 'ç»2';
  } else if (name == 'æºåº3') {
    proxyGroupName = 'ç»3';
  }
  // è¿å¯ä»¥ç»§ç»­æ·»å 
  ```
* ä¸é¢çåå®¹å¢å äº bilibili è§åç»
  ```javascript
  // bilibili æ¸¯æ¾³å° proxy-group
  content['proxy-groups'].push({
    name: 'ðº Bilibili',
    type: 'select',
    proxies: [
      'DIRECT', proxyGroupName
    ]
  });

  content.rules.unshift('DOMAIN-SUFFIX,bilibili.com,ðº Bilibili')
  ```

## å³äºæºåºååç»å

![](https://cdn.jsdelivr.net/gh/JeffersonQin/blog-asset@latest/usr/picgo/20211023105335.png)

![](https://cdn.jsdelivr.net/gh/JeffersonQin/blog-asset@latest/usr/picgo/20211023105535.png)

## é¾æ¥

è¯¦ç»éç½®æ¹æ³ï¼å¯ä»¥è®¿é®æç[åå®¢](https://gyrojeff.top/index.php/archives/Clash-å¥åä¸ºå®/)
