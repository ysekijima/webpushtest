if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceworker.js', { scope: './' })
    .then(function(reg) {
      console.log('[Page] Service worker registered!');
      // プッシュ通知の購読
      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: window.vapidPublicKey,
      }).then(subscribeSuccess);
    });
}

var subscribeSuccess = function(subscription){
  sub = subscription.toJSON()
  params = {
    subscription: sub
  }

  $.ajax({
    type: 'POST',
    url: '/devices',
    data: params
  });
}
