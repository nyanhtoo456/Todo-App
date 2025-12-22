

import {
    Box,
    OutlinedInput,
    IconButton,
} from "@mui/material"

import {
    Add as AddIcon
} from "@mui/icons-material";

import { useRef } from "react";

export default function Form({add}) {
    const inputName = useRef();
    return (
        <form
            onSubmit={(e) => {
              e.preventDefault();
              if( inputName == "") {
                return false;
              }else {
                
              add(inputName.current.value);

             inputName.current.value = "";
             inputName.current.focus();
              }
             
            
            }}
          >
            <Box sx={{ display: "flex" }}>
              <OutlinedInput inputRef={inputName} sx={{ flexGrow: 1 }} />
              <IconButton variant="contained" type="submit">
                <AddIcon/>
              </IconButton>
            </Box>
          </form>
          
    )
}