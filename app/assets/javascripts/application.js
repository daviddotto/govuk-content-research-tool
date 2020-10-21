/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
  contentFeedback = {}
})

var CFObject

function highlight(text, isPositive) {
  var inputText = document.getElementById("contentToTest");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  if (index >= 0) { 
   innerHTML = innerHTML.substring(0,index) + "<span class='content-highlight " + (isPositive ? 'content-highlight-good' : 'content-highlight-bad') + "'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   inputText.innerHTML = innerHTML;
  }
}

function performFormatting() {
  for (phrase of CFObject.feedback.good) {
    highlight(phrase, true)
  }
  for (phrase of CFObject.feedback.bad) {
    highlight(phrase, false)
  }
}

var ContentResearch = {
  feedback : {
    good:[],
    bad: []
  },
  vote: function(selection, isPositive) {
    if (isPositive) {
      this.feedback.good.push(selection)
    } else {
      this.feedback.bad.push(selection)
    }
    performFormatting()
  },
  voteUp: function() {
    var selection = window.getSelection().toString()
    if (selection) {
      this.vote(selection, true)
    }
  },
  voteDown: function() {
    var selection = window.getSelection().toString()
    if (selection) {
      this.vote(selection, false)
    }
  }
}

CFObject = ContentResearch

