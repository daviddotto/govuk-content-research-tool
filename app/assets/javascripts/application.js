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
   innerHTML = innerHTML.substring(0,index) + "<mark class='content-highlight " + (isPositive ? 'content-highlight-good' : 'content-highlight-bad') + "'>" + innerHTML.substring(index,index+text.length) + "</mark>" + innerHTML.substring(index + text.length);
   inputText.innerHTML = innerHTML;
  }
}

function performFormatting() {
  $('#contentToTest mark.content-highlight').contents().unwrap()
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
    var asLines = selection.split('\n');
    asLines = asLines.filter(line => { return line.trim().length != 0 })
    for (line of asLines) {
      if (isPositive) {
        this.feedback.good.push(line.trim())
      } else {
        this.feedback.bad.push(line.trim())
      }
    }
    performFormatting()
    console.log(this.feedback)
  },
  voteUp: function() {
    var selection = window.getSelection().toString()
    if (selection) {
      this.vote(selection.trim(), true)
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

function removePhrase(phrase) {
  CFObject.feedback.good = CFObject.feedback.good.filter(instance => instance !== phrase)
  CFObject.feedback.bad = CFObject.feedback.bad.filter(instance => instance !== phrase)
}

$(document).on('click', 'mark.content-highlight', function() {
  var phrase = $(this).text()
  removePhrase(phrase)
  performFormatting()
})

