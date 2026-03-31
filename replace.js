class Highlighter{
    constructor(textArea, hightlightLayer, searchValue, replaceValue){
        this.tArea  = textArea;
        this.hLayer = hightlightLayer;
        this.searchValue = searchValue;
        this.replaceValue = replaceValue;
    }

}


class ReplaceTool {
    constructor(content, old_value, new_value, params, isReplace=false, extraInputs=false, 
        textArea, hightlightLayer, searchBtn, replaceBtn) {
        this.content = content; // only contents not containers or divs 
        this.params = this.#getParams(params);
        this.pattern = this.#getRegexPattern(old_value);
        this.newValue = new_value;
        this.isReplace = isReplace;
        this.extraInputs = extraInputs;
        this.currentMatches = [];
        this.currentMatchIndex = -1;
        if(this.extraInputs){ // like containers
            this.tArea  = textArea;
            this.hLayer = hightlightLayer;
            this.searchBtn = searchBtn;
            this.replaceBtn = replaceBtn;
            this.init();
        }
    }
    #getParams(params){
        if(params.length == 0) return "gi";
        return params;
    }
    #getRegexPattern(value){
        if(value.length == 0){
            showSnackBar(
                (message = `Please! Enter what you want to ${this.isReplace?'replace':'search'}`),
                (icon = ""),
                (type = "danger")
                );
            return null;
        }
        return RegExp(value, this.params);
    }
    init() {
        // Event listeners
        this.searchBtn.addEventListener('click', () => this.search());
        this.replaceBtn.addEventListener('click', () => this.replace());
        this.textarea.addEventListener('input', () => this.syncScroll());
        this.textarea.addEventListener('scroll', () => this.syncScroll());
        this.searchInput.addEventListener('input', () => this.search());

        // Initial sync
        this.syncScroll();
    }
    getSearchRegex() {
        let pattern = this.searchInput.value;

        if (!pattern) return null;

        try {
            if (this.regexMode.checked) {
                // User is providing a regex pattern directly
                return new RegExp(pattern, 'g' + (this.caseSensitive.checked ? '' : 'i'));
            }else {
                // Escape special regex characters for literal search
                const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                return new RegExp(escapedPattern, 'g' + (this.caseSensitive.checked ? '' : 'i'));
            }
        } catch (error) {
            console.error('Invalid regex pattern:', error);
            return null;
        }
    }

    search() {

        if (!regex || !this.searchInput.value) {
            this.clearHighlights();
            this.matchCount.textContent = '';
            return;
        }

        // Find all matches
        const matches = [];
        let match;

        // Reset regex lastIndex
        regex.lastIndex = 0;

        while ((match = regex.exec(text)) !== null) {
            matches.push({
                start: match.index,
                end: match.index + match[0].length,
                text: match[0]
            });

            // Prevent infinite loops for zero-length matches
            if (match[0].length === 0) regex.lastIndex++;
        }

        this.currentMatches = matches;
        this.currentMatchIndex = matches.length > 0 ? 0 : -1;

        this.updateHighlights();
        this.updateMatchCount();

        // Scroll to first match if available
        if (matches.length > 0) {
            this.scrollToMatch(0);
        }
    }

    updateHighlights() {
        const text = this.textarea.value;
        const regex = this.getSearchRegex();

        if (!regex || !this.searchInput.value) {
            this.highlightLayer.innerHTML = '';
            return;
        }

        // Create highlighted HTML
        let html = '';
        let lastIndex = 0;
        let match;

        // Reset regex lastIndex
        regex.lastIndex = 0;

        while ((match = regex.exec(text)) !== null) {
            // Add text before match
            html += this.escapeHtml(text.substring(lastIndex, match.index));

            // Add highlighted match
            html += `<span class="highlight">${this.escapeHtml(match[0])}</span>`;

            lastIndex = match.index + match[0].length;

            // Prevent infinite loops for zero-length matches
            if (match[0].length === 0) regex.lastIndex++;
        }

        // Add remaining text
        html += this.escapeHtml(text.substring(lastIndex));

        this.highlightLayer.innerHTML = html || '&nbsp;';
    }

    clearHighlights() {
        this.highlightLayer.innerHTML = '';
        this.currentMatches = [];
        this.currentMatchIndex = -1;
    }

    updateMatchCount() {
        const count = this.currentMatches.length;
        if (count > 0) {
            this.matchCount.textContent = `Found ${count} match${count !== 1 ? 'es' : ''}`;
        } else if (this.searchInput.value) {
            this.matchCount.textContent = 'No matches found';
        } else {
            this.matchCount.textContent = '';
        }
    }

    scrollToMatch(index) {
        if (index < 0 || index >= this.currentMatches.length) return;

        const match = this.currentMatches[index];

        // Create a temporary div to measure text position
        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = window.getComputedStyle(this.textarea);
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.height = 'auto';
        tempDiv.style.width = this.textarea.clientWidth + 'px';
        tempDiv.style.whiteSpace = 'pre-wrap';
        tempDiv.style.wordWrap = 'break-word';
        tempDiv.textContent = this.textarea.value.substring(0, match.start);

        document.body.appendChild(tempDiv);

        // Calculate line height and scroll position
        const lineHeight = parseInt(window.getComputedStyle(this.textarea).lineHeight);
        const lines = Math.floor(tempDiv.clientHeight / lineHeight);
        const scrollPosition = lines * lineHeight;

        document.body.removeChild(tempDiv);

        // Scroll to the match
        this.textarea.scrollTop = scrollPosition;

        // Optional: Add a temporary highlight effect to the current match
        this.highlightCurrentMatch(index);
    }

    highlightCurrentMatch(index) {
        // Remove previous current match highlight
        const allHighlights = this.highlightLayer.querySelectorAll('.highlight');
        allHighlights.forEach(el => el.classList.remove('current-match'));

        // Add highlight to current match
        if (index >= 0 && index < allHighlights.length) {
            allHighlights[index].classList.add('current-match');

            // Add CSS for current match
            if (!document.querySelector('#currentMatchStyle')) {
                const style = document.createElement('style');
                style.id = 'currentMatchStyle';
                style.textContent = `
          .highlight.current-match {
            background-color: orange;
            outline: 2px solid darkorange;
          }
        `;
                document.head.appendChild(style);
            }
        }
    }

    replace() {
        if (this.currentMatches.length === 0) {
            this.search();
            if (this.currentMatches.length === 0) return;
        }

        const replaceValue = this.replaceInput.value;
        let newText = this.textarea.value;
        let offset = 0;

        // Replace from end to beginning to maintain correct indices
        for (let i = this.currentMatches.length - 1; i >= 0; i--) {
            const match = this.currentMatches[i];
            const before = newText.substring(0, match.start);
            const after = newText.substring(match.end);
            newText = before + replaceValue + after;
        }

        this.textarea.value = newText;

        // Re-search after replacement
        this.search();
    }

    replaceAll() {
        const regex = this.getSearchRegex();
        if (!regex) return;

        const replaceValue = this.replaceInput.value;
        const newText = this.textarea.value.replace(regex, replaceValue);

        this.textarea.value = newText;
        this.search();
    }

    syncScroll() {
        this.highlightLayer.scrollTop = this.textarea.scrollTop;
        this.highlightLayer.scrollLeft = this.textarea.scrollLeft;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the tool when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RegexHighlightTool();
});