$(document).ready(function() {

  var wWidth = $(window).width();

  if(wWidth > 991) {
    $('.grid .col-md-4:nth-child(3n+0)').after('<div class="grid--clear clearfix"></div>');
  } else if(wWidth < 992) {
    $('.grid .col-sm-6:nth-child(2n+0)').after('<div class="grid--clear clearfix"></div>');
  }

  $(window).on('resize', function(){
    wWidth = $(window).width();
    $('.grid--clear.clearfix').remove();
    if(wWidth > 991) {
      $('.grid .col-md-4:nth-child(3n+0)').after('<div class="grid--clear clearfix"></div>');
    } else if(wWidth < 992) {
      $('.grid .col-sm-6:nth-child(2n+0)').after('<div class="grid--clear clearfix"></div>');
    }
  });

  $('.tema-list_tema').on('click', function() {
    $(this).find('.video-list').slideToggle();
  })

});
