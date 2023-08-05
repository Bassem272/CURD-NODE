import fetch from 'node-fetch';
import productsModel from '../models/productsModel.js';
import { object, string, number, array } from 'zod';
export default {
  async getAllProducts(req, res) {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      console.log(data);
      productsModel.setProducts(data);
      res.json(productsModel.getProducts());
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  },

  getProductById(req, res) {
    const id = parseInt(req.params.id);
    const product = productsModel.getProductById(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  },

 async createProduct(req, res) {

  
   
   try{ 
      productsModel.validate1(req.body); 
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      console.log(data);
      productsModel.setProducts(data);
    const { title, price, description, categoryId, images } = req.body;
console.log("req.body",req.body)
    const newProduct = {
      "id": productsModel.getProducts().length + 1,
     "title": title,
      "price": price,
      "description": description,
     " category": {
        "id": categoryId,
       "name": 'Clothes',
        "image": 'https://api.lorem.space/image/fashion?w=640&h=480&r=4278',
        "creationAt": new Date(),
        "updatedAt": new Date()
      },
     " images": images,
      "creationAt": new Date(),
      "updatedAt": new Date()
    };

    productsModel.addProduct(newProduct);

    res.status(201).json(newProduct);}catch(e){
      res.status(400).json({error:"the validation is wrong",details: e.message});
    }
  },

 async  updateProduct(req, res) {

    try {
      productsModel.validate2(req.body); 
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    // const response = await fetch('https://fakestoreapi.com/products');
    //   const data = await response.json();
    //   console.log(data);
      // productsModel.setProducts(data);
    const id = parseInt(req.params.id);
    console.log("req.body.id",req.body,id)
    const { title, price } = req.body;
    console.log(title,price)

    const updatedProduct = await productsModel.updateProduct(id, { title, price });
    console.log('update :', updatedProduct);
    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(updatedProduct);
    }
  },

 async deleteProduct(req, res) {
    const id = parseInt(req.params.id);

    const deletedProduct = await productsModel.deleteProduct(id);

    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({success:true , message: 'Product deleted successfully'});
    }
  } 
};
