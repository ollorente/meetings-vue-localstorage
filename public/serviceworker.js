if (navigator.serviceWorker.controller) {
  console.log("Active service worker found, no need to register");
} else {
  // Register the serviceworker
  navigator.serviceWorker
    .register("serviceworker.js", { scope: "./" })
    .then(function (reg) {
      console.log(`Service worker has been registered ${reg}`);
    });
}
