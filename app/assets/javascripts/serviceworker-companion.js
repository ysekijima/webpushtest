if (navigator.serviceWorker) {
  // https://developer.mozilla.org/ja/docs/Web/API/Notification/permission_static
  if (!("Notification" in window)) {
    // ブラウザーが通知に対応しているかどうかをチェックする
    console.log("このブラウザーはデスクトップ通知に対応していません。");
  } else if (Notification.permission === "granted") {
    // 通知の許可が既に得られているかどうかをチェックする
    // されてたら購読させる
    navigator.serviceWorker.register('/serviceworker.js', { scope: './' })
      .then(function(reg) {
        console.log('[Page] Service worker registered!');
        // プッシュ通知の購読
        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: window.vapidPublicKey,
        }).then(subscribeSuccess);
      }).catch(function(error) {
        console.log('Service workerの登録に失敗しました。' + error);
      });

  } else if (Notification.permission !== "denied") {
    // そうでなければ、ユーザーに許可を求める必要がある
    Notification.requestPermission().then((permission) => {
      // ユーザーが許可したら、通知を作成する
      if (permission === "granted") {
        const notification = new Notification("こんにちは！");
        navigator.serviceWorker.register('/serviceworker.js', { scope: './' })
          .then(function(reg) {
            console.log('[Page] Service worker registered!');
            // プッシュ通知の購読
            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: window.vapidPublicKey,
            }).then(subscribeSuccess);
          }).catch(function(error) {
            console.log('Service workerの登録に失敗しました。' + error);
          });
      }
    });
  }
}

var subscribeSuccess = function(subscription){
  let sub = subscription.toJSON();
  let params = {
    subscription: {
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth
    }
  }

  $.ajax({
    type: 'POST',
    url: '/devices',
    data: params
  });
}
