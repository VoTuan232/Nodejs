var express = require('express');
var router = express.Router();

// get category model
var Category = require('../models/category');

// get page index
router.get('/', function (req, res) {
  Category.find(function (err, categories) {
    if (err) return console.log(err);
    res.render('admin/categories', {
      categories: categories,
    })
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
    }) (count);
  }
});

// get category edit
router.get('/edit-category/:slug', function (req, res) {
  Category.findOne({slug: req.params.slug}, function (err, category) {
    if (category) {
      res.render('admin/edit-category', {
        title: category.title,
        slug: category.slug,
        id: category._id,
      });
    } else {
      console.log(err);
    }
  })
});


// put category edit
router.post('/edit-category/:slug', function (req, res) {
  var paramSlug = req.params.slug;
  req.checkBody('title', 'Title must have a value').notEmpty();

  var title = req.body.title;
  var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
  var id = req.body.id;
  var errors = req.validationErrors();

  if (errors) {
    console.log('errors');
    res.render('admin/edit-category', {
      errors: errors,
      title: title,
      slug: slug,
      id: id,
    });
  } else {
    console.log('not errors');
    Category.findOne({slug: slug, _id: { '$ne': id }}, function (err, category) {
      if (category) {
        console.log('not update');
        req.flash('danger', 'category exist');
        res.render('admin/edit-page', {
          title: title,
          slug: slug,
          id: id,
        });
      } else {
        console.log('update');
        Category.findById(id, function (err, category) {
          if (err) console.log(err);
          else {
            category.title = title;
            category.slug = slug;
            category.save(function (err) {
              if (err) console.log(err);
              req.flash('danger', 'Edit category success');
              res.redirect('/admin/categories/edit-category/' + slug);
            });
          }
        })
      }
    })
  }
});

// get add category
router.get('/add-category', function (req, res) {
  var title = "";
  var slug = "";
  res.render('admin/add_category', {
    title: title,
    slug: slug,
  });
});

// post a category
router.post('/add-category', function (req, res) {
  req.checkBody('title', 'Title must have a value').notEmpty();

  var title = req.body.title;
  var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();

  var errors = req.validationErrors();
  if (errors) {
    res.render('admin/add_category', {
      errors: errors,
      title: title,
      slug: slug,
    });
  } else {
    Category.findOne({slug: slug}, function (err, category) {
      if (category) {
        req.flash('danger', 'Category slug exists!');
        res.render('admin/add_category', {
          title: title,
          slug: slug,
        });
      } else {
        var category = new Category({
          title: title,
          slug: slug,
        });
        category.save(function (error) {
          if (error) return console.log(error);
          req.flash('success', 'Category added!');
          res.redirect('/admin/categories');
        });
      }
    })
  }
});

// delete category
router.get('/delete-category/:id', function (req, res) {
 Category.findByIdAndRemove(req.params.id, function (err) {
   if (err) return console.log(err);
   req.flash('success', 'Deleted category!');
   res.redirect('/admin/categories');
 })
});

// exports 
module.exports = router;