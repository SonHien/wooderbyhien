//header
let header = document.querySelector('header');
let slider = document.querySelector('.slider');
let heightSlider = slider.clientHeight;
let heightHead = header.clientHeight;
document.addEventListener('scroll',function(e){
    let scrollHead = window.pageYOffset;
    if(scrollHead > (heightSlider - heightHead)){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
})

//lang
let langCurrent = document.querySelector('.lang__current');
let langOpt = document.querySelector('.lang__option');
let langItems = document.querySelectorAll('.lang__option .lang__option-item');
let langSpan = document.querySelector('.lang__current span');


langCurrent.addEventListener('click',function(e){
    e.stopPropagation();
    console.log('langCurrent');
    langOpt.classList.toggle('active');
})

langItems.forEach(function(item){
    item.addEventListener('click',function(){
        let textItem = this.textContent;
        let textTemp = langSpan.textContent;
        langSpan.innerHTML = textItem;
        this.textContent = textTemp;
        //langOpt.classList.remove('active');
    })
})
langOpt.addEventListener('click', function(e){
    e.stopPropagation();
})

document.addEventListener('click',function(){
    console.log('document');
    langOpt.classList.remove('active');
})


//menu mobile
let nav = $('.nav');
let btnmenu = $('header .btnmenu');
btnmenu.click(function(){
    nav.toggleClass("clicked");
    $(this).toggleClass("clicked");
});

//Slider
let listItemSlider = document.querySelectorAll('.slider__items');
let currentSlider = 0;
let number = document.querySelector('.slider__bottom .paging__number');
let dot = document.querySelectorAll('.slider__bottom .paging__dotted li');
listItemSlider.forEach(function(itemSlider,index){
    if (itemSlider.classList.contains('active')){
        currentSlider = index;
    }
})

//number.innerHTML = (currentSlider + 1).toString().padStart(2,'0');
function showNumber(index){
    number.innerHTML = (index).toString().padStart(2,'0');
}
showNumber(currentSlider + 1);
dot[currentSlider].classList.add('active');


function goTo(index){
    listItemSlider[currentSlider].classList.remove('active');
    listItemSlider[index].classList.add('active');
    dot[currentSlider].classList.remove('active');
    dot[index].classList.add('active');
    currentSlider = index;
    showNumber(currentSlider + 1);
}

document.querySelector('.control__btn.--next').addEventListener('click',function(){
    if(currentSlider < listItemSlider.length - 1){
        goTo(currentSlider + 1)
        /* listItemSlider[currentSlider].classList.remove('active');
        listItemSlider[currentSlider + 1].classList.add('active');
        currentSlider++;
        number.innerHTML = (currentSlider + 1).toString().padStart(2,'0'); */
    }else{
        goTo(0);
        /* listItemSlider[currentSlider].classList.remove('active');
        listItemSlider[0].classList.add('active');
        currentSlider=0;
        number.innerHTML = (currentSlider + 1).toString().padStart(2,'0'); */
    } 
});
document.querySelector('.control__btn.--prev').addEventListener('click',function(){
    if(currentSlider > 0){
        goTo(currentSlider - 1);
       /*  listItemSlider[currentSlider].classList.remove('active');
        listItemSlider[currentSlider - 1].classList.add('active');
        currentSlider--; */
    }else{
        goTo(listItemSlider.length - 1);
        /* listItemSlider[currentSlider].classList.remove('active');
        listItemSlider[listItemSlider.length - 1].classList.add('active');
        currentSlider = listItemSlider.length - 1; */
    }
})

dot.forEach(function(li,index){
    li.addEventListener('click',function(){
        goTo(index);
    })
})

//back to top
let backtt = document.querySelector('.backtotop');
backtt.addEventListener('click',function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let backtotop = document.querySelector('.back-to-top');
backtotop.addEventListener('click',function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let positionSectionProduct = document.querySelector('.products').offsetTop;

window.addEventListener('scroll', function(){
    let positionScroll = window.pageYOffset;
    if (positionScroll > positionSectionProduct){
        backtotop.style.display = 'block';
    } else {
        backtotop.style.display = 'none';
    }
});

//scroll down
let menus = document.querySelectorAll('header .menu a');
let heightHeader = document.querySelector('header').offsetHeight; //Lay chieu cao bao gom padding, border
let sections=[];

function removeActiveMenu() {
    menus.forEach(function(menu_element,menu_index){
        menu_element.classList.remove('active');
    })
}

menus.forEach(function(element,index){
    let className = element.getAttribute('href').replace('#','');
    let section = document.querySelector('.' + className);
    sections.push(section);
    element.addEventListener('click',function(e){
        e.preventDefault();
        window.scrollTo({
            top: section.offsetTop - heightHeader + 1,
            behavior: 'smooth',
        });
        removeActiveMenu();
        element.classList.add('active');
    })
})


window.addEventListener('scroll',function(e){
    let posScroll = window.pageYOffset;
    sections.forEach(function(section,index){
        if(posScroll > section.offsetTop - heightHeader && posScroll< section.offsetTop + section.offsetHeight){
            removeActiveMenu();
            menus[index].classList.add('active');
        }else{
            menus[index].classList.remove('active');
        }
    })
})

//popup videos
let button_video = document.querySelectorAll('.play_button');
let popup_video = document.querySelector('.popup_video');
let close_popup_video = document.querySelector('.popup_video .close');
let iframe = document.querySelector('.popup_video iframe');

button_video.forEach(function(button){
    button.addEventListener('click',function(){
        let video_id = button.getAttribute('data-video-id');
        iframe.setAttribute('src','https://www.youtube.com/embed/' + video_id);
        popup_video.style.display = 'flex';

    });
});
close_popup_video.addEventListener('click',function(){
    iframe.setAttribute('src','');
    popup_video.style.display ='none';
});

document.querySelector('.popup_video').addEventListener('click',function(e){
    iframe.setAttribute('src','');
    popup_video.style.display ='none';
});


//scroll progress bar
function scrollProgress(){
    let headtop = $('.headtop');
    let headProgress = $('.headtop__progress');
    let pageHeight = $(document).height() - $(window).height();
    let scrollTop = $(window).scrollTop();

    let progress = scrollTop / pageHeight * 100;
    headProgress.css({
        width: progress + "%",
    })
}
$(window).on('scroll',function(){
    scrollProgress();
})
//Jquery
//Tabs
/* function clickTab(){
    $(".tabtitle a").click(function(e){
        e.preventDefault();
        let i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".tabcontent .tab__content-item").eq(i)
        .css({
            display: "block",
        }).siblings().css({display: "none"});
    })
}
clickTab();

//Accordion
function accordion(){
    let accTitle = $('.accordion .accordion__content-title');
    accTitle.click(function(e){
        $(this).next().stop().slideToggle(200);
        $(this).closest('.accordion__content').toggleClass('active');
        $(this).closest('.accordion__content').siblings('.active').removeClass('active').find('.accordion__content-text').stop().slideUp(200);
    })
}
accordion();




//category
let btnCreat = document.querySelector('.creatCate');
let popupCate = document.querySelector('.category');
let close_popup_form = document.querySelector('.btn__close');
btnCreat.addEventListener('click',function(e){
    popupCate.style.display='block';
})

close_popup_form.addEventListener('click',function(){
    popupCate.style.display ='none';
}); */