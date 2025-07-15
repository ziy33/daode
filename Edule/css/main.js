(function() {
  // 如果是登录页就不执行
  if (location.pathname.includes('login.html')) {
    console.log('当前是登录页，不记录');
    return;
  }

  // 从 sessionStorage 拿
  const userId = sessionStorage.getItem('user');
  if (!userId) {
    console.warn('找不到 userId，没法记录');
    return;
  }

  console.log('开始记录阅读时长');
  const loginTime = Date.now();
  const key = 'readingSeconds';

  const interval = setInterval(() => {
    const seconds = Math.floor((Date.now() - loginTime) / 1000);
    sessionStorage.setItem(key, seconds);
    console.log(`当前阅读秒数：${seconds}`);
  }, 5000);

  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
    const seconds = sessionStorage.getItem(key) || 0;

    navigator.sendBeacon('https://srjfaw743ud0.xiaomiqiu.com/登录时间', JSON.stringify({
      user: userId,
      登录时间: parseInt(seconds, 10)
    }));

    sessionStorage.removeItem(key);
  });
})();
