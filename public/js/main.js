$(document).ready(function() {

  var wWidth = $(window).width();

  if(wWidth > 768) {
    $('.grid .col-md-4:nth-child(3n+0)').after('<div class="clearfix"></div>');
  }else if(wWidth < 769) {
    $('.grid .col-sm-6:nth-child(2n+0)').after('<div class="clearfix"></div>');
  }

  $(window).on('resize', function(){
    if(wWidth > 768) {
      $('.grid .col-md-4:nth-child(3n+0)').after('<div class="clearfix"></div>');
    }else if(wWidth < 769) {
      $('.grid .col-sm-6:nth-child(2n+0)').after('<div class="clearfix"></div>');
    }
  });

});
