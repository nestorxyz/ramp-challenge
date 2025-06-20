import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

/*
Script to extract the hidden URL:
grep -o '<b class="ramp ref"[^>]*value="[^"]*"' challenge.html | grep -o 'value="[^"]*"' | cut -d'"' -f2 | tr -d '\n'

This beautiful one-liner:
1. Finds all <b class="ramp ref"> elements with value attributes
2. Extracts just the value="..." parts  
3. Cuts out the actual values between quotes
4. Joins them into one continuous string

Result: https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/64656c
Flag: delight
*/

function FlagDisplay() {
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState('');
  const [visibleChars, setVisibleChars] = useState([]);

  // Hidden URL extracted from the challenge
  const hiddenUrl =
    'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/64656c';

  // Fetch the flag
  useEffect(() => {
    const fetchFlag = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(hiddenUrl);
        const flagText = await response.text();

        // Clean the flag text and remove quotes
        let cleanFlag = flagText.trim();
        // Remove surrounding quotes if they exist
        if (cleanFlag.startsWith('"') && cleanFlag.endsWith('"')) {
          cleanFlag = cleanFlag.slice(1, -1);
        }

        setFlag(cleanFlag);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching flag:', error);
        setIsLoading(false);
      }
    };

    fetchFlag();
  }, []);

  // Start typewriter animation when flag is loaded
  useEffect(() => {
    if (!flag || isLoading) return;

    const characters = flag.split('');

    // Start showing nothing as per challenge requirement
    setVisibleChars([]);

    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < characters.length) {
        const charToAdd = characters[currentIndex];
        setVisibleChars((prev) => [...prev, charToAdd]);
        currentIndex++;
        setTimeout(typeNextChar, 500); // Half second delay between each character
      }
    };

    // Start the first character after 500ms delay
    setTimeout(typeNextChar, 500);
  }, [flag, isLoading]);

  if (isLoading) {
    return React.createElement('div', null, 'Loading...');
  }

  // Render flag as a list where each character is a list item
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Ramp Challenge Flag'),
    React.createElement(
      'ul',
      null,
      visibleChars.map((char, index) =>
        React.createElement('li', { key: index }, char)
      )
    )
  );
}

// Mount the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(FlagDisplay));
