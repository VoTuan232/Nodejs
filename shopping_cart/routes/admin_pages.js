var express = require('express');
var router = express.Router();

// get page model
var Page = require('../models/page');

// get page index
router.get('/', function (req, res) {
  Page.find({}).sort({sorting: 1}).exec(function (err, pages) {
    res.render('admin/pages', {
      pages: pages
    });
  });
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

// get page edit
router.get('/edit-page/:slug', function (req, res) {
  Page.findOne({slug: req.params.slug}, function (err, page) {
    if (page) {
      res.render('admin/edit-page', {
        title: page.title,
        content: page.content,
        slug: page.slug,
        id: page._id,
      });
    } else {
      console.log(err);
    }
  })
});


// put page edit
router.post('/edit-page/:slug', function (req, res) {
  var paramSlug = req.params.slug;
  req.checkBody('title', 'Title must have a value').notEmpty();
  req.checkBody('content', 'Body must have a value').notEmpty();

  var title = req.body.title;
  var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
  if (slug === '') {
    slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
  }
  var content = req.body.content;
  var id = req.body.id;
  var errors = req.validationErrors();

  if (errors) {
    console.log('errors');
    res.render('admin/edit-page', {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
      id: id,
    });
  } else {
    console.log('not errors');
    Page.findOne({slug: slug, _id: {'$ne': id}}, function (err, page) {
      // console.log(slug);
      // console.log(id);
      // console.log(page);
      if (page) {
        console.log('not update');
        req.flash('danger', 'Slug exist');
        res.render('admin/edit-page', {
          title: title,
          content: content,
          slug: slug,
          id: id,
        });
      } else {
        console.log('update');
        Page.findById(id, function (err, page) {
          if (err) console.log(err);
          else {
            page.title = title;
            page.slug = slug;
            page.content = content;
            page.save(function (err) {
              if (err) console.log(err);
              req.flash('danger', 'Edit page success');
              res.redirect('/admin/pages/edit-page/' + slug);
            });
          }
        })
      }
    })
  }
});

// get add page
router.get('/add-page', function (req, res) {
  var title = "";
  var slug = "";
  var content = "";
  res.render('admin/add_page', {
    title: title,
    slug: slug,
    content: content,
  });
});

// post a page
router.post('/add-page', function (req, res) {
  req.checkBody('title', 'Title must have a value').notEmpty();
  req.checkBody('content', 'Body must have a value').notEmpty();

  var title = req.body.title;
  var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
  if (slug === '') {
    slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
  }
  var content = req.body.content;

  var errors = req.validationErrors();
  if (errors) {
    res.render('admin/add_page', {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
    });
  } else {
    // console.log('success');
    Page.findOne({slug: slug}, function (err, page) {
      if (page) {
        // console.log('exist');
        req.flash('danger', 'Page slug exists!');
        res.render('admin/add_page', {
          title: title,
          slug: slug,
          content: content,
        });
      } else {
        var page = new Page({
          title: title,
          slug: slug,
          content: content,
          sorting: 10,
        });
        page.save(function (error) {
          if (error) return console.log(error);
          req.flash('success', 'Page added!');
          res.redirect('/admin/pages');
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