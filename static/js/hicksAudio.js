var player = $('.player');
var audio = player.children('audio');

player.children('.ppanel').children('[data-action="play"]').on('click', function(){
audio.trigger('play');
});

audio.on('timeupdate',function(data){
var currentTime = this.currentTime; 
var duration =  this.duration;

var progtime = 100 / duration * currentTime;

player.children('.pbar').children('.pbarval').animation(
  {
    'width': progtime + '%'
  },fast);



});
