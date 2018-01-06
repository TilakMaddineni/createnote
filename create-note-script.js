---
---

(function() {

if ( window.hoveringNote || window.top !== window || document.location.pathname === '/greasemonkey/create-note/create-note-iframe.html' ) {
	return;
}

window.hoveringNoteLoad = true;
window.hoveringNoteDebug = {{ site.debug }};
var hoveringNoteWindow = {};
var getType = {};

// Shallow clone of window to blackbox loaded scripts like jQuery
for ( var thing in window ) {
	if ( window[thing] && getType.toString.call(window[thing]) === '[object Function]' ) {
		hoveringNoteWindow[thing] = (function(thing) {
			return function() {
				return window[thing].apply(window, arguments);
			};
		})(thing);
	} else {
		hoveringNoteWindow[thing] = window[thing];
	}
}

{% include js/create-note-shared.min.js %}

{% include js/create-note.min.js %}

/* in case a site defines define and define.amd, it breaks showdown */
;(function(window, define) {
	{% include js/vendor/jquery.js %}
	{% include js/vendor/showdown.js %}
	var showdown = hoveringNoteWindow.showdown;
	{% include js/showdown-checkbox.min.js %}
	{% include js/create-note-setup.min.js %}
}).call(hoveringNoteWindow, hoveringNoteWindow);

window.hoveringNote.load(window, hoveringNoteWindow.jQuery, hoveringNoteWindow.md, window.hoveringNote.debug);

window.hoveringNote.main();

})();