import isHotkey from 'is-hotkey';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact, ReactEditor } from 'slate-react';
import browser from 'webextension-polyfill';
import { FormControl, FormHelperText, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/styles/makeStyles';

import { HOTKEYS, SlateElement, SlateLeaf, toggleMark } from './SlateEditorUtil';
// import { withEmbeds } from './SlateEmbeds';
// import { withLinks } from './SlateLinks';
import { SlateToolBar, HoveringToolBar } from './SlateToolbar';
import { DefaultContext } from 'react-icons';

interface Props {
  initValue: String;
  required: boolean;
  fullWidth: boolean;
  label?: string;
  placeholder?: string;
  textContainerStyle?: any;
  updateNotesMethod:any;
}

export const SlateInputField: React.FunctionComponent<Props> = ({
  initValue,
  required,
  fullWidth,
  placeholder,
  textContainerStyle,
  updateNotesMethod,
  ...props
}) => {
  
  //const [field, meta, helpers] = useField<{}>(props);
  //  const { setValue } = helpers;
  // () => withHistory(withEmbeds(withLinks(withReact(createEditor())))),
  const editor = useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );
 

  browser.storage.sync.get(["noteItDownContext"]).then(function (data) {
    browser.browserAction.setBadgeText({ "text": "" });
    console.log(data.noteItDownContext);
    if (data && data.noteItDownContext && data.noteItDownContext.length > 0) {
      const text = { text: data.noteItDownContext }
      const voidNode = { type: 'paragraph', children: [text] }
      let current_path = editor.selection.anchor.path[0]
      let current_focus = editor.selection.focus.path[0]
      console.log("Path---------->");
      console.log(current_path);
      console.log("Focus------------>");
      console.log(current_focus);
      ReactEditor.focus(editor);
      Transforms.insertNodes(editor, voidNode);
      browser.storage.sync.set({"noteItDownContext":""}).then(function(data){
        console.log("copied text cleared");
      });
    }
  });
 
  let defaultVal = JSON.stringify([
    {
        children: [{ text: '' }],
    }
  ]);
  const classes = useStyles();
  const [slateValue, setSlateValue] = useState(JSON.parse(defaultVal));
  
  useEffect(()=>{
    if(initValue && initValue.length > 0){
      setSlateValue(initValue);
    }
  },[initValue]);
  

  const renderElement = useCallback((props) => <SlateElement {...props} />, []);
  const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, []);
  const updateEditor = (value) => {
    console.log("currentSlateValue");
    console.log(slateValue);
    console.log("props");
    console.log(props);
    setSlateValue(value);
    updateNotesMethod(value);
  }
  //const errorMessage = meta.touched && meta.error ? meta.error : "";
  return (
    <FormControl
      className={classes.formControl}
      //error={"Error"}
      required={required}
      fullWidth={fullWidth}
    >
      {/* <Paper elevation={1} className={classes.paper}> */}
      <Slate
        editor={editor}
        value={slateValue}
        onChange={(value: any) => {
          updateEditor(value)
          //  setValue(JSON.stringify(value));
        }}
      >
        <SlateToolBar />
        {/* <HoveringToolBar/> */}
        <Editable
          id={1}
          renderLeaf={renderLeaf}
          placeholder="Type here or highlight text & press Ctrl + Space"
          renderElement={renderElement}
          onKeyDown={(event: any) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
          style={{ ...textContainerStyle }}
        />
      </Slate>
      {/* <FormHelperText id={`${field.name}-error-text`}>
          {errorMessage}
        </FormHelperText> */}
      {/* </Paper> */}
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));