function menu_handler(){

  // Element Handlers
  const nav_bg = $('#fade_background');
  const nav_menu = $('.nav_menu');
  const trigger = $(nav_menu).find('.trigger');
  const li = $(nav_menu).find('.menu li');
  const revealer = $(nav_menu).find('.revealer');
  const menu_wrapper = $(nav_menu).find('.menu_wrapper');

  // Status trackers
  const speed = 0.65;
  let is_animate = true;
  let status = "close";

  // Green Sock Timelines / Settings
  const tl_init = new TimelineMax({ paused: true });
  const tl_in = new TimelineMax({ paused: true, onComplete: toggle_active });
  const tl_out = new TimelineMax({ paused: true, onComplete: toggle_active });


  // Initialize animation and make the menu visible
  tl_init.set(menu_wrapper, {
    x: "-100%"
  }).set(li, {
    x: "-120%"
  }).set(nav_bg, {
    autoAlpha:0
  });

  // Transition from offscreen to onscreen
  tl_in.fromTo(menu_wrapper, speed, {
    x: "-100%",
  }, {
    x: "0%",
  }).fromTo(nav_bg, speed, {
    autoAlpha:0
  },{
    autoAlpha:0.65
  }).staggerFromTo(li, speed, {
      x: "-120%"
    }, {
      x: "0%"
    },
    0.15,
    "-=".concat(speed)
  );

  // Transition from onscreen to offscreen
  tl_out.staggerFromTo(li, speed, {
      x: "0%"
    }, {
      x: "-120%"
    },
    0.15
  ).fromTo(menu_wrapper, speed, {
    x: "0%"
  }, {
    x: "-100%"
  },
  "-=0.5").fromTo(nav_bg, speed, {
    autoAlpha:0.65
  }, {
    autoAlpha:0
  });

  // Set the trigger function for the menu button
  trigger.on("click", toggle_menu);
  function toggle_menu(){
    if(is_animate === true){
      is_animate = false;
      if(status == "close"){
        tl_in.play(0);
        status = "open";
      }else{
        tl_out.play(0);
        status = "close";
      }
    }else{
      return;
    }
  }

  // Allow interaction when not animating
  function toggle_active(){
    is_animate = true;
    $(nav_menu).toggleClass("active");
  }

  // Make the nav menu visible
  tl_init.play(0);
  $(nav_bg).removeClass("hidden");
  $(nav_menu).removeClass("hidden");

}

$(document).ready(function(){
  menu_handler();
});
