// console.log(document.querySelector("#main").offsetHeight)

// document.querySelector("#main")
function isMobileDevicee() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }
  
  if (isMobileDevicee()) {
    document.querySelector("#mainelements").style.pointerEvents = "all";
  }
  
  // ________________hioppo___________________
  // --------------
  // Hover animaton
  // --------------
  
  const mouthSpeed = 0.3;
  const easeType = Power2.easeOut;
  const mouthOpen = gsap.timeline({ paused: true });
  mouthOpen.to(
    ".mouth-back",
    { duration: mouthSpeed, ease: easeType, y: -70 },
    0
  );
  mouthOpen.to(
    ".tongue",
    { duration: mouthSpeed * 1.5, ease: easeType, y: -70 },
    0
  );
  mouthOpen.to(
    ".teeth",
    { duration: mouthSpeed, ease: easeType, y: -70, scaleY: 1.2 },
    0
  );
  mouthOpen.to(
    ".body",
    {
      duration: mouthSpeed,
      ease: easeType,
      scaleY: 1.06,
      transformOrigin: "center bottom",
    },
    0
  );
  mouthOpen.to(".freckles", { duration: mouthSpeed, ease: easeType, y: -10 }, 0);
  mouthOpen.to(".ears", { duration: mouthSpeed, ease: easeType, y: 6 }, 0);
  mouthOpen.to(".eye-right", { duration: mouthSpeed, ease: easeType, x: -2 }, 0);
  mouthOpen.to(".eye-left", { duration: mouthSpeed, ease: easeType, x: 2 }, 0);
  mouthOpen.to(".eyes", { duration: mouthSpeed, ease: easeType, y: 2 }, 0);
  mouthOpen.to(".nostrils", { duration: mouthSpeed, ease: easeType, y: -6 }, 0);
  
  // ------------
  // Mouse events
  // ------------
  
  const button = document.querySelector("#hippobtn");
  
  button.addEventListener("mouseenter", enterButton);
  button.addEventListener("mouseleave", leaveButton);
  
  function enterButton() {
    mouthOpen.play();
  }
  function leaveButton() {
    mouthOpen.reverse();
  }
  
  // ----------
  // Ear wiggle
  // ----------
  
  const earWiggle = gsap.timeline({ paused: true, repeat: 2 });
  earWiggle.set(".ear-right", { transformOrigin: "center center" });
  earWiggle.to(".ear-right", { duration: 0.1, rotation: 45 });
  earWiggle.to(".ear-right", { duration: 0.1, rotation: 0 });
  
  window.setInterval(earWigglePlay, 2500);
  
  function earWigglePlay() {
    earWiggle.play(0);
  }
  
  // ------------
  // Eye tracking
  // ------------
  
  const eyeRightPupil = document.querySelector(".eye-right-pupil");
  const eyeLeftPupil = document.querySelector(".eye-left-pupil");
  const eyeLeftInner = document.querySelector(".eye-left-inner");
  const innerEyeWidth = eyeLeftInner.getBoundingClientRect().width;
  const innerEyeHeight = eyeLeftInner.getBoundingClientRect().height;
  const pupilWidth = eyeLeftPupil.getBoundingClientRect().width;
  const pupilHeight = eyeLeftPupil.getBoundingClientRect().height;
  const xMovement = (innerEyeWidth - pupilWidth) / 2;
  const yMovement = (innerEyeHeight - pupilHeight) / 2;
  
  window.addEventListener("mousemove", updateEyePosition);
  
  function updateEyePosition(event) {
    const posX =
      ((event.clientX / document.body.clientWidth) * 2 - 1) * xMovement;
    const posY =
      ((event.clientY / document.body.clientHeight) * 2 - 1) * yMovement;
  
    eyeLeftPupil.style.transform = `translate(${posX}px, ${posY}px)`;
    eyeRightPupil.style.transform = `translate(${posX}px, ${posY}px)`;
  }
  
  // var oldScrollY = window.scrollY;
  // var directionText = document.getElementById("direction");
  // window.onscroll = function (e) {
  //   if (oldScrollY < window.scrollY) {
  //     directionText.textContent = " Down";
  //   } else {
  //     directionText.textContent = " Up";
  //   }
  //   oldScrollY = window.scrollY;
  // };
  
  
  
  let lastScrollPos = 0;
  window.addEventListener('wheel', function(event) {
    // console.log("chala");
    const currentScrollPos = event.offsetY;
    const isScrollingDown = currentScrollPos > lastScrollPos;
    const isScrollingUp = currentScrollPos < lastScrollPos;
  
    // console.log(window , event);
    // console.log(currentScrollPos , lastScrollPos);
    
    if (isScrollingDown) {
      // console.log('Scrolling Down');
      // document.querySelector("nav").style.top = "0%";
      gsap.to("nav", {
        y: `-100%`,
        duration: .75, ease: "power4.inOut"
  
      })
  
    } else if(isScrollingUp){
      // console.log('Scrolling Up');
      // document.querySelector("nav").style.top = "-100%";
      gsap.to("nav", {
        y: `0%`,
        duration: .75, ease: "power4.inOut"
  
      })
    }
    lastScrollPos = currentScrollPos;
  });