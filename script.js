

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: false,
});


function firstPageAnim() {
	var tl = gsap.timeline();

	tl.from("#nav", {
		 y:'-10',
		 opacity:0,

		 duration:1.5,
		 ease: Expo.easeInOut
	})
	   .to(".boundingelem", {
		 y:0,
	    
		 duration:2,
		 stagger: .2,
		delay: -.5,
		 ease: Expo.easeInOut
	})
	   .from("#herofooter", {
		 y:'-10',
		 opacity:0,

		 duration:1.5,
		 delay: -.5,
		 ease: Expo.easeInOut
	})
}

var timeout;

function circlechaptakaro(){
	clearTimeout(timeout);

	var xscale = 1;
	var yscale = 1;

	var xprev = 0;
	var yprev = 0;
	window.addEventListener("mousemove",function(dets){
         
         xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
         yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);
        
         xprev = dets.clientX;
         yprev = dets.clientY;
         
        circleMouseFollower(xscale,yscale);
        
       timeout = setTimeout(function(){
        	document.querySelector("#minicircle").style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);
	});
}

function circleMouseFollower(xscale,yscale) {
	window.addEventListener("mousemove",function(dets){
     document.querySelector("#minicircle").style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
});
}

circlechaptakaro();
circleMouseFollower();
firstPageAnim();


document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

// Function to update the time
function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time

    const timeString = `${String(hours).padStart(2, '0')}:${minutes} ${meridiem}`;

    document.getElementById('year').textContent = year;
    document.getElementById('time').textContent = timeString;
}

// Initial call to update time
updateTime();

// Update time every minute
setInterval(updateTime, 60000);
