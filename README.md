# Ramp Challenge Solution

This project solves the Ramp Frontend Challenge by extracting a hidden URL from HTML and displaying the flag with a typewriter effect in React.

## Solution Overview

### Step 1: Extract Hidden URL

The challenge requires finding a hidden URL within HTML by following a specific DOM pattern:

- `<section data-id="92*">`
- `<article data-class="*45">`
- `<div data-tag="*785*">`
- `<b class="ref" value="VALID_CHARACTER">`

**Extracted URL:** `https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/64656c`

**Flag:** `delight`

### Step 2: React Application

The React app:

- Fetches the flag from the hidden URL
- Shows "Loading..." during the request
- Displays the flag with a typewriter effect (500ms delay between characters)
- Renders each character as a list item
- Uses only React APIs (no external libraries or CSS)

## Files

- `src/App.jsx` - Main React component with typewriter effect and extraction script in comments
- `challenge.html` - Original HTML from the challenge URL for reference
- `package.json` - Project dependencies
- `index.html` - HTML entry point

## Running the Application

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The app will automatically open in your browser and display the flag with the typewriter animation.

## Extraction Command

The URL was extracted using this elegant one-liner:

```bash
grep -o '<b class="ramp ref"[^>]*value="[^"]*"' challenge.html | grep -o 'value="[^"]*"' | cut -d'"' -f2 | tr -d '\n'
```

This command:

1. Finds all `<b>` elements with `class="ref"` (not "ref0")
2. Extracts their `value` attributes
3. Joins them to form the hidden URL

## Final Answer Format

**Flag:** `delight`
**CodeSandbox Link:** [Upload the project to CodeSandbox and insert link here]

Format: `delight - [CodeSandbox Link]`
# ramp-challenge
