const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include:{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: {attributes: [] }
      }
    })
    res.json(tags);
  } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error'});
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error'});
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    });
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: {id: req.params.id},
    })
    if(!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    };
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagToDelete = await Tag.findByPk(req.params.id);
    if(!tagToDelete) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tagToDelete.destroy();
    res.json({ message: 'Tag deleted successfully '});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
