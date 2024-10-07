import React, { useState } from 'react';

export default function TextForm(props) {
    // Convert text to uppercase
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success");
    };

    // Convert text to lowercase
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    };

    // Clear text
    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text cleared!", "success");
    };

    // Copy text
    const handleCopy = () => {
        var textArea = document.getElementById("MyBox");
        textArea.select();
        navigator.clipboard.writeText(textArea.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Text copied", "success");
    };

    // Remove extra spaces
    const handleExtraSpace = () => {
        let newText = text.split(/[ ]+/).join(" ");
        setText(newText);
        props.showAlert("Extra spaces removed!", "success");
    };

    // Extract links
    const handleExtractLinks = () => {
        let links = text.match(/(https?:\/\/[^\s]+)/g);
        setText(links ? links.join("\n") : "No links found");
        props.showAlert("Links extracted", "success");
    };

    // Convert text to ASCII
    const handleConvertToAscii = () => {
        let asciiText = text.split('').map(char => char.charCodeAt(0)).join(' ');
        setText(asciiText);
        props.showAlert("Converted to ASCII", "success");
    };

    // Extract numbers
    const handleExtractNumbers = () => {
        let numbers = text.match(/\d+/g);
        setText(numbers ? numbers.join(' ') : "No numbers found");
        props.showAlert("Numbers extracted", "success");
    };

    // Extract vowels
    const handleExtractVowels = () => {
        let vowels = text.match(/[aeiouAEIOU]/g);
        setText(vowels ? vowels.join('') : "No vowels found");
        props.showAlert("Vowels extracted", "success");
    };

    // Extract code snippets (text within backticks)
    const handleExtractCodeSnippets = () => {
        let snippets = text.match(/`(.*?)`/g);
        setText(snippets ? snippets.join("\n") : "No code snippets found");
        props.showAlert("Code snippets extracted", "success");
    };

    // AI: Summarize Text
    const handleSummarizeText = () => {
        let words = text.split(/\s+/).filter(word => word.length > 0);
        let summary = words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
        setText(summary);
        props.showAlert("Text summarized", "success");
    };

    // AI: Analyze Sentiment
    const handleAnalyzeSentiment = () => {
        let positiveWords = ['happy', 'good', 'great', 'awesome', 'excellent'];
        let negativeWords = ['sad', 'bad', 'terrible', 'awful', 'poor'];

        let sentimentScore = 0;
        text.split(/\s+/).forEach(word => {
            if (positiveWords.includes(word.toLowerCase())) sentimentScore++;
            if (negativeWords.includes(word.toLowerCase())) sentimentScore--;
        });

        let sentiment = sentimentScore > 0 ? "Positive" : sentimentScore < 0 ? "Negative" : "Neutral";
        props.showAlert(`Sentiment: ${sentiment}`, "success");
    };

    // AI: Generate Random Sentence
    const handleGenerateSentence = () => {
        let randomSentences = [
            "The quick brown fox jumps over the lazy dog.",
            "AI is transforming the world one step at a time.",
            "React is a powerful library for building UI.",
            "Coding is both fun and challenging."
        ];
        let randomSentence = randomSentences[Math.floor(Math.random() * randomSentences.length)];
        setText(text + " " + randomSentence);
        props.showAlert("Random sentence added", "success");
    };

    // AI: Check for Palindrome
    const handleCheckPalindrome = () => {
        let cleanText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let isPalindrome = cleanText === cleanText.split('').reverse().join('');
        props.showAlert(isPalindrome ? "Text is a palindrome" : "Text is not a palindrome", "success");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const [text, setText] = useState('');

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#103f83' }}>
                <h1 className='my-4'>{props.heading}</h1>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                        style={{
                            backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
                            color: props.mode === 'dark' ? 'white' : '#103f83'
                        }}
                        id="MyBox"
                        rows="8"
                    ></textarea>
                </div>    
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpace}>Remove Extra Spaces</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtractLinks}>Extract Links</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleConvertToAscii}>Convert to ASCII</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtractNumbers}>Extract Numbers</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtractVowels}>Extract Vowels</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtractCodeSnippets}>Extract Code Snippets</button>

                {/* AI-powered buttons */}
                <button disabled={text.length===0} className="btn btn-success mx-1 my-1" onClick={handleSummarizeText}>Summarize Text</button>
                <button disabled={text.length===0} className="btn btn-success mx-1 my-1" onClick={handleAnalyzeSentiment}>Analyze Sentiment</button>
                <button className="btn btn-success mx-1 my-1" onClick={handleGenerateSentence}>Generate Random Sentence</button>
                <button disabled={text.length===0} className="btn btn-success mx-1 my-1" onClick={handleCheckPalindrome}>Check Palindrome</button>
            </div>
            <div className="container mb-3" style={{ color: props.mode === 'dark' ? 'white' : '#103f83' }}>
                <h2>Your Text Summary</h2>
                <p>{text.split(/\s+/).filter((word) => word.length > 0).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(/\s+/).filter((word) => word.length > 0).length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    );
}




