import { useState } from "react";
import Item from "./Item";
import Header from "./Header";
import Form from "./Form";
import List from "./List";

import { Box, Container, Divider,  } from "@mui/material";
import { useEffect } from "react";

import { useQuery , useQueryClient} from "@tanstack/react-query";

const api = "http://localhost:8800/task";

async function fetchTodo() {
  const res = await fetch(api);
  return res.json();
}

export default function App() {
  const queryClient = useQueryClient();

  const {
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["task"],
    queryFn: fetchTodo,
  });

  const add = (name) => {
   fetch(api, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      }
   }).then(res => queryClient.invalidateQueries("task"))
  };

  const del = (id) => {
    fetch(`${api}/${id}`, { method: 'DELETE'}).then(
      res => queryClient.invalidateQueries("task")
    );
    
  };

 

  //fetch method 1//
  // useEffect(() => {
  //   fetch(api).then(async res => {
  //     const data = await res.json();
  //     setItem(data);
  //   })


    //fetch method 2//
    // fetch(api)
    //       .then(res => res.json())
    //       .then(data => setItem(data))


    //fetch method 3//
    // (async () =>{
    //   const res = await fetch(api);
    //   const data = await res.json();

    //   setItem(data);
    // })();
  // },[]);



  const toggle = (id) => {
    fetch(`${api}/${id}/toggle`, { method: 'PUT'}).then(
      res => queryClient.invalidateQueries("task")
    );
    
  }


  const clear = () => {
    fetch(api , { method: 'DELETE'}).then(
      res => queryClient.invalidateQueries("task")
    )
  }

  if(error) {
    return <div>Something went wrong</div>
  }

  if(isLoading) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <Header count={items.filter(item => !item.done).length}
      clear={clear} />

      <Box sx={{ mt: 10 }}>
        <Container maxWidth="sm">
          <Form add={add} />

          <List>
            {items.filter(item => !item.done).map(item => (
              <Item key={item.id} item={item} del={del} toggle={toggle}/>
            ))}
          </List>

          <Divider/>

           <List>
            {items.filter(item => item.done).map(item => (
              <Item key={item.id} item={item} del={del} toggle={toggle}/>
            ))}
          </List>
        </Container>
      </Box>
    </div>
  );
}
