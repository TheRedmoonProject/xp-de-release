var player = $('.player');
var audio = player.children('audio');
var playerAnimate = true;
player.children('.ppanel').children('[data-action="play"]').on('click', function(){
audio.trigger('play');
});

audio.on('timeupdate',function(data){
var currentTime = this.currentTime; 
var duration =  this.duration;
var progtime = 100 / duration * currentTime;

audioUpdate(progtime);



});

player.children('.pbar').on('click', function (e){
  if(e.target.className == "pbar" || e.target.className == "pbarval"){
  var maxwidth = player.children('.pbar').width();
  var progtime = e.offsetX * 100 / maxwidth;
  var duration = audio.prop("duration");
  var time = duration / 100 * progtime;
  player.children('.pbar').children('.pbarval').stop(true,false);
  player.children('.pbar').children('.pbarvalbtn').stop(true,false);
  audio.prop("currentTime",time);
  playerAnimate = false;
  
  }else{
    console.log(false);
  }
});

player.children('.pbar').children('.pbarvalbtn').on('mousedown',function(e){
  var old = e.pageX;
  player.children('.pbar').children('.pbarvalbtn').on('mousemove',function(e){
    console.log('MouseMove');
    var pos = parseInt(player.children('.pbar').children('.pbarvalbtn').css('margin-left'));
    var poschange = e.pageX - old;
    console.log(poschange);
    var newpos = pos + poschange;
    console.log(newpos);
    player.children('.pbar').children('.pbarvalbtn').css('margin-left', newpos + 'px' );
    e.stopPropagation();
  });
  player.children('.pbar').children('.pbarvalbtn').on('mouseup',function(){
    player.children('.pbar').children('.pbarvalbtn').off('mousemove');
    player.children('.pbar').children('.pbarvalbtn').off('mouseup');
    player.children('.pbar').children('.pbarvalbtn').off('mouseleave');
    console.log('mouseUp');
  });
  player.children('.pbar').children('.pbarvalbtn').on('mouseleave',function(){
    player.children('.pbar').children('.pbarvalbtn').off('mousemove');
    player.children('.pbar').children('.pbarvalbtn').off('mouseup');
    player.children('.pbar').children('.pbarvalbtn').off('mouseleave');
    console.log('mouseLeave');
  });
});



function audioUpdate (progtime){

var maxwidth = player.children('.pbar').width();
var valwidth =  maxwidth / 100  * progtime;

  if(playerAnimate === true){
    player.children('.pbar').children('.pbarval').animate(
    {
      'width': valwidth + 'px'
    },'slow','linear');
  
    var valwidthbtn = valwidth - 7;
    player.children('.pbar').children('.pbarvalbtn').animate(
    {
      'margin-left' : valwidthbtn + 'px'
    },'slow','linear');
  }else{
    player.children('.pbar').children('.pbarval').animate(
    {
      'width': valwidth + 'px'
    },10,'linear');
  
    var valwidthbtn = valwidth - 7;
    player.children('.pbar').children('.pbarvalbtn').animate(
    {
      'margin-left' : valwidthbtn + 'px'
    },10,'linear');
    playerAnimate = true;
  }
}
