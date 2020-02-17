exports.getAllProduct = (req, res, next) => {
  // router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then(result => {
      const response = {
        count: result.length,
        products: result.map(item => {
          return {
            _id: item._id,
            name: item.name,
            price: item.price,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + item._id
            }
          }
        }),
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({
        error: err
      });
    })
}