console.log("Hello World!!!");

TrelloPowerUp.initialize({
  'card-detail-badges': function(trello, options){
    return [{
      text: 'My Badge',
    }];
  },
});