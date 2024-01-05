const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const products = await Category.findAll({
      include: {
        model: Product
      }
    })
    res.json(products);
  } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error'});
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{  
    const products = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product
      }
    });
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  });

router.post('/', async (req, res) => {
  // create a new category
  try{  
    const products = await Category.create({
      category_name: req.body
    });
    res.status(201).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error'});
  };
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category_name = req.body
  try{
    const categoryToUpdate = await Category.findByPk(req.params.id);
    if(!categoryToUpdate) {
      return res.status(404).json({ error: 'Category not found'});
    }
    await categoryToUpdate.update({ category_name });
    res.json(categoryToUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryToDelete = await Category.findByPk(req.params.id);
    if(!categoryToDelete) {
      return res.status(404).json({ error: 'Category not found'});
    }
    await categoryToDelete.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
