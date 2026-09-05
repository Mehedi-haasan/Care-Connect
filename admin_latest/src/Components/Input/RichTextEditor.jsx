import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BaseUrl from "../../Constant";

const RichTextEditor = ({
    value,
    onChange,
    placeholder = "Write description here...",
    className = "",
}) => {
    const quillRef = useRef(null);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const imageHandler = async () => {
        const input = document.createElement("input");

        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];

            if (!file) return;

            const editor = quillRef.current?.getEditor();

            if (!editor) return;

            const formData = new FormData();

            formData.append("image_url", file);

            try {
                const res = await fetch(
                    `${BaseUrl}/api/upload/image`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await res.json();

                if (data.success && data.image_url) {
                    const range = editor.getSelection(true);

                    editor.insertEmbed(
                        range.index,
                        "image",
                        data.image_url
                    );

                    editor.setSelection(
                        range.index + 1
                    );
                }
            } catch (error) {
                console.error(
                    "Image upload failed:",
                    error
                );
            }
        };
    };

    useEffect(() => {
        if (!quillRef.current) return;

        const editor = quillRef.current.getEditor();

        const toolbar = editor.getModule("toolbar");

        toolbar?.addHandler(
            "image",
            imageHandler
        );
    }, []);

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "bullet",
                "link",
                "image",
                "video",
            ]}
            placeholder={placeholder}
            className={`bg-white rounded-lg shadow-sm ${className}`}
        />
    );
};

export default RichTextEditor;