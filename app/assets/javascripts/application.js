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
	var inputText = document.getElementById('contentToTest')
	var innerHTML = inputText.innerHTML
	inputText.innerHTML = innerHTML.replace(new RegExp(text, 'ig'), function (
		phrase
	) {
		return (
			'<mark class="content-highlight ' +
			(isPositive ? 'content-highlight-good' : 'content-highlight-bad') +
			'">' +
			phrase +
			'</mark>'
		)
	})
}

function performFormatting() {
	$('#contentToTest mark.content-highlight').contents().unwrap()
	CFObject.feedback.good.sort(function (a, b) {
		return b.length - a.length
  })
  CFObject.feedback.bad.sort(function (a, b) {
		return b.length - a.length
	})
	for (phrase of CFObject.feedback.good) {
		highlight(phrase, true)
	}
	for (phrase of CFObject.feedback.bad) {
		highlight(phrase, false)
	}
}

var ContentResearch = {
	feedback: {
		good: [],
		bad: [],
	},
	vote: function (selection, isPositive) {
		var asLines = selection.split('\n')
		asLines = asLines.filter((line) => {
			return line.trim().length > 2
		})
		for (line of asLines) {
			if (isPositive) {
				this.feedback.good.push(line.trim())
			} else {
				this.feedback.bad.push(line.trim())
			}
		}
		performFormatting()
    $('input#export-field').val(JSON.stringify(this.feedback))
	},
	voteUp: function () {
		var selection = window.getSelection().toString()
		if (selection) {
			this.vote(selection.trim(), true)
		}
	},
	voteDown: function () {
		var selection = window.getSelection().toString()
		if (selection) {
			this.vote(selection, false)
		}
	},
}

CFObject = ContentResearch

function removePhrase(phrase) {
	CFObject.feedback.good = CFObject.feedback.good.filter(
		(instance) => instance !== phrase
	)
	CFObject.feedback.bad = CFObject.feedback.bad.filter(
		(instance) => instance !== phrase
	)
}

$(document).on('click', 'mark.content-highlight', function () {
	var phrase = $(this).text()
	removePhrase(phrase)
	performFormatting()
})

var loadedResponses = $('input#export-field').val()

if (loadedResponses.length > 0) {
  CFObject.feedback = JSON.parse(loadedResponses)
  performFormatting()
}
