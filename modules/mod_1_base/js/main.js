/*Mod_1 - begin*/
$(document).foundation();

/*Check on what break point we are*/
var mod_1_responsive_info = document.getElementById("mod_1_responsive_info");
var mod_1_breakpoints = ["small", "medium", "large"];
/*Global variable that can be check for - on what breakpoint we are*/
var mod_1_what_breakpoint = "";

mod_1_get_breakpoint();

window.addEventListener("resize", mod_1_get_breakpoint);

function mod_1_get_breakpoint () {
  var mod_1_temp = mod_1_responsive_info.offsetWidth;
  mod_1_what_breakpoint = mod_1_breakpoints[mod_1_temp];
}
/*Mod_1 - end*/