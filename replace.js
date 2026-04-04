
class RegexHighlightTool {
  constructor({ textarea, highlightLayer = null, searchInput, replaceInput, replaceBtn, flags = null, matchCount = null, output = null, getListBtn=null} = {}) {
    this.textarea = textarea;
    this.highlightLayer = highlightLayer;
    this.searchInput = searchInput;
    this.replaceInput = replaceInput;
    this.replaceBtn = replaceBtn;
    this.matchCount = matchCount;
    this.output = output;
    this.flags = flags;
    this.currentMatches = [];
    this.currentMatchIndex = -1;
    console.log("textarea", this.textarea);
    this.getListBtn = getListBtn;
    this.init();
  }

  init() {
    // Event listeners
    let debouncedSearch = debouncer(this.search.bind(this), 400);

    this.replaceBtn.addEventListener('click', () => this.replaceFunc());
    this.textarea.addEventListener('input', debouncedSearch);
    this.textarea.addEventListener('input', () => {
      this.syncScroll();
    });
    this.textarea.addEventListener('scroll', () => this.syncScroll());
    this.searchInput.addEventListener('input', debouncedSearch);

    this.flags.addEventListener('input', debouncedSearch);


    let debounceGetListSearch = debouncer(this.getListOfSearch.bind(this), 300);
    this.getListBtn.addEventListener('click', debounceGetListSearch);
    // Initial sync

    this.syncScroll();
  }

  getSearchRegex() {
    console.log(this.flags);
    let txt = this.searchInput.value;
    let possibleFlags = "dgimsuvy";
    let para = "gi";
    if (this.flags) {
      let val = this.flags.value;
      if (val.length > 0){
        for(let v of val){
          if(!possibleFlags.includes(v)){
            showSnackBar({
              message:"Enter valid flags",
              type:"danger"
            })
            return [false, null];
          }
        }
        para = val;
      }
    }
    return [true , new RegExp(txt, para)];
  }

  search() {
    const text = this.textarea.value;
    let sRegex = this.getSearchRegex();
    if(!sRegex[0]){
      return;
    }
    let regex = sRegex[1];

    console.log("Searching", regex);
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
  }

  getListOfSearch(){
    this.search();
    let txt = "";
    for(let i = 0; i < this.currentMatches.length; i++){
      txt += this.currentMatches[i].text;
      if(i != this.currentMatches.length - 1){
        txt += '\n';
      }
    }

    this.updateOutput(txt);
  }

  updateHighlights() {
    let text = this.textarea.value;
    if (text.endsWith('\n')) {
      text += '\n'
    }
    let sRegex = this.getSearchRegex();
    if(!sRegex[0]){
      return;
    }
    let regex = sRegex[1];
    console.log("content ", text);

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
      html += `<span class="replaceHighlight">${this.escapeHtml(match[0])}</span>`;

      lastIndex = match.index + match[0].length;

      // Prevent infinite loops for zero-length matches
      if (match[0].length === 0) regex.lastIndex++;
    }

    // Add remaining text
    html += this.escapeHtml(text.substring(lastIndex));
    console.log("ht ", html);
    this.highlightLayer.innerHTML = html || '&nbsp;';
  }

  clearHighlights() {
    this.highlightLayer.innerHTML = '';
    this.currentMatches = [];
    this.currentMatchIndex = -1;
  }

  updateMatchCount() {
    if (!this.matchCount) {
      return;
    }
    const count = this.currentMatches.length;
    if (count > 0) {
      this.matchCount.textContent = `Found ${count} match${count !== 1 ? 'es' : ''}`;
    } else if (this.searchInput.value) {
      this.matchCount.textContent = 'No matches found';
    } else {
      this.matchCount.textContent = '';
    }
  }

  updateOutput(content) {
    if (!this.output) {
      return;
    }

    let outputType = this.output.localName;
    let values = ['textarea', 'input'];
    if (values.includes(outputType.toLowerCase())) {
      this.output.value = content;
    } else {
      this.output.textContent = content;
    }
  }
  replaceFunc() {
    const replaceValue = this.replaceInput.value;
    const txt = this.textarea.value;
    // const regex = this.getSearchRegex();
    let sRegex = this.getSearchRegex();
    if(!sRegex[0]){
      return;
    }
    let regex = sRegex[1];
    let op = txt.replace(regex, replaceValue);
    this.updateOutput(op);
  }
  replaceInPlace() {
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