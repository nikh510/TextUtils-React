import React, { useState } from 'react';

export default function TextForm(props) {
    const handleUpClick = () => {
        console.log("Uppercase was clicked: " + text);
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("converted to uppercase!", "sucess");
    };

    const handleLoClick = () => {
        console.log("Lowercase was clicked: " + text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("converted to lowercase!", "sucess");
    };

    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text cleared!", "sucess");
    };

    const handleCopy = () => {
        console.log("Text copied");
        var textArea = document.getElementById("MyBox");
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(textArea.value);
        document.getSelection().removeAllRanges();
        props.showAlert("text copied", "sucess"); 
    };

    const handleExtraSpace = () => {
        let newText = text.split(/[ ]+/).join(" ");
        setText(newText);
        props.showAlert("removed extra space !", "sucess");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const [text, setText] = useState('');

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#103f83' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                        style={{
                            backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
                            color: props.mode === 'dark' ? 'white' : '#103f83'
                        }}
                        id="MyBox"
                        rows="8"
                    ></textarea>
                </div>    
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleClearClick}>Clear Text</button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy Text</button>
                <button className="btn btn-primary mx-1" onClick={handleExtraSpace}>Remove Extra Spaces</button>
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



