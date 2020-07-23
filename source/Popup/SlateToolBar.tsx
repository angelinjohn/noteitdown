import React,{useEffect, useState} from 'react';
import { FaBold, FaCode, FaItalic, FaUnderline } from 'react-icons/fa';
import {
    MdFormatListNumbered, MdFormatQuote, MdImage, MdList, MdLooksOne, MdLooksTwo, MdOndemandVideo
} from 'react-icons/md';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './SlateEditorUtil';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, withStyles,createMuiTheme} from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// import { InsertVideoButton } from './SlateEmbeds';
// import { InsertImageButton } from './SlateImage';

const BlockButton = ({ format, icon }:any) => {
const editor = useSlate();
return (<ToggleButton
value = {format}
selected ={isBlockActive(editor,format)}
onMouseDown={(event: any)=>{
    event.preventDefault();
    toggleBlock(editor, format);
}}
>{icon}</ToggleButton>)
};

const MarkButton = ({format,icon}:any)=> {
    const editor = useSlate();
    return(
        <ToggleButton
        value={format}
        selected={isMarkActive(editor,format)}
        onMouseDown={(event:any)=>{
            event.preventDefault();
            toggleMark(editor,format);
        }}>{icon}</ToggleButton>
    )
}

export const SlateToolBar = () => {
    const classes = useStyles();
    return(
        <Paper elevation={2} className={classes.paper}>
            <StyledToggleButtonGroup size="small" arial-label="text formatting">
             {MarkButton({format:"bold",icon:<FaBold size={12}/>})}
             {MarkButton({format:"italic",icon:<FaItalic size={12}/>})}
             {MarkButton({format:"underline",icon:<FaUnderline size={12}/>})}
             {MarkButton({format:"code",icon:<FaCode size={14}/>})}
            </StyledToggleButtonGroup>
            <Divider orientation="vertical" className={classes.divider} />
      <StyledToggleButtonGroup
        size="small"
        arial-label="text formatting"
        exclusive
      >
        {BlockButton({ format: "heading-one", icon: <MdLooksOne size={18} /> })}
        {BlockButton({ format: "heading-two", icon: <MdLooksTwo size={18} /> })}
        {BlockButton({
          format: "block-quote",
          icon: <MdFormatQuote size={24} />,
        })}
        {BlockButton({
          format: "numbered-list",
          icon: <MdFormatListNumbered size={24} />,
        })}
        {BlockButton({
          format: "bulleted-list",
          icon: <MdList size={34} />,
        })}
      </StyledToggleButtonGroup>
      <Divider orientation="vertical" className={classes.divider} />
      {/* <div className={classes.button}>
        {InsertImageButton({
          icon: <MdImage size={28} />,
        })}
        {InsertVideoButton({
          icon: <MdOndemandVideo size={28} />,
        })}
      </div> */}
        </Paper>
    )
}

export const HoveringToolBar = () => {
 const editor = useSlate();
 const [showToolBar,setShowToolBar] = useState(false);
 const {selection} = editor;
 useEffect(() =>{
if(!selection ||Editor.string(editor,selection) === ""){
    setShowToolBar(false);
}else{
    setShowToolBar(true);
}
 },[selection]);
 return (
     <div hidden = {!showToolBar}>
         <SlateToolBar/>
     </div>
 )

};

const useStyles = makeStyles((theme: Theme)=>
createStyles({
    paper:{
        display:"flex",
        border: `2px solid ${theme.palette.divider}`,
      flexWrap: "wrap",
    },
    divider: {
      alignSelf: "stretch",
      height: "auto",
      margin: theme.spacing(1, 0.5),
    },
    button: {
      border: "none",
      paddingBottom: theme.spacing(1),
    },
})
);

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0.5),
      border: "none",
      padding: theme.spacing(0, 1.5),
      "&:not(:first-child)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-child": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }))(ToggleButtonGroup);