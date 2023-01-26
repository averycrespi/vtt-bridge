// Saves options to chrome.storage
function save_options() {
    var discordurl = document.getElementById('discordurl').value;
    chrome.storage.sync.set({
      discordurl: discordurl
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      console.debug('Saved as: ' + discordurl);
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
        discordurl: ''
    }, function(items) {
      document.getElementById('discordurl').value = items.discordurl;
      console.debug('Loaded: ' + discordurl);
    });
  }


  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',save_options);