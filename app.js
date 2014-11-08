var canvas  = document.querySelector("canvas"), peerCount = 0;

canvas.width  = 500;
canvas.height = 500;

function initReceiver() {
  window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  var appConfig = new cast.receiver.CastReceiverManager.Config();

  appConfig.statusText = 'Ready to play';
  appConfig.maxInactivity = 6000;

  window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:de.geekonaut.picmosaic');
  window.castReceiverManager.start(appConfig);

  window.castReceiverManager.onReady = function(event) {
    console.log('Received Ready event: ' + JSON.stringify(event.data));
    window.castReceiverManager.setApplicationState("Application status is ready...");
  };

  window.castReceiverManager.onSenderConnected = function(event) {
    console.log('Received Sender Connected event: ' + event.data);
    console.log(window.castReceiverManager.getSender(event.data).userAgent);
  };
}

function initPeerSession() {
  var peer = new Peer({key: '7nxxqfxzhestt9'});
  window.peer = peer;

  peer.on('open', function(id) {
    qr.canvas({
      canvas: canvas,
      value: 'http://avgp.github.io/cast-photo-demo/takepic.html#' + id
    });
  });

  peer.on('connection', function(c) {
//    window.messageBus.broadcast((++peerCount) + '');
    c.on('data', function(data) {
      var img = new Image();
      img.src = data;
      document.getElementById("mosaic").appendChild(img);
    });
  });
}

window.onload = function() {
//  initReceiver();
  initPeerSession();
};
