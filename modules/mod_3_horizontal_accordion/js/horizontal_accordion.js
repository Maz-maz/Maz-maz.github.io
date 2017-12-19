/*Module 3 horizontal accordion - begin*/

/*3.-1 Спочатку перевірити чи є взагалі акордіони на сторінці.
Якщо немає нічого не робити.*/
var mod_3_class__accordion = ".mod_3_hr_accr";
if($(mod_3_class__accordion).length) {

/*3.0 Горизонтальний аккордіон. Опис.
  - Горизонтальний акордіон має мати ячейки, в яких будуть кнопки і контейнери. Якщо натиснути
на кнопку то сусідній контейнер має відкритись чи закритись, взалежності від того стану який був раніше.
  - Можна буде міняти те чи в акордіоні буде відкриватися лише один дів, тобто що при відкритті інших дівів
ті що вже відкриті будуть закриватись.
  - Акордіон буде мати можливітсь центрування в контейнері де він поміщений. Це також можна буде виключати.
  - Висота кнопок і контейнерів буде однаковою, але мінімально потрібною.
  - МОжна буде наперед вказати які контейнери будуть з самого початку відкритими.*/

/*  3.0.-11 Деякі "константи" аккордіону:
!!! Поправити те що деколи потрібно без крапочки на початку
! Це має бути тут для глобального викор.. Напр. якимось функціями.
!!! Зробити як обєкт.
*/
var mod_3_class__zero_padd_bord = "mod_3_hr_accr__zero_padd_bord";
var mod_3_class__zero_marg = "mod_3_hr_accr__zero_marg";
var mod_3_class__outer_box = ".mod_3_hr_accr__outer_box";
var mod_3_class__is_center = "mod_3_hr_accr--centre"
var mod_3_class__one_open = "mod_3_hr_accr--one_open";/*важливо без крапки*/
var mod_3_class__item = ".mod_3_hr_accr__item";
var mod_3_class__button = ".mod_3_hr_accr__button";
var mod_3_class__container = ".mod_3_hr_accr__cont";
var mod_3_class__item_open = "mod_3_hr_accr__item--open";
var mod_3_class__cont_close = "mod_3_hr_accr__cont--close";
/*Швидкість колапсу чи відкривання. За скільки мілісекунд сколапаться 100 пікселів.*/
var mod_3_cont_col_and_op_speed = 1000;

/*Те що нижче обовязкове щоб контейнери зколапсились, але марджін
це не обовязково.*/
var mod_3_css__item_close = {
  "width": "0px", 
  "border": "0px", 
  "padding": "0px", 
  "margin": "0px"
};


/*3.0.0 Потрібні гобальні змінні і деякі визначення.*/
/*3.0.0.1 Модель акордіонів*/
// Масив з акордіонами
var mod_3_model_accordionS = [];

// Класс акордіон
function mod_3_Model_accordion () {
  this.is_animation_run = 0;
  this.outerBox = "";
  this.center = "";
  this.oneOpen = "";
  this.accordion = "";
  this.itemS = [];/*Тут буде сидіти обєкт як нище - ітем*/
};

// Класс ітемів (ячейок) акордіону
function mod_3_Model_item () {
  this.open = "";
  this.item = "";
  this.button = "";
  this.container = {
    link: "",
    /*Початкові ширини контейнерів*/
    width: "",
    /*Час колапсу для анімації*/
    collapse_time: "",
    /*Ссилка на анімацію яка зараз відбувається*/
    animation: ""
  };
};

/*3.1.* Допоміжні функції:*/
/*3.1.*.1 Контроллер. Переключання відкрито, закрито, в відпов. ітемі.
Принімає номер акордіона і ітема.*/
function mod_3_contr__model_item_open_toggle(accord_n, item_n) {
  var item = mod_3_model_accordionS[accord_n].itemS[item_n];
  //help:  console.log(item.open);
  item.open = ! item.open;
};

/*3.1.*.* Контроллер. Приведення до "нормального стану".
  !Коментарі знаходяться в функції яка поширює онклік реакцію - 
там де дана функція викликається.*/
function mod_3_contr__model_bring_to_normal_state(accord_num, item_num) {
  /*Чи виставлена умова на можливітсь відкрити лише один ітем*/
  if(mod_3_model_accordionS[accord_num].oneOpen) {
    /*Закрити всі окрім відкритого нещодавно*/
    $.each(mod_3_model_accordionS[accord_num].itemS, function(index, item_obj) {
      if(index !== item_num && item_obj.open) {
        item_obj.open = false;
      }
    });/*end: $.each(mod_3_model_accordionS[accord_num].itemS, function(index, item_obj) {*/
  }
}

/*3.1.*.2 Вигляд. Перекинути стан моделі на вигляд. Також подаються
номер акордіону і ітема де спрацював онклік івент.*/
function mod_3_view__apply_model_to_view(accord_n, item_n) {
  /*! Стан вигляду закріплений за виглядом. Покищо те чи ітем відкритий чи
  закритий "записано" через викор. класів. Річ у тому що в нас різна
  дія при різних різницях між станом моделі і вигляду. Тому "перекидування
  класів" покищо є обовязкове.
  !!! Потім можна зробити якось по інакшому.*/

  /*! Покищо буде перекидуватись не лише те що змінено і дані про це є, 
  а й буде вестись пробігання по іншому. Це потрібно для закривання попередньо
  закритих ітемів.*/
  $.each(mod_3_model_accordionS[accord_n].itemS, function(index, item_obj) {

  /*Первірка змін. Покищо нас цікавлять лише зміни щодо "відкрито", 
  тому тільки з цим ведеться робота.*/
    if(item_obj.open === $(item_obj.item).hasClass(mod_3_class__item_open)) {
      /*Нічого не помінялось щодо "відкрито"*/
    } else if(item_obj.open === true && 
      $(item_obj.item).hasClass(mod_3_class__item_open) === false) {
      
      /*Відкривати*/
      mod_3_view__item_open(item_obj);

    } else if(item_obj.open === false && 
      $(item_obj.item).hasClass(mod_3_class__item_open) === true) {

      /*Закривати*/
      mod_3_view__item_close(item_obj);

    }/*end: Закривати*/
    
  });/*end: $.each(mod_3_model_accordionS[accord_n].itemS, function(index, item_obj) {*/

};/*end: function mod_3_view__apply_model_to_view(accord_n, item_n) {*/

/*3.1.*.2.1 Вигляд. Допоміжна функція - "відкрити ітем".
Тут міститься все що потрібно зробити для "відкривання" ітема в "вигляді".*/
function mod_3_view__item_open(item_as_obj) {

  /*!!! Те що нижче можна міняти місцями.*/
  /*Перекид. класів*/
  $(item_as_obj.item).addClass(mod_3_class__item_open);
  
  /*Анімація відкривання відповідного контейнера*/
  $(item_as_obj.container.link).animate(
    {"width": item_as_obj.container.width + "px"},
    { duration: item_as_obj.container.collapse_time,
      start: function() {
        /*Забрати нульові марджіни*/
        $(this).removeClass(mod_3_class__zero_marg);
        /*Зцентрувати відповідний акордіон*/
        mod_3_view__accr_to_center($(this).data("accordion_n"));
      },/*end: start: function() {*/
      progress: function() {
        /*Центрувати відповідний акордіон при пробіганні анімації*/
        mod_3_view__accr_to_center($(this).data("accordion_n"));
      },/*end: progress: function() {*/
      done: function() {
        /*Забрати нульові паддінги і бордери*/
        $(this).removeClass(mod_3_class__zero_padd_bord);
        mod_3_view__accr_to_center($(this).data("accordion_n"));
      }/*end: done: function() {*/
    }/*end: obj*/
  );/*end: $(item_as_obj.container.link).animate(*/

}/*end: function mod_3_view__item_open(item_as_obj) {*/

/*3.1.*.2.2 Вигляд. Допоміжна функція - "закрити ітем".
Тут міститься все що потрібно зробити для "закривання" ітема в "вигляді".*/
function mod_3_view__item_close(item_as_obj) {

  /*!!! Те що нижче можна міняти місцями.*/
  /*Перекид. класів*/
  $(item_as_obj.item).removeClass(mod_3_class__item_open);

  /*Анімація закривання відповідного контейнера*/
  $(item_as_obj.container.link).animate(
    {"width": 0},
    { duration: item_as_obj.container.collapse_time,
      start: function() {
        /*Зробити нульові паддінг і бордер*/
        $(this).addClass(mod_3_class__zero_padd_bord);
        /*Початкове центрування відповід. акордіона*/
        mod_3_view__accr_to_center($(this).data("accordion_n"));
      },/*end: start: function() {*/
      progress: function() {
        /*ПОстійне центрування при пробіганні анімації*/
        mod_3_view__accr_to_center($(this).data("accordion_n"));
      },/*end: progress: function() {*/
      done: function() {
        /*Зробити нульові марджіни*/
        $(this).addClass(mod_3_class__zero_marg);
        /*Кінцеве центрування*/
        mod_3_view__accr_to_center($(this).data("accordion_n"));
      }/*end: done: function() {*/
    }/*end: obj*/
  );/*end: $(item_as_obj.container.link).animate(*/

}/*end: function mod_3_view__item_close(item_as_obj) {*/


/*3.1.*.2.* Вигляд. Центрування акордіону.
  Функція яка принімає номер акордіону і центрує даний акордіон.

  !! Важливий коментар. Дану функцію потрібно викликати завжди коли міняється
щось що може вплинути на те чи акордіон зцентрований чи ні. В даному разі на це можуть
вплинути в першу чергу наступні явища: 
  1. Анімація відкривання чи закривання контейнерів;
  2. Зміна ширини акордіону яка не повязана з відкриванням чи закриванням його контейнерів;
  3. Зміна ширини оутер бокса що містить контейнер.
  Перше явище враховани тим як задані функції відкивання і закривання контейнерів.
  Друге і третє, нажаль, враховано постійним викликом спеціальної функції - 
"зцентрувати всі акордіони". Це через те що іншого кращого способу я не знайшов.

  ! Покищо центрування досягається через зміну паддінг лефт контейнера акордіону.*/
function mod_3_view__accr_to_center (accord_num) {

  /*Центрувати лише коли є відповідний класс - "центр" на аутер боксі.*/
  if(mod_3_model_accordionS[accord_num].center) {
    
    var outer_width = $(mod_3_model_accordionS[accord_num].outerBox).innerWidth();
    var accor_total_width = $(mod_3_model_accordionS[accord_num].accordion).outerWidth(true);
    var padding_left;
  
    if(outer_width > accor_total_width) {
      padding_left = (outer_width - accor_total_width)/2;
    } else {padding_left = 0;}
  
    $(mod_3_model_accordionS[accord_num].outerBox).css("padding-left", padding_left + "px");
  
  }/*end: if(mod_3_model_accordionS[accord_num].center) {*/
}/*end: function mod_3_view__accr_to_center (accord_num) {*/

/*3.1.*.2.* Вигляд. Зцентрувати всі акордіони.*/
function mod_3_view__center_all_accr () {
  $.each(mod_3_model_accordionS, function(index, item) {
    mod_3_view__accr_to_center(index);
  });
}

/*Період постійного виклику даної функції.*/
var mod_3__center_all__set_int_delay = 500;
/*ІД задання повторення виклику даної функції.*/
var mod_3_center_all_repeater_ID;




$( document ).ready( function() {

/*3.1 Реалізація.*/

/*3.1.0 Модель.
  Буде впроваджено "модель" акордіонів. Все що робитиметься з акордіоном
  спочатку робитиметься з моделлю, а вже після чого стан моделі буде перекидуватись акордіону.*/

/*3.1.1 Допоміжні функції.
  3.1.1.1 - робота з класами.
  - Потрібно могти перевірити чи в рядку класів присутній якийсь класс (.hasClass()).
  "var elm = $( ".mod_3_hr_accr__item" );
  console.log(elm.hasClass( "mod_3_hr_accr__item--open" ));"
  - Потрібно могти забирати і класти класс (.removeClass(), .addClass()).
  - Потрібно могти робити "тоглл" певного класу (.toggleClass()).
  3.1.1.2 - робота з ширинами і висотами елементів.
  - Задавати ширину і висоту як в сіесесі (.css()).
*/

/*А. Підготовка акордіона - початок*/
/*
  3.1.2 Модель. Початкове заповнення моделі.
  ! Тут покищо погано реалізована дана ініціалізація, так як припускаєтсья що
присутні лише заповнені ітеми і кожен ітем має по одній кнопці і контейнеру.
Також тут немає того що коли ми беремо ссилку на кнопку чи контейнер то ми це беремо
"із ітема". Тут так що якщо є і-й ітем то і-й контейнер вважається його. Це потімпотрібно
зробити краще.
*/
mod_3_model__initialization();

function mod_3_model__initialization() {


var mod_3_accordions = $( mod_3_class__accordion );

for( var i = 0; i < mod_3_accordions.length; i++) {

  //3.1.2.0 Для кожного акордіону створити модель і задати деякі її параметри
  mod_3_model_accordionS[i] = new mod_3_Model_accordion();
  mod_3_model_accordionS[i].outerBox = mod_3_accordions.eq(i).parent(mod_3_class__outer_box).get(0);
  mod_3_model_accordionS[i].center = $(mod_3_model_accordionS[i].outerBox).hasClass(mod_3_class__is_center);
  mod_3_model_accordionS[i].oneOpen = mod_3_accordions.eq(i).hasClass(mod_3_class__one_open);
  mod_3_model_accordionS[i].accordion = mod_3_accordions.get(i);

  /*3.1.2.1 В кожному акордіоні, пробігтися по кожній кнопці і контейнеру, 
  і дозадати параметри моделі.
  !!! Тут припускається що кожен ітем має по одній кнопці і контейнеру всередині. Це варто 
  потім зробити краще.*/
  var mod_3_items = $( mod_3_class__item, mod_3_accordions.eq(i) );
  var mod_3_buttons = $( mod_3_class__button, mod_3_accordions.eq(i) );
  var mod_3_containers = $( mod_3_class__container, mod_3_accordions.eq(i) );

  /*3.1.2.* Дозадати параметри моделі.*/
  for(var j = 0; j < mod_3_items.length; j++) {
    mod_3_model_accordionS[i].itemS[j] = new mod_3_Model_item();
    mod_3_model_accordionS[i].itemS[j].open = mod_3_items.eq(j).hasClass(mod_3_class__item_open);
    mod_3_model_accordionS[i].itemS[j].item = mod_3_items.get(j);
    mod_3_model_accordionS[i].itemS[j].button = mod_3_buttons.get(j);
    /*Привязання до кнопок даних про номер акордіону і номер ітема де ця кнопка сидить*/
    mod_3_buttons.eq(j).data({
      "accordion_n": i,
      "item_n": j
    });
    /*Привязання до контейнерів даних про номер акордіону і номер ітема де цей конт. сидить*/
    mod_3_containers.eq(j).data({
      "accordion_n": i,
      "item_n": j
    });
    mod_3_model_accordionS[i].itemS[j].container.link = mod_3_containers.get(j);
    mod_3_model_accordionS[i].itemS[j].container.width = mod_3_containers.eq(j).outerWidth();
    mod_3_model_accordionS[i].itemS[j].container.collapse_time = (mod_3_containers.eq(j).outerWidth()/100)*mod_3_cont_col_and_op_speed;
  }
  //
  
  }/*for( var i = 0; i < mod_3_accordions.length; i++)*/
}/*function mod_3_model_initialization() {*/

/*3.1.3 Вигляд. Початкове задання висот кнопок і котейнерів.*/
mod_3_view__set_same_height();

function mod_3_view__set_same_height() {
  /*Знайти максимальну висоту*/
  var max_h;
  var buttn_cont_height = 0;

  /*!!! Зробити якось більш грамотніше дану перевірку, так як раніше і так перев
  чи є взагалі акордіони на сторінці.*/
  if (mod_3_model_accordionS.length !== 0) {
    /*ПРобігтися по кожному акордіоні*/
    for(var i = 0; i < mod_3_model_accordionS.length; i++) {
      /*Початкове занулення максимальної висоти для кожного акордіону*/
      max_h = 0;
    /*Пробігтися по кожному баттоні і контейнері і знайти те що потрібно*/
      for(var j = 0; j < mod_3_model_accordionS[i].itemS.length; j++) {

        buttn_cont_height = 
        $(mod_3_model_accordionS[i].itemS[j].button).outerHeight();

        if(max_h < buttn_cont_height) {
          max_h = buttn_cont_height;
        }

        buttn_cont_height = 
        $(mod_3_model_accordionS[i].itemS[j].container.link).outerHeight();

        if(max_h < buttn_cont_height) {
          max_h = buttn_cont_height;
        }
      }/*for(var j = 0; j < mod_3_model_accordionS[i].itemS.length; j++)*/

    /*Задати максимальну висоту*/
    for(var j = 0; j < mod_3_model_accordionS[i].itemS.length; j++) {

        $(mod_3_model_accordionS[i].itemS[j].button).css("height", max_h + "px");

        $(mod_3_model_accordionS[i].itemS[j].container.link).css("height", max_h + "px");

    }/*for(var j = 0; j < mod_3_model_accordionS[i].itemS.length; j++)*/

    }/*for(var i = 0; i < mod_3_model_accordionS.length; i++)*/
  }/*if (mod_3_model_accordionS.length !== 0)*/
}/*function mod_3_view__set_same_height()*/


/*3.1.* Вигляд. Початкове закривання ітемів які не мають класу "відкрито".
! Це потрібно щоб була синхронізація між станами моделі і вюва. І не лише між
"віртуальним" станом але і реальним - на вигляд.*/
mod_3_view__initiall_item_close();

function mod_3_view__initiall_item_close() {

  /*Припускається що спочатку всі ітеми "візуально" відкриті*/
  for(var i = 0; i < mod_3_model_accordionS.length; i++) {

    $.each(mod_3_model_accordionS[i].itemS, function(index, item_obj) {
      /*Якщо в моделі закрито, то "закрити".*/
      if( ! item_obj.open ) {
        mod_3_view__item_close(item_obj);
      }
    });/*end: $.each(mod_3_model_accordionS[i].itemS, function(index, item_obj) {*/

  }/*end: for(var i = 0; i < mod_3_model_accordionS.length; i++) {*/

}/*end: function mod_3_view__initiall_iem_close() {*/

/*А. Підготовка акордіона - кінець*/


/*3.1.* Вигляд. Задати реакцію на натискання кнопок.
Зокрема, переключання відрито-закрито відповідних ітемів.*/
mod_3_view__button_on_click();

function mod_3_view__button_on_click() {
  for(var i = 0; i < mod_3_model_accordionS.length; i++) {
    for(var j = 0; j < mod_3_model_accordionS[i].itemS.length; j++) {
      /*Онклік івент*/
      $(mod_3_model_accordionS[i].itemS[j].button).click(function() {

        /*Дізнаємось номер акордіону і ітема в якому була натиснута кнопка.
        Це як мінімум що нам потрібно для все можливих подальших дій.*/
        var accord_n = $(this).data("accordion_n");
        var item_n = $(this).data("item_n");

        /*3.1.1 Дії при натисканні кнопки:*/
        /*3.1.1.1 Контроллер. Переключання відкрито, закрито, в відпов. ітемі.*/
        mod_3_contr__model_item_open_toggle(accord_n, item_n);

        /*Приведення до "нормального стану". "Нормальний стан" - це стан моделі
        і відповідно акордіону який продиктований закладеними на ньому 
        обмеженнями, чи властивостями. Напр. чи буде можливітсь відкривати
        більше ніж один ітем - чи при відкривання другоо ітема перший закриється.
          Припускається що дозволено ті що спочатку висталені відкритими, щоб
        їх було більше ніж один. Але при відкриванні якогось ітеми всі решта закриються.
          У нас умова "нормальності" може порушитись лише при відкриванні ітема,
        тому має місе нижче наведена умова.*/
        if(mod_3_model_accordionS[accord_n].itemS[item_n].open) {
          mod_3_contr__model_bring_to_normal_state(accord_n, item_n);
        }

        /*3.1.1.* Вигляд. Перекинути стан моделі на вигляд.*/
        mod_3_view__apply_model_to_view(accord_n, item_n);


      });/*end: $(mod_3_model_accordionS[i].itemS[j].button).click(function() {*/
    }/*end: for(var j = 0; j < mod_3_model_accordionS[i].itemS.length; j++) {*/
  }/*end: for(var i = 0; i < mod_3_model_accordionS.length; i++) {*/
}/*end: function mod_3_view__button_on_click() {*/

/*3.1.* Вигляд. ПОстійний виклик центрування всіх акордіонів через 
деякий інтервал. Це потрібно через проблеми присутні з центруванням.
! Детальніше - дивись коментарі під функцією "mod_3_view__accr_to_center"*/
mod_3_center_all_repeater_ID = 
  window.setInterval(mod_3_view__center_all_accr, 
    mod_3__center_all__set_int_delay);

});/*end: $( document ).ready( function() {*/

}/*end: if($(mod_3_class__accordion).length) {*/
/*Module 3 horizontal accordion - end*/