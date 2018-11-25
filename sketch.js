$(document).ready(function() {
  var color = 'one';
  var counter = 0;
  $('.desc').hide();
  $('.hexagon').hover(
    function() {
      $(this).find('.desc').fadeIn('fast');
      counter++;
      if (counter === 0) {
        color = 'base';
      } else if (counter === 1) {
        color = 'one';
      } else if (counter === 2) {
        color = 'two';
      } else if (counter === 3) {
        color = 'three';
      } else if (counter >= 4){
        counter = 0 ;
        color = 'base';
      }
      $(this).find('.desc').addClass(color);
    }, 
    function() {
      $(this).find('.desc').fadeOut('fast', function() {
        $(this).removeClass(color);
      });
    });
});