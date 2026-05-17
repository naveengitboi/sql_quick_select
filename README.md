# SQL Quick Select 🚀

<div align="center">

**A powerful web app for developers to quickly generate SQL queries, manipulate text with regex, and transform data effortlessly.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-0066cc?style=for-the-badge)](https://naveengitboi.github.io/sql_quick_select/)
[![GitHub](https://img.shields.io/badge/GitHub-View_Repo-181717?style=for-the-badge&logo=github)](https://github.com/naveengitboi/sql_quick_select)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Features in Detail](#features-in-detail)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**SQL Quick Select** is a productivity tool designed for developers, database administrators, and data analysts who frequently work with SQL queries and data manipulation. It eliminates the tedious process of manually copying columns from database queries and provides multiple utility functions for:

- Converting CSV data to SQL INSERT/CREATE statements
- Finding and replacing text using regex patterns
- Generating templated code blocks
- Bulk transforming columns
- Real-time syntax highlighting

Whether you're writing SQL queries, manipulating large datasets, or generating boilerplate code, SQL Quick Select makes the process **faster and simpler**.

---

## ✨ Features

### 1. **Regex Replace Tool** 🔄
Find and replace text using powerful regular expressions with real-time highlighting.

- **Pattern Matching**: Use full regex syntax with support for capture groups
- **Real-time Highlighting**: Visual feedback as you type your regex pattern
- **Match Counter**: See how many matches your pattern finds
- **Multiple Replacements**: Replace all matches at once or extract them to a list
- **Custom Flags**: Support for `g`, `i`, `m`, `s`, `u`, `v`, `y`, `d` flags
- **Output Formats**: View results in plaintext, SQL, JavaScript, or C++

### 2. **SQL Query Generator** 📊
Convert CSV/TSV data to SQL CREATE and INSERT statements automatically.

- **CSV/TSV Support**: Paste your data with any delimiter
- **Header Detection**: Automatically detect column names from headers
- **Data Type Selection**: Choose data types for each column (VARCHAR, NUMBER, DATE, TIMESTAMP)
- **Smart Formatting**: Properly quote strings and handle NULL values
- **Customizable Output**: Generate CREATE TABLE and INSERT statements

### 3. **Code Maker** 🏗️
Generate templated code by combining template strings with variables and transformations.

- **Template Creation**: Define reusable templates with placeholders
- **Variable Substitution**: Add multiple variables per template
- **Transformations**: Apply regex replacements inline
- **Batch Generation**: Generate multiple variations at once
- **Custom Separators**: Join outputs with commas, newlines, or custom delimiters

### 4. **Text Utilities** 🛠️
Additional utility functions for quick text manipulation.

- **Copy/Cut to Clipboard**: One-click copy or cut operations
- **Syntax Highlighting**: Real-time code highlighting for multiple languages
- **Rough Pad**: Draft and edit output before copying
- **Snackbar Notifications**: Visual feedback for all actions

### 5. **Regex Comparison** 📋 (Hidden Tab)
Compare regex patterns and analyze their differences.

---

## 🛠️ Technology Stack

| Technology | Purpose | Usage |
|-----------|---------|-------|
| **HTML5** | Markup & Structure | Page layout and semantic structure |
| **CSS3** | Styling & Layout | Grid layouts, animations, dark theme |
| **JavaScript (ES6+)** | Functionality | Core app logic and interactions |
| **Highlight.js** | Syntax Highlighting | Real-time code highlighting |
| **Bootstrap Icons** | Icons | UI icons and buttons |
| **Google Fonts** | Typography | Custom fonts (Space Mono, Google Sans Code) |

**Language Composition:**
- JavaScript: 50.1%
- CSS: 25%
- HTML: 24.9%

---

## 🚀 Getting Started

### Live Demo
Visit the live application: **[https://naveengitboi.github.io/sql_quick_select/](https://naveengitboi.github.io/sql_quick_select/)**

### Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/naveengitboi/sql_quick_select.git
   cd sql_quick_select
   ```

2. **Open in Browser**
   ```bash
   # Using Python's built-in server (Python 3.x)
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   ```

3. **Access the App**
   ```
   http://localhost:8000
   ```

---

## 📚 How to Use

### Tab Navigation
The app has multiple tabs accessible from the top navigation bar. Click any tab to switch between features:

| Tab | Purpose | Best For |
|-----|---------|----------|
| **Regex** | Find & Replace with Regex | Text manipulation and pattern matching |
| **Maker** | Template Code Generator | Bulk code generation |
| **Query** | CSV to SQL Converter | Database operations |
| **Docs** | Documentation | Coming soon! |

---

## 🔍 Features in Detail

### 1. Regex Replace Tool

**How to Use:**
1. Switch to the **"Regex"** tab
2. Paste your text in the textarea
3. Enter a regex pattern (e.g., `\d+` to find numbers)
4. Optionally set flags (default: `gi`)
5. Enter replacement text
6. Click **"Replace"** or **"List"** to see matches

**Example:**
```
Input: "apple123banana456cherry789"
Pattern: \d+
Replacement: [NUM]
Output: "apple[NUM]banana[NUM]cherry[NUM]"
```

**Regex Flags:**
- `g` - Global (find all matches)
- `i` - Case insensitive
- `m` - Multiline
- `s` - Dotall
- `u` - Unicode
- `v` - Unicodeset
- `y` - Sticky
- `d` - Indices

---

### 2. SQL Query Generator

**How to Use:**
1. Switch to the **"Query"** tab
2. Paste your CSV/TSV data
3. Set the delimiter (default: tab)
4. Check "Has Header" if your data includes column names
5. Click **"Generate SQL"**
6. Adjust data types for each column using the dropdowns
7. Copy the generated SQL

**Supported Data Types:**
- **VARCHAR** - Text data (adds quotes)
- **NUMBER** - Numeric data
- **DATE** - Date values
- **TIMESTAMP** - Datetime values

**Example:**
```csv
Name	Age	Salary
John	30	50000
Jane	28	55000
```

**Output:**
```sql
CREATE OR REPLACE TABLE TABLE_NAME(
  NAME VARCHAR,
  AGE NUMBER,
  SALARY NUMBER
);

INSERT INTO TABLE_NAME(NAME,AGE,SALARY)
VALUES
('John',30,50000),
('Jane',28,55000);
```

---

### 3. Code Maker

**How to Use:**
1. Switch to the **"Maker"** tab
2. Define a template with placeholders using `{variableName}`
3. Click **"Add Variable"** to add variable groups
4. For each variable group:
   - Add values (one per line)
   - Add transformations (one per line)
   - Set separators or line breaks
5. Choose join character (comma, newline, etc.)
6. Click **"Make It"** to generate

**Template Example:**
```
async function get{NAME}() {
  return await fetch('/{name}');
}
```

**Variables:**
- Variable 1: `Users\nPosts`
- Variable 2: `users\nposts`

**Transformations:**
- `replace(old,new,flags)` - Apply regex replacement
- `{placeholder}` - Replace placeholder with variable

**Output:**
```javascript
async function getUsers() {
  return await fetch('/users');
}
async function getPosts() {
  return await fetch('/posts');
}
```

---

### 4. Copy & Output Controls

**Copy to Clipboard**
- Click the 📋 copy icon next to "Output" or "Use This as Rough"
- Visual snackbar confirms success

**Cut to Clipboard**
- Click the ✂️ scissors icon to copy and clear the output

**Language Selection**
- Choose output syntax highlighting: Plaintext, SQL, JavaScript, C++

**Rough Pad**
- Edit and draft your output before copying
- Independent from main output

---

## 📁 Project Structure

```
sql_quick_select/
├── index.html          # Main HTML structure
├── app.js              # Tab navigation and event handlers
├── query.js            # SQL Query Generator class
├── maker.js            # Template code maker logic
├── replace.js          # Regex highlight tool class
├── utils.js            # Utility functions (copy, highlight, etc.)
├── styles.css          # Styling and layout
├── cursor-fill.svg     # Cursor icon
└── README.md           # This file
```

### File Responsibilities

| File | Purpose | Key Functions |
|------|---------|---------------|
| **index.html** | Structure & Layout | DOM hierarchy, tab definitions |
| **app.js** | Main Logic | Tab switching, event delegation |
| **query.js** | SQL Generation | `SqlQueryGenerator` class, CSV parsing |
| **maker.js** | Template Generator | Template substitution, variable handling |
| **replace.js** | Regex Tool | `RegexHighlightTool` class, pattern matching |
| **utils.js** | Utilities | Copy/paste, syntax highlighting, helpers |
| **styles.css** | Presentation | Dark theme, layouts, animations |

---

## 🎨 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+X` / `Cmd+X` | Trigger code highlighter on cut |
| `Tab` | Navigate between inputs |
| `Enter` | Submit in input fields |

---

## 🌐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | All features supported |
| Firefox | ✅ Full | All features supported |
| Safari | ✅ Full | All features supported |
| IE 11 | ❌ Not Supported | Uses modern ES6+ features |

---

## 🔧 Advanced Usage

### Custom Regex Patterns

**Extract email addresses:**
```regex
[\w.-]+@[\w.-]+\.\w+
```

**Find SQL column names:**
```regex
(?:SELECT|,)\s*(\w+)
```

**Validate phone numbers:**
```regex
\+?\d{1,3}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}
```

### Data Type Conversion Guide

When generating SQL queries, text values like dates are automatically quoted:

```
Input: "2024-01-15"
If Type = VARCHAR: Output = '2024-01-15'
If Type = DATE: Output = 2024-01-15 (no quotes)
```

### Maker Template Patterns

**Pattern 1: Pluralization**
```
Template: {name} = {Name}
Variable 1: user, admin
Variable 2: User, Admin
Output: user = User, admin = Admin
```

**Pattern 2: URL Generation**
```
Template: /api/{endpoint}/{id}
Variable 1: users, posts, comments
Output: /api/users/..., /api/posts/..., /api/comments/...
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Regex not matching | Check flag settings, ensure pattern is valid |
| CSV not parsing | Verify delimiter matches your data (tab, comma, etc.) |
| Output not copying | Ensure browser allows clipboard access (HTTPS or localhost) |
| Slow with large data | Process data in smaller chunks |
| Syntax highlighting breaks | Clear browser cache or try different language |

---

## 🚀 Features Coming Soon

- ✅ Documentation tab with built-in help
- ✅ Export to file (SQL, JSON, CSV)
- ✅ Import from file
- ✅ Saved templates/presets
- ✅ Regex pattern library
- ✅ Dark/Light theme toggle
- ✅ Keyboard shortcuts guide
- ✅ Offline support (PWA)

---

## 📝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** with clear commit messages
4. **Push to your branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request** with a description of your changes

### Development Guidelines

- Keep code modular and well-commented
- Follow existing code style (Airbnb JavaScript style)
- Test new features thoroughly
- Update README if adding new features
- Ensure dark theme compatibility

---

## 📧 Support & Contact

Have questions or suggestions? You can:

- 📝 **Create an Issue** on GitHub
- 👤 **Visit the Author**: [@naveengitboi](https://github.com/naveengitboi)
- 🌐 **Try the Live Demo**: [https://naveengitboi.github.io/sql_quick_select/](https://naveengitboi.github.io/sql_quick_select/)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Highlight.js** - For amazing syntax highlighting
- **Bootstrap Icons** - For beautiful icons
- **Google Fonts** - For elegant typography
- All contributors and users who provide feedback

---

<div align="center">

**Made with ❤️ by [Naveen](https://github.com/naveengitboi)**

⭐ If you find this useful, please consider giving it a star!

[GitHub](https://github.com/naveengitboi/sql_quick_select) • [Live Demo](https://naveengitboi.github.io/sql_quick_select/) • [Report Bug](https://github.com/naveengitboi/sql_quick_select/issues) • [Request Feature](https://github.com/naveengitboi/sql_quick_select/issues)

</div>
