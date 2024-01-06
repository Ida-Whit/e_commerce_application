const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    res.json(category);
  } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error'});
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{  
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    if (category) {
      res.json(category);
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
    const category = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    });
    res.status(201).json(category);
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
