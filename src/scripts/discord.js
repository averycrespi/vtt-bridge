export function sendMessage(message) {
    const request = new XMLHttpRequest();
    request.open("POST", "DISCORD WEBOOK URL GOES HERE");

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
      username: "DMZ-Bot",
      avatar_url: "",
      content: message
    }

    request.send(JSON.stringify(params));
  }