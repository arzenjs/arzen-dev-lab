/**
 * Google Clone — search behaviour
 *
 * Pressing Enter, clicking "Google Search", and clicking "I'm Feeling Lucky"
 * all redirect to Google's real results page. Queries are encoded with
 * URLSearchParams so spaces and special characters are handled correctly.
 */

(function () {
    'use strict';

    var SEARCH_URL = 'https://www.google.com/search';

    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');
    var luckyBtn = document.getElementById('lucky-btn');

    if (!form || !input) return;

    /**
     * Build a Google search URL for a query.
     * @param {string} query  The raw value from the input.
     * @param {boolean} lucky Use "I'm Feeling Lucky" (jump to first result).
     * @returns {string} Fully encoded absolute URL.
     */
    function buildSearchUrl(query, lucky) {
        var params = new URLSearchParams();
        params.set('q', query);            // encodes spaces as "+" and special chars
        if (lucky) {
            params.set('btnI', '1');
        }
        return SEARCH_URL + '?' + params.toString();
    }

    function markEmpty() {
        form.classList.add('is-empty');
        input.focus();
    }

    function clearEmpty() {
        form.classList.remove('is-empty');
    }

    /** Redirect only when the trimmed query is not empty. */
    function go(query, lucky) {
        if (!query.trim()) {
            markEmpty();
            return false;
        }
        // Collapse runs of whitespace, the way Google's own form does,
        // so "React  tutorials" and "React tutorials" behave the same.
        var normalized = query.trim().replace(/\s+/g, ' ');
        window.location.href = buildSearchUrl(normalized, lucky);
        return true;
    }

    // Enter key and the "Google Search" button both submit the form.
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        go(input.value, false);
    });

    if (luckyBtn) {
        luckyBtn.addEventListener('click', function () {
            go(input.value, true);
        });
    }

    input.addEventListener('input', clearEmpty);
})();
