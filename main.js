var $ = require("jquery");
var $video=$("video");
var video=$video[0];
var seekBar=$("#played");

var playBtn=$("#play").on("click",function(){
  if(video.paused){
    video.play();
    playBtn.removeClass("pausing").addClass("playing");
  }else{
    video.pause();
    playBtn.removeClass("playing").addClass("pausing");
  }
});
$(".skipBtn").on("click",function(){
  var $this=$(this);
  video.currentTime+=($this.attr("data-ms")|0)/1000;
});

$video.on("timeupdate",function(){
  seekBar.css("width",(video.currentTime/video.duration*100)+"%");
});
$("#bar").on("click",function(e){
  video.currentTime=(e.offsetX/seekBar.width()*video.duration)|0;
});

var markerArea=$("#markerArea");
var markerName=$("#markerName");
$("#addMarker").on("click",function(){
  var time=(video.currentTime*1000)|0;
  $('<div class="markerContainer"><div class="marker"><div class="time">'+time+'ms</div><div>'+markerName.val()+'</div><a class="delete" href="#"></a></div></div>').appendTo(markerArea).css("left",(video.currentTime/video.duration*100)+"%");
});
markerArea.on("click",".delete",function(){
  $(this).parent().remove();
});
$("#fast").on("click",function(){
  video.playbackRate*=2;
});
$("#slow").on("click",function(){
  video.playbackRate*=0.5;
});

/*
to do

marker List table
show currentTime
load menu
