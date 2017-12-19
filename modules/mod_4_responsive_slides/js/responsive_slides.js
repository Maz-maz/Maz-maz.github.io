/*mod_4_responsive_slides js - begin*/

/*Get all relevant links*/
var mod_4_resp_sl__links = document.querySelectorAll('a[class*="mod_4_resp_sl__lk"]');
/*Module insertion div class*/
var mod_4_resp_sl__ins_class = "mod_4_resp_sl";
var mod_4_resp_sl__links_class_part = "mod_4_resp_sl__lk";
var mod_4_resp_sl__slide_class_part = "mod_4_resp_sl__sl";
var mod_4_resp_sl__is_active = "mod_4_resp_sl--is_active";

/*1. Some needed functions*/
/*1.1 In -  element and class. Return parent of element that have that class*/
function mod_4_resp_sl__parent_with_class (elem, x_class) {
  var parent1 = elem.parentElement;

  while(!(parent1.className.includes(x_class+" ") || parent1.className===x_class)) {
    parent1 = parent1.parentElement;
  }

  return parent1;
}
/*1.2 Get part of string str that begins (include) with beg. Return such part.*/
function mod_4_resp_sl__get_part_of_string (str, beg) {
  var slised = str.split(" ");

  for(i = 0; i < slised.length; i++) {
    if(slised[i].includes(beg)) {
      return slised[i];
    }
  }
}

/*1.3 Show relevant slide tab*/
function mod_4_resp_sl__show_slide() {

  var link = this;
  var link_class = mod_4_resp_sl__get_part_of_string(link.className,
    mod_4_resp_sl__links_class_part);
  var slide_class = link_class.replace(mod_4_resp_sl__links_class_part,
    mod_4_resp_sl__slide_class_part);
  var mutual_father = mod_4_resp_sl__parent_with_class(link, mod_4_resp_sl__ins_class);
  var slide = mutual_father.querySelector("." + slide_class);

  var all_links = mutual_father.querySelectorAll('[class*="mod_4_resp_sl__lk"]');
  var all_slides = mutual_father.querySelectorAll('[class*="mod_4_resp_sl__sl"]');

  /*Make all needed for links*/
  if(!(link.className.includes(mod_4_resp_sl__is_active))) {
  
  /*Get rid of present is-active clases*/
  /*!!! For working well, mod_4_resp_sl__is_active classes must go always
    after other present clases -- make later better*/
  for (i = 0; i < all_links.length; i++) {
    if(all_links[i].className.includes(mod_4_resp_sl__is_active)) {
      all_links[i].className = all_links[i].className.replace(" " + mod_4_resp_sl__is_active, "");
    }
  }

  link.className = link.className + " " + mod_4_resp_sl__is_active;

  }

  /*Make all needed for slides*/
  if(!(slide.className.includes(mod_4_resp_sl__is_active))) {
    
    /*Get rid of present is-active clases*/
    /*!!! For working well, mod_4_resp_sl__is_active classes must go always
      after other present clases -- make later better*/
    for (i = 0; i < all_slides.length; i++) {
      if(all_slides[i].className.includes(mod_4_resp_sl__is_active)) {
        all_slides[i].className = all_slides[i].className.replace(" " + mod_4_resp_sl__is_active, "");
      }
    }
  
    slide.className = slide.className + " " + mod_4_resp_sl__is_active;
  
    }
}

/*Make links change display property on slides*/
for(i = 0; i < mod_4_resp_sl__links.length; i++) {
  mod_4_resp_sl__links[i].addEventListener("click", mod_4_resp_sl__show_slide);
}

/*mod_4_responsive_slides js - end*/