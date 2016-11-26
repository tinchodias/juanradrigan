'use strict'

var baseImageUrl;
var images;
var currentIndex;
var currentImage;
var currentAutoplayTimeout;
var autoPlayEnabled = true;
var autoplayMinutes = 2;


function refreshCurrentImage() {
  currentImage = images[currentIndex];
  $("#content").attr("src", baseImageUrl + currentImage);


  if (currentAutoplayTimeout) {
    clearTimeout(currentAutoplayTimeout);
  }
  if (autoPlayEnabled) {
    currentAutoplayTimeout = setTimeout(function() {
      showNextImage();
    }, autoplayMinutes * 60 * 1000);
  }

}

function forwardCurrentImage() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
}

function showNextImage() {
  forwardCurrentImage();
  refreshCurrentImage();
}


$(function() {

  //initialize image
  baseImageUrl = "img/";
  images = [ "homenaje_1a.svg", "homenaje_2c.svg" ];
  currentIndex = 0;
//  refreshCurrentImage();

  $(window).keypress(function(event) {
    event.preventDefault();
    console.log(event.which);
    if ( event.which == 13 ) {
      showNextImage();
    } else if ( event.key == "f") {
      toggleFullScreen();
    }
  });
});


function toggleFullScreen() {
  var elem = document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}