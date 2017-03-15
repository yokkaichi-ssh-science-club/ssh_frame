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
var $currTime=$("#currentTime").on('change',function(){
  video.currentTime=$currTime.val()/1000;
});
var $speed=$("#speed").on("change",function(){
  video.playbackRate=$speed.val();
});
var $duration=$("#duration").text((video.duration*1000)|0);
$video.on("timeupdate",function(){
  $currTime.val((video.currentTime*1000)|0);
  seekBar.css("width",(video.currentTime/video.duration*100)+"%");
}).on("durationchange",function(){
  $duration.text((video.duration*1000)|0);
}).on("ratechange",function(){
  $speed.val(video.playbackRate)
});
var bar=$("#bar").on("click",function(e){
  video.currentTime=(e.offsetX/bar.width()*video.duration)|0;
});

var markerArea=$("#markerArea");
var markerName=$("#markerName");
var markerList=$("#markerList");
$("#addMarker").on("click",function(){
  var time=(video.currentTime*1000)|0;
  $('<div class="markerContainer" data-ms="'+time+'"><div class="marker"><div class="time">'+time+'ms</div></div></div>').appendTo(markerArea).css("left",(video.currentTime/video.duration*100)+"%");
  $('<div class="markerItem" data-ms="'+time+'"><span class="time">'+time+'ms</span><span class="text">'+markerName.val()+'</span><a class="delete" href="#"></a></div>').appendTo("#markerList");
});
markerList.on("click",".delete",function(){
  var $this=$(this).parent();
  $(".markerContainer[data-ms="+$this.attr("data-ms")+"]").remove();
  $this.remove();
});
$("#fast").on("click",function(){
  video.playbackRate*=2;
});
$("#slow").on("click",function(){
  video.playbackRate*=0.5;
});
var loader=$("#loader");
var viewer=$("#viewer");
if(!window.File){
  $("#dropArea #error").text("File API is not supported!");
}
$("#dropArea").on('drop',function(e){
  e.preventDefault();
  var files = e.originalEvent.dataTransfer.files
  video.src=URL.createObjectURL(files[0]);
  loader.hide();
  viewer.show();
  return false;
}).on('dragover', function() {
	return false;
});
$("#videoFile").on("change",function(){
  video.src=URL.createObjectURL(this.files[0]);
  loader.hide();
  viewer.show();
});
var markers=$("#markerArea,#markerAddForm,#markerList");
$("#hideMarker").on("click",function(){
  markers.toggle();
});
$("#dockBottom").on("click",function(){
  $("#viewer").toggleClass("dockBottom");
});
var ctrlArea=$("#controlArea");
$("#videoArea").on("click",function(){
  ctrlArea.toggle();
  $(this).toggleClass("max");
});
var zoom=1;
$("#zoomIn").on("click",function(){
  zoom+=0.1;
  $video.css("transform","scale3d("+zoom+","+zoom+",1)")
});
$("#zoomOut").on("click",function(){
  zoom-=0.1;
  $video.css("transform","scale3d("+zoom+","+zoom+",1)")
});
/*
to do

marker List table
show currentTime
load menu
zoom
smartphone
*/
