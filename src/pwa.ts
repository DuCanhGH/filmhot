import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    // do nothing.
  },
  onOfflineReady() {
    console.log("Offline mode is now ready.");
  },
});
