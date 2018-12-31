const $ShowHideButton = document.getElementById("show-hide-button");
const $ElementList = document.querySelectorAll(".tag__remove");
const $a = document.getElementById("tag-input");
const $sideBar = document.querySelectorAll(".outer-right-tool-bar");
/*const $form = document.getElementById("id-form");*/
var $window = window;
var $countNumberOfTag = 2;
var $countNumberOfClick = 0;
var $sideBarHidden = false;
var $sideBarHiddenOverlay = false;
var $overlayIndicator = false;

function main(){
  $ElementList.forEach(bindEventClick);
  bindEventChange($a);
  bindEventClickShowHideButton($ShowHideButton);
  bindEventScreenSize($window);
  /*for (var i = 0; i < $ElementList.length; i++) {
    bindEventClick($ElementList[i]);
  }
  $ElementList.forEach(function ($element) {
    bindEventClick($element);
  });
  
  class Array {
    forEach (callback) {
      for (var i = 0; i < this.length; i++) {
        callback(this[i], i, this);
      }
  
      return list;
    }
  }
  
  Array.prototype.forEach = forEach
  
  $ElementList.forEach(bindEventClick);*/
}

function bindEventScreenSize($element){
  $element.addEventListener("resize", handleScreenSize);
}

function bindEventClick($element){
  $element.addEventListener("click", handleClick);
}

function bindEventChange($element) {
  $element.addEventListener("change", handleInput);
}

function bindEventClickShowHideButton($element){
  $element.addEventListener("click", handleShowHideButton);
}

function bindEventClickOverlayButton($element){
  $element.addEventListener("click", handleClickOverlayButton);
}

function handleClickOverlayButton(){
  $overlayIndicator = true;
  $countNumberOfClick += 1;
  if ($countNumberOfClick % 2 == 0){
    $sideBar.forEach(callback_hideSideBar);
    $sideBarHiddenOverlay = true;
    event.target.offsetParent.classList.remove("overlay-button");  
  }
  else{
    $sideBar.forEach(callback_displaySideBar);
    $sideBarHiddenOverlay = false;
    event.target.offsetParent.classList.add("overlay-button");
  }
  
  /*var background = document.createElement("div");
  background.classList.add("background-overlay");
  $form.appendChild(background);*/
  /*const x = document.getElementById("right-menu");
  background.appendChild(x);*/
}

function handleCreateTag($tagName){
  var tag = document.createElement("div");
  tag.classList.add("tag");
  var span = document.createElement("span");
  tag.appendChild(span);
  var txt = document.createTextNode($tagName);
  span.appendChild(txt);
  var image = document.createElement("img");
  image.setAttribute("src", "Icons/Icons/Basic/Close.svg");
  image.classList.add('tag__remove');
  tag.appendChild(image);
  var tagItem = document.getElementById("tag");
  tagItem.appendChild(tag);
  bindEventClick(image);
}

function handleScreenSize(event){
  const $screenSize = event.target.outerWidth;
  var $parentDiv = document.getElementById("outer-name");
  
  if ($screenSize <= 870 && $sideBarHidden == false){
    var $overlay = document.createElement("a");
    $overlay.classList.add("overlay");
    var image = document.createElement("img");
    image.setAttribute("src", "Icons/Icons/Basic/Menu.svg");
    image.classList.add("overlay-img", "active");
    $overlay.appendChild(image);
    $sideBar.forEach(callback_hideSideBar);
    $sideBarHidden = true;
    $parentDiv.appendChild($overlay);
    bindEventClickOverlayButton(image);
    
  }
  else if ($screenSize > 870 && $sideBarHidden == true){
    $overlayIndicator = false;
    $sideBar.forEach(callback_displaySideBar);
    if ($parentDiv.lastChild){
      $parentDiv.removeChild($parentDiv.lastChild); 
    }
    $sideBarHidden = false;
  }
}

function callback_hideSideBar($element){
  if ($element.classList.contains("side-bar-show")){
    $element.classList.remove("side-bar-show");
  }
  if ($element.classList.contains("side-bar-show-overlay")){
    $element.classList.remove("side-bar-show-overlay");
  }
  
  $element.classList.add("hide");
}

function callback_displaySideBar($element){
  
  $element.classList.remove("hide");
  
  if (!$overlayIndicator){
    
    if ($element.classList.contains("side-bar-show-overlay")){
      $element.classList.remove("side-bar-show-overlay");
    }
    
    $element.classList.add("side-bar-show");
  }
  else /*if ($overlayIndicator)*/{
    $element.classList.add("side-bar-show-overlay");
  }
}

function handleClick(event){
  const $ElementRemoved = event.target;
  const $TagElement = $ElementRemoved.parentNode;
  const $TagWrap = $TagElement.parentNode;
  $TagWrap.removeChild($TagElement);
  $countNumberOfTag -= 1;
  if ($countNumberOfTag == 0){
    $ShowHideButton.classList.add("not-active");
  }
}

function handleShowHideButton(event){
  const $ShowHideButton = event.target;
  var textContent = document.getElementById("show-hide-button").textContent;
  if ($ShowHideButton && textContent.substring(0, 4) == "Hide"){
    hideTag();
  }
  else if ($ShowHideButton && textContent.substring(0, 4) == "Show"){
    showTag();
  }
}

function hideTag(){
    var list = document.querySelectorAll("#tag .tag");
    list.forEach(callback_hide);
    document.getElementById("show-hide-button").textContent = "Show All \(" + $countNumberOfTag + "\)";
}

function showTag(){
    var list = document.querySelectorAll("#tag .hide");
    list.forEach(callback_show); 
    document.getElementById("show-hide-button").textContent = "Hide All";
}

function callback_hide($Item){
  $Item.classList.remove("tag");
  $Item.classList.add("hide");
}

function callback_show($Item){
  $Item.classList.remove("hide");
  $Item.classList.add("tag");
}

function handleInput(event){
  const textInputted = event.target.value.trim();
  if (textInputted != '' ){
    handleCreateTag(textInputted);
    $countNumberOfTag += 1;
    if ($countNumberOfTag == 1){
      $ShowHideButton.classList.remove("not-active");
    }
  }
  event.target.value = null;
}

main();

/* Create a tag */
/* function textChange(a){
  var txtChg = false;
  if (a != null) {
    txtChg = true;
  }
  return txtChg;
}*/

