import {Editor,Transforms} from "slate";
//import {VideoElement} from "./SlateEmbeds";
// import {ImageElement} from "./SlateImage";
import React from "react";
export const HOTKEYS:any = {
    "mod+b":"bold",
    "mod+i":"italic",
    "mod+u":"underline",
    "mod+`":"code"
};

const LIST_TYPES =["numbered-list","bulleted-list"];

export const SlateElement =(props: any) => {
    const {attributes,children,element} =props;
    switch(element.type){
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        // case "image":
        //     return <ImageElement {...props} />
        // case "video":
        //     return <VideoElement {...props}/>
        case "link":
            return(<a {...attributes} href={element.url}>{children}</a>);
        default:
            return <p {...attributes}>{children}</p>
    }
};

export const SlateLeaf =({attributes,children,leaf}:any)=>{
if(leaf.bold){
    children = <strong>{children}</strong>;
}
if(leaf.code) {
    children = <code>{children}</code>;
}
if(leaf.italic) {
    children = <em>{children}</em>;
}
if(leaf.underline) {
    children = <u>{children}</u>;
}

return <span {...attributes}>{children}</span>;
};

export const isBlockActive =(editor: any, format: any) => {
    const [match] = Editor.nodes(editor,{
        match:(n)=>n.type === format
    });
    return !!match;
};

export const toggleBlock = (editor:any, format:any)=>{
const isActive = isBlockActive(editor,format);
const isList = LIST_TYPES.includes(format);

// Transforms.unwrapNodes(editor, {
//     match: (n) => LIST_TYPES.includes(n.type),
//     split: true
//   });
Transforms.setNodes(editor,{type:isActive?"paragraph":isList?"list-item":format});

if(!isActive && isList) {
    const block = {type:format,children:[]};
    Transforms.wrapNodes(editor,block);
}
};

export const isMarkActive = (editor:any,format:any) => {
    const marks = Editor.marks(editor);
    return marks ?marks[format] === true :false;
};

export const toggleMark = (editor:any,format:any) => {
    const isActive = isMarkActive(editor,format);

    if(isActive){
        Editor.removeMark(editor, format);
    }else{
        Editor.addMark(editor, format, true);
    }
};

