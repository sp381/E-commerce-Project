const router = require('express').Router();
const { UPSERT } = require('sequelize/types/query-types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product, 
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
      .then(dbCategoryData => res.json(dbCategoryData)) 
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id:req.params.id
  },
  include: {
    model: Product,
    attributes: ["id", "category-id", "product_name", "price", "stock"],
  }
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No id found in this category' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err => {
    console.log(err);
    res.status(500).json(err);
  
  })),
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, 
    {
      category_name: req.body.category_name
    }, 
    {
    where: {
      id: req.params.id,
    },
    })
});

.then(dbCategoryData => {
  if (!dbCategoryData[0]) {
    res.status(404).json({ message: 'No id found'});
    return;
  }
  res.json(dbCategoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err)
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});
}),
module.exports = router;
