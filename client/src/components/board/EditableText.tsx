import React, { useState, useRef, useEffect } from "react";

const EditableInput = (props: any) => {
    const inputRef = useRef(null);
    const [inputVisible, setInputVisible] = useState(false);
    const [text, setText] = useState(props.text);

    function onClickOutSide(e: any) {
        // @ts-ignore
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setInputVisible(false);
        }
    }

    useEffect(() => {
        if (inputVisible) {
            document.addEventListener("mousedown", onClickOutSide);
        }

        return () => {
            document.removeEventListener("mousedown", onClickOutSide);
        };
    });

    return (
        <React.Fragment>
            {inputVisible ? (
                <input
                    ref={inputRef}
                    value={text}
                    onChange={e => {
                        setText(e.target.value);
                    }}
                />
            ) : (
                <span onClick={() => setInputVisible(true)}>{text}</span>
            )}
        </React.Fragment>
    );
};

export default EditableInput;
