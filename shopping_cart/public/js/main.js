$(function () {
  if ($('textarea#ta').length) {
    CKEDITOR.replace('ta');
  }
  
  $('a.confirmDelete').on('click', function (e) {
    if (!confirm('Confirm deletion')) return false;
  })
})