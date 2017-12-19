/*Module 3 horizontal accordion - begin*/

/*!!! Make later that possible to have multiple insertion 
of this module on the page*/

/*1. Made similar height of the all "mod_3_hr_accr__button"
and all "mod_3_hr_accr__button" - begin*/
var mod_3_hr_accr__buttons = document.getElementsByClassName("mod_3_hr_accr__button");
var mod_3_hr_accr__content = document.getElementsByClassName("mod_3_hr_accr__content");
var mod_3_hr_accr__items = document.getElementsByClassName("mod_3_hr_accr__item");
/*!!! Make that better*/
var mod_3_hr_accr = document.getElementsByClassName("mod_3_hr_accr")[0];
var mod_3_hr_accr__min_width = 0;
/*Class of opened item*/
var mod_3_hr_accr_class_of_open_item = "mod_3_hr_accr__item--open";
/*Opened accr content divs width*/
var mod_3_hr_accr__content__open_width = [];
for (i = 0; i < mod_3_hr_accr__content.length; i++) {
  mod_3_hr_accr__content__open_width[i] = mod_3_hr_accr__content[i].getBoundingClientRect().width;
}

/*Maximum height of them*/
var mod_3_hr_accr__max_h_of_item = 0;

/*Do*/
/*!!! It is possible to add later, dynamic response 
to changing of the heights of elements - but this can ruin effects below*/
mod_3_hr_accr__similar_height();

function mod_3_hr_accr__similar_height () {
  /*It's assumed that number of "mod_3_hr_accr__buttons" 
  are equal to number "mod_3_hr_accr__content"*/

  /*Find*/
  for (i = 0; i < mod_3_hr_accr__buttons.length; i++) {

    if(mod_3_hr_accr__max_h_of_item < mod_3_hr_accr__buttons[i].getBoundingClientRect().height) {
      mod_3_hr_accr__max_h_of_item = mod_3_hr_accr__buttons[i].getBoundingClientRect().height;
    };

    if(mod_3_hr_accr__max_h_of_item < mod_3_hr_accr__content[i].getBoundingClientRect().height) {
      mod_3_hr_accr__max_h_of_item = mod_3_hr_accr__content[i].getBoundingClientRect().height;
    };
  };

  /*Set*/
  for (i = 0; i < mod_3_hr_accr__buttons.length; i++) {
    mod_3_hr_accr__buttons[i].setAttribute(
      "style", "height: " + mod_3_hr_accr__max_h_of_item + "px;"
    );
    mod_3_hr_accr__content[i].setAttribute(
      "style", "height: " + mod_3_hr_accr__max_h_of_item + "px;"
    );
  };

};
/*1. end*/

/*2. Collapse all "mod_3_hr_accr__content" that not have "open" class*/
/*!!! Later make better*/
for (i = 0; i < mod_3_hr_accr__content.length; i++) {
  var temp_style = mod_3_hr_accr__content[i].getAttribute("style");
  if(!(mod_3_hr_accr__content[i].parentElement.className.includes(mod_3_hr_accr_class_of_open_item))) {
    mod_3_hr_accr__content[i].setAttribute("style", temp_style + " width: 0px;");
  } else {
    mod_3_hr_accr__content[i].setAttribute("style", temp_style + " width: " + mod_3_hr_accr__content__open_width[i] + "px;");
  }
}


/*Accessory functions*/
/*Acc_1: Chek if element "elm" haw in attribute "attr" string "str".
  Return true if have, false if not.*/
function mod_3_hr_accr__is_attr_have (elm, attr, str) {
  return elm.getAttribute(attr).includes(str);
}

/*Acc_2: Get rid of string inside attribute of element.*/
function mod_3_hr_accr__get_rid_of_attr (elm, attr, str) {
  var elm_attr_str = elm.getAttribute(attr);
  elm_attr_str = elm_attr_str.replace(str, "");
  elm.setAttribute(attr, elm_attr_str);
}

/*Acc_3: Add to attribute string.*/
function mod_3_hr_accr__add_string_to_attr (elm, attr, str) {
  var elm_attr_str = elm.getAttribute(attr);
  elm_attr_str = elm_attr_str + str;
  elm.setAttribute(attr, elm_attr_str);
}

/*Acc_4: Made minimum width of accordion container (mod_3_hr_accr)*/
function mod_3_hr_accr__container_minim () {
  mod_3_hr_accr__min_width = 0;

  /*Before get width of accordion items,
   this items must be placed on one line.
   So we set width to auto, to have
   enough linewidth to make so.*/
  mod_3_hr_accr.setAttribute("style", "width: auto;");

  /*!!!Look below on + 1*/
  for (i = 0; i < mod_3_hr_accr__items.length; i++) {
    mod_3_hr_accr__min_width = mod_3_hr_accr__min_width + mod_3_hr_accr__items[i].getBoundingClientRect().width;
  }

  mod_3_hr_accr__min_width = mod_3_hr_accr__min_width + 1;

  mod_3_hr_accr.setAttribute("style", "width: " + mod_3_hr_accr__min_width + "px;");
}

/**/

/*3. !!! Add open and close*/

mod_3_hr_accr__container_minim();

/*!!! Can be done better*/
window.addEventListener("resize", mod_3_hr_accr__container_minim);


for (i = 0; i < mod_3_hr_accr__buttons.length; i++) {
  mod_3_hr_accr__buttons[i].addEventListener("click", function() {
    /*Temp for style attribute*/
    var style_attr_temp = "";
    /*Element that fire event*/
    var accr_buttn = this;
    /*Sequence number of it*/
    var accr_buttn_n = 0;
    /*Sequence number of past opened*/
    var accr_buttn_past_n = 1000;
    /*Find sequence number of buttons*/
    for(k = 0; k < mod_3_hr_accr__buttons.length; k++) {
      if(mod_3_hr_accr__buttons[k] === accr_buttn) {
        accr_buttn_n = k;
      }
      if(mod_3_hr_accr__buttons[k].className.includes(mod_3_hr_accr_class_of_open_item)) {
        accr_buttn_past_n = k;
      }
    };
    /*His brother - content*/
    var accr_cont = accr_buttn.nextElementSibling;

    /*Chek original state of "content"*/
    var sibling_was_closed = mod_3_hr_accr__is_attr_have(accr_cont, "style", "width: 0px");

    /*Close all "content" and remove "open" class*/
    for (j = 0; j < mod_3_hr_accr__content.length; j++) {
      if(!(mod_3_hr_accr__is_attr_have(mod_3_hr_accr__content[j], "style", "width: 0px"))) {
        /*!!! (later make better) Remove present width parameter and add 0 width*/
        style_attr_temp = mod_3_hr_accr__content[j].getAttribute("style");
        style_attr_temp = style_attr_temp.substr(0,style_attr_temp.indexOf("width:") - 1);
        mod_3_hr_accr__content[j].setAttribute("style", style_attr_temp + " width: 0px;");
        /*!!! Later made better*/
        mod_3_hr_accr__content[j].parentElement.className = mod_3_hr_accr__content[j].parentElement.className.replace(" " + mod_3_hr_accr_class_of_open_item, "");
      };
    };

    /*Open if needed sibling of button and add "open" class to parent*/
    if(sibling_was_closed) {
      mod_3_hr_accr__get_rid_of_attr(accr_cont, "style", " width: 0px;");
      /*Set correct width of relative content*/
      mod_3_hr_accr__add_string_to_attr(accr_cont, "style", " width: " + mod_3_hr_accr__content__open_width[accr_buttn_n] + "px;");      
      accr_cont.parentElement.className += " " + mod_3_hr_accr_class_of_open_item;
    };

    /*Change width of container*/
    /*!!!Later made better*/
    /*
    if(accr_buttn_past_n === 1000)
    var mod_3_hr_accr__new_big_width_of_accr = mod_3_hr_accr.getBoundingClientRect().width + mod_3_hr_accr__content__open_width[accr_buttn_n] - mod_3_hr_accr__content__open_width[accr_buttn_past_n];
    var mod_3_hr_accr__new_small_width_of_accr = mod_3_hr_accr.getBoundingClientRect().width - mod_3_hr_accr__content__open_width[accr_buttn_n];
    if (document.getElementsByClassName(mod_3_hr_accr_class_of_open_item).length === 0) {
      mod_3_hr_accr.setAttribute("style", "width: " + mod_3_hr_accr__new_small_width_of_accr + "px;");
    } else {
      mod_3_hr_accr.setAttribute("style", "width: " + mod_3_hr_accr__new_big_width_of_accr + "px;");
    }
    */
    
    mod_3_hr_accr.setAttribute("style", "width: auto;");
    /*Time delay must be the same as in scc on transitions*/
    window.setTimeout(mod_3_hr_accr__container_minim, 1000);
    //mod_3_hr_accr__container_minim();
  });
}

/*Module 3 horizontal accordion - end*/