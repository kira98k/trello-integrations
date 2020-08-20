console.log("Hello World!!!");

TrelloPowerUp.initialize({
  'card-detail-badges': function (trello, options) {
    return [{
      text: 'My Badge',
    }];
  },
  'card-buttons': function (trello, options) {
    return [{
      icon: "./icon.png",
      text: 'Open Popup',
      callback: function () {
        alert("test");
      },
      condition: 'edit'
    }]
  }
});