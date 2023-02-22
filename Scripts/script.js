// console.log(document.querySelector("#main").offsetHeight)

// document.querySelector("#main")
function isMobileDevicee() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }
  
  if (isMobileDevicee()) {
    document.querySelector("#mainelements").style.pointerEvents= "all"
  } 
