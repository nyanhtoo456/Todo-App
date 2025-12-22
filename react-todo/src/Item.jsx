import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
} from "@mui/material";

import{
  Delete as DeleteIcon,
  CheckBoxOutlineBlank as TodoIcon,
  Done as CheckIcon,
} from "@mui/icons-material";

export default function Item({ item, del, toggle }) {
  return (
    <>
      <ListItem secondaryAction={
        <IconButton onClick={() => del(item.id)}>
          <DeleteIcon/>
        </IconButton>
      }>

      <ListItemIcon>
        <IconButton onClick={() => toggle(item.id)}>
          {item.done ? <CheckIcon/> : <TodoIcon/>}
        </IconButton>
      </ListItemIcon>

        <ListItemText>
           {item.name}
        </ListItemText>
        
      </ListItem>
    </>
  );
}
