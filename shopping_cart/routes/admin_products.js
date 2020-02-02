var express = require('express');
var router = express.Router();

var mkdirp = require('mkdirp')
var fs = require('fs-extra');
var resizeImg = require('resize-img');

// get product model
var Product = require('../models/product');
// get category model
var Category = require('../models/category');

// get Product index
router.get('/', function (req, res) {
  var count;
  Product.count(function (err, c) {
    count = c;
  });
  Product.find(function (err, products) {
    res.render('admin/products', {
      products: products,
      count: count,
    });
  })
});

// post page reorder
router.post('/reorder-pages', function (req, res) {
  var ids = req.body['id[]'];
  var count = 0;

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    count++;
    // asyn
    (function (count) {
      Page.findById(id, function (err, page) {
        page.sorting = count;
        page.save(function (err) {
          if (err) return console.log(err);
        });
      })
    })(count);
  }
});

// get edit product
router.get('/edit-product/:slug', function (req, res) {
  var errors;

  if (req.session.errors) errors = req.session.errors;
  req.session.errors = null;

  Category.find(function (err, cats) {
    Product.findOne({slug: req.params.slug}, function (err, p) {
      console.log('1');
      if (err) {
        console.log('2');
        console.log(err);
        res.redirect('admin/products');
      } else {
        console.log('3');
        var galleryDir = 'public/product_images/' + p._id + '/gallery';
        var galleryImages = null;
        
        fs.readdir(galleryDir, function (err, files) {
          console.log('4');
          if (err) {
            console.log('41');
            console.log(err);
          } else {
            console.log('42');
            console.log('5');
            galleryImages = files;
            res.render('admin/edit_product', {
              errors: errors,
              title: p.title,
              desc: p.desc,
              category: p.category,
              categories: cats,
              price: p.price,
              img: p.img,
              galleryImages: galleryImages
            });
            console.log('6');
          }
        })
      }
    })
  })
});


// post edit product
router.post('/edit-page/:slug', function (req, res) {
  var imgFile = req.files && typeof req.files.img !== "undefined" ? req.files.img.name : "";
  var slugOld = req.params.slug;

  req.checkBody('title', 'Title must have a value').notEmpty();
  req.checkBody('desc', 'Desc must have a value').notEmpty();
  req.checkBody('price', 'Price must have a value').isDecimal();
  req.checkBody('img', 'You must upload a image').isImage(imgFile);

  var title = req.body.title;
  var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
  var desc = req.body.desc;
  var price = req.body.price;
  var category = req.body.category;
  var pimg = req.body.pimg;

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    res.redirect('admin/products/edit-produtc/' + slugOld);
  } else {
    Product.findOne({slug: slug, _id: { '${ne}': id }}, function (err, p) {
      if (err) {
        console.log(err);
      } else {
        if (p) {
          req.flash('danger', 'Product title exist!');
          res.redirect('admin/products/edit-produtc/' + slugOld);
        } else {
          Product.findOne({slug: slug}, function (e, p) {
            if (e) console.log(e);
            p.title = title;
            p.price = parseFloat(price).toFixed(2);
            p.desc = desc;
            p.category = category;
            
            if (imgFile !== '') {
              p.img = imgFile;
            }
            p.save(function (err) {
              if (err) console.log(err);
              if (imgFile != '') {
                if (pimg != '') {
                  fs.remove('public/product_images/' + p._id + '/' + pimg, function (err) {
                    if (err) console.log(err);
                  })
                }
                var productImage = req.files.img;
                var path = 'public/product_images/' + p._id + '/' + imgFile;
  
                productImage.mv(path, function (err) {
                  return console.log(err);
                });
              }
              req.flash('success', 'Product added');
              res.redirect('/admin/products/edit-product/' + slug);
            });
          })
        }
      }
    })
  }
});

// get add product
router.get('/add-product', function (req, res) {
  var title = "";
  var desc = "";
  var price = "";

  Category.find(function (err, cats) {
    res.render('admin/add_product', {
      title: title,
      desc: desc,
      price: price,
      categories: cats
    });
  })
});

// post a page
router.post('/add-product', function (req, res) {
  var imgFile = req.files && typeof req.files.img !== "undefined" ? req.files.img.name : "";

  req.checkBody('title', 'Title must have a value').notEmpty();
  req.checkBody('desc', 'Desc must have a value').notEmpty();
  req.checkBody('price', 'Price must have a value').isDecimal();
  req.checkBody('img', 'You must upload a image').isImage(imgFile);

  var title = req.body.title;
  var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
  var desc = req.body.desc;
  var price = req.body.price;
  var category = req.body.category;

  var errors = req.validationErrors();
  if (errors) {
    Category.find(function (err, cats) {
      res.render('admin/add_product', {
        errors: errors,
        title: title,
        desc: desc,
        price: price,
        categories: cats,
      });
    });
  } else {
    Product.findOne({
      slug: slug.replace(/\s+/g, '-').toLowerCase()
    }, function (err, product) {
      if (product) {
        console.log('exist');
        req.flash('danger', 'Product slug exists!');
        Category.find(function (err, cats) {
          res.render('admin/add_product', {
            title: title,
            desc: desc,
            price: price,
            categories: cats,
          });
        });
      } else {
        console.log('dont exist');
        var product = new Product({
          title: title,
          slug: slug,
          price: parseFloat(price).toFixed(2),
          desc: desc,
          img: imgFile,
          category: category
        });
        product.save(function (error) {
          if (error) {
            return console.log(error);
          } else {
            if (imgFile != '') {
            mkdirp('public/product_images/' + product._id).then(made => {
                var productImage = req.files.img;
                var path = 'public/product_images/' + product._id + '/' + imgFile;
  
                productImage.mv(path, function (err) {
                  return console.log(err);
                });
                mkdirp('public/product_images/' + product._id + '/gallery').then(made => {
                  mkdirp('public/product_images/' + product._id + '/gallery/thumbs').then(made => {});
                });
              });
            }
            req.flash('success', 'Product added!');
            res.redirect('/admin/products');
          }
        });
      }
    })
  }
});

// delete page
router.get('/delete-page/:id', function (req, res) {
  Page.findByIdAndRemove(req.params.id, function (err) {
    if (err) return console.log(err);
    req.flash('success', 'Deleted page!');
    res.redirect('/admin/pages');
  })
});

// exports 
module.exports = router;