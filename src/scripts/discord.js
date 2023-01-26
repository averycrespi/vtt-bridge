export function sendMessage(message) {
  chrome.storage.sync.get("discordurl", function (items) {
    if (!chrome.runtime.error) {
      console.debug('Loaded: URL as' + items.discordurl);

      const request = new XMLHttpRequest();
      request.open("POST", items.discordurl);

      request.setRequestHeader('Content-type', 'application/json');

      const params = {
        username: "DMZ-Bot",
        avatar_url: "",
        content: message
      }

      request.send(JSON.stringify(params));
    }
  });
}