const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abcdef',
  database: 'yenettacode',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM product_list';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/data/:productId', (req, res) => {
  const productId = req.params.productId;

  const query = 'SELECT * FROM product_list WHERE product_id = ?';

  connection.query(query, [productId], (err, productDetails) => {
    if (err) {
      console.error('Error executing query: ' + err);
      res.status(500).send('Internal Server Error');
    } else {
      if (productDetails.length === 0) {
        res.status(404).send('Product not found');
      } else {
        res.json(productDetails[0]);
      }
    }
  });
});

app.delete('/api/data/:productId', (req, res) => {
    const productId = req.params.productId; 
      const query = `DELETE FROM product_list WHERE product_id = ${productId}`;
      connection.query(query, [productId], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err);
        res.status(500).send('Internal Server Error');
      } else {
        if (results.affectedRows > 0) {
          res.status(200).send('Product deleted successfully');
        } else {
          res.status(404).send('Product not found');
        }
      }
    });
  });

  app.post('/api/data', (req, res) => {
    const { name, description, price, quantity } = req.body;
    const query = 'INSERT INTO product_list (product_name, Description, price, quantity) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, description, price, quantity], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).json({ message: 'Product added successfully' });
      }
    });
  });

  app.put('/api/data/:productId', (req, res) => {
    const productId = req.params.productId; 
    const updatedProduct = req.body; 
    if (!productId) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const query = 'UPDATE product_list SET product_name = ?, description = ?, price = ?, quantity = ? WHERE product_id = ?';
    connection.query(
      query,
      [updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.quantity, productId],
      (err) => {
        if (err) {
          console.error('Error executing query: ' + err);
          return res.status(500).json({ message: 'Error updating product' });
        } else {
          return res.json({ message: 'Product updated successfully' });
        }
      }
    );
  });
  
app.put('/api/data/:productId/status', (req, res) => {
  const productId = req.params.productId; 
  const { status } = req.body; 
  const query = 'UPDATE product_list SET status = ? WHERE product_id = ?';
  connection.query(query, [status, productId], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ message: 'Status updated successfully' });
    }
  });
});

app.get('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
