import isHotkey from 'is-hotkey';
import React, { useCallback, useMemo, useState, useRef } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact, useSlate } from 'slate-react';
import browser from 'webextension-polyfill';
import { FormControl, FormHelperText, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/styles/makeStyles';

import { HOTKEYS, SlateElement, SlateLeaf, toggleMark } from './SlateEditorUtil';
// import { withEmbeds } from './SlateEmbeds';
// import { withLinks } from './SlateLinks';
import { SlateToolBar,HoveringToolBar } from './SlateToolbar';

interface Props {
  initValue: [
    {
        children: [{ text: '' }],
    }
]
  required: boolean;
  fullWidth: boolean;
  label?: string;
  placeholder?: string;
  textContainerStyle?: any;
}

export const SlateInputField: React.FunctionComponent<Props> = ({
  initValue,
  required,
  fullWidth,
  placeholder,
  textContainerStyle,
  ...props
}) => {
  //const [field, meta, helpers] = useField<{}>(props);
//  const { setValue } = helpers;
// () => withHistory(withEmbeds(withLinks(withReact(createEditor())))),

  //  browser.storage.sync.get(["noteItDownContext"]).then(function(data){
  //   //browser.browserAction.getBadgeBackgroundColor({"color":"#FFFFFF"});
  //   browser.browserAction.setBadgeText({"text":""});
  //   console.log(data.noteItDownContext);
  //   setSlateValue([{
  //         children: [{ text: data.noteItDownContext }],
  //     }
  //   ])
  // });

  const classes = useStyles();
  const [slateValue, setSlateValue] = useState(JSON.parse(initValue));
  const editor = useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );

  const renderElement = useCallback((props) => <SlateElement {...props} />, []);
  const renderLeaf = useCallback((props) => <SlateLeaf {...props} />, []);

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
            setSlateValue(value);
          //  setValue(JSON.stringify(value));
          }}
        >
          <SlateToolBar />
          {/* <HoveringToolBar/> */}
          <Editable
            id= {1}
            renderLeaf={renderLeaf}
            placeholder="Type something or highlight text and press Ctrl + Space"
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
  formControl: {
    marginBottom: theme.spacing(5),
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "red",
  },
  paper: {
    border: `2px solid ${theme.palette.divider}`,
  },
}));