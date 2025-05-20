const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json(), cors());

// Set the port variable
const PORT = 4000;

// Endpoint to create a new user
app.post('/register', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });

  res.send({success: `${user.email} created successfully.`});
});

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.tasks.findMany();

  res.send(tasks);
});

app.get('/shopping-list', async (req, res) => {
  const shoppingList = await prisma.shoppingList.findMany();

  res.send(shoppingList);
});

app.post('/add-task', async (req, res) => {
  const task = req.body;
  
  if(task.content === ''){
    res.send({error: 'Empty task can not be added.'});
  }else{
    try {
      const tasks = await prisma.tasks.create({
        data: {
          content: task.content
        }
      });

      res.send({success: `${tasks.content} added to task list.`});  
    }catch(error){
      res.send({error: error});
    };
  };
});

app.post('/add-shopping-list-item', async (req, res) => {
  const data = req.body;

  if(data.quantity === ''){
    data.quantity = 1;
  }else{
    data.quantity = parseInt(data.quantity)
  };
  
  if(data.title === '' || !data.title){
    res.send({error: 'Item name is needed.'});
  }else{
    try {
      const shoppingList = await prisma.shoppingList.create({
        data: {
          title: data.title,
          quantity: data.quantity,
          location: data.location
        }
      });

      res.send({success: `${shoppingList.title} added to task list.`});  
    }catch(error){
      res.send({error: error});
    };
  };
});

app.patch('/edit-shopping-list-item', async (req, res) => {
  const data = req.body;

  try {
    const updateItem = await prisma.shoppingList.update({
      where: {
        id: data.id
      },
      data: {
        title: data.title,
        quantity: data.quantity,
        location: data.location
      }
    });

    res.send({success: `${updateItem.title} updated.`});  
  }catch(error){
    res.send({ error: error });
  };
  
});

app.delete('/delete-shopping-list-item:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deleteItem = await prisma.shoppingList.delete({
      where: {
        id: id
      }
    });

    res.send(deleteItem);  
  }catch(error){
    res.send({ error: error });
  };
  
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
