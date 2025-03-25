import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor({ content, setContent }) {
    // Load draft from local storage
    useEffect(() => {
        const savedDraft = localStorage.getItem("draftLetter");
        if (savedDraft) setContent(savedDraft);
    }, []);

    // Auto-save to local storage
    useEffect(() => {
        localStorage.setItem("draftLetter", content);
    }, [content]);

    return <ReactQuill theme="snow" value={content} onChange={setContent} />;
}

export default TextEditor;
