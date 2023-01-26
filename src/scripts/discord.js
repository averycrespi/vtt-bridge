export function sendMessage(message) {
  chrome.storage.sync.get("discordurl", function (items) {
    if (!chrome.runtime.error) {
      console.debug('Loaded: URL as' + items.discordurl);
      const character = document.querySelector(".character-name").innerText
      const request = new XMLHttpRequest();
      request.open("POST", items.discordurl);

      request.setRequestHeader('Content-type', 'application/json');

      const params = {
        username: "DMZ-Bot",
        avatar_url: "https://github.com/Garemat/vtt-bridge/blob/main/icons/128.png?raw=true",
        content: null, 
        embeds: [
          {
          title: character, 
          description: character + " has made a " + message
        }
        ]
        
      }

      request.send(JSON.stringify(params));
    }
  });
}