/*1. Make that the "mod_2_main__panels" div, alwayse have maximum height, 
from that left from height of the window. - begin*/

/*Get height of window and elements that up and down to the panels*/
var mod_2__window_h = window.innerHeight;
var mod_2__header_h = document.getElementById("mod_2_header").getBoundingClientRect().height;
var mod_2__main__tabs_h = document.getElementById("mod_2_main__tabs").getBoundingClientRect().height;
var mod_2__footer_h = document.getElementById("mod_2_footer").getBoundingClientRect().height;
/*Height of the panels*/
var mod_2_main__panels_h = 0;

/*Panel element*/
var mod_2_main__panels = document.getElementById("mod_2_main__panels");

resize_mod_2_panels();
window.addEventListener("resize", resize_mod_2_panels);

function resize_mod_2_panels() {

  /*Get height of window and elements that up and down to the panels*/
  mod_2__window_h = window.innerHeight;
  mod_2__header_h = document.getElementById("mod_2_header").getBoundingClientRect().height;
  mod_2__main__tabs_h = document.getElementById("mod_2_main__tabs").getBoundingClientRect().height;
  mod_2__footer_h = document.getElementById("mod_2_footer").getBoundingClientRect().height;

  /*Calculate height of panels - responsive way*/
  /*
  mod_1_what_breakpoint
  mod_1_breakpoints
  */
  if(mod_1_what_breakpoint !== mod_1_breakpoints[2]) {
    mod_2_main__panels_h = mod_2__window_h - (4 + mod_2__main__tabs_h + mod_2__footer_h);
  } else {
    mod_2_main__panels_h = mod_2__window_h - (mod_2__header_h + mod_2__main__tabs_h + mod_2__footer_h);
  }
  
  /*Set the height*/
  mod_2_main__panels.setAttribute("style", "height: " + mod_2_main__panels_h + "px;");
};

/*Periodic resize panel*/
var mod_2_set_interval_period = 1000;
var resize_mod_2_repeater = window.setInterval(resize_mod_2_panels, mod_2_set_interval_period);
/*1. end*/