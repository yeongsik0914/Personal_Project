let slideWrapper = $('.slidewrapper'),
    slides = slideWrapper.find('li'),
    currnetIdx = 0,
    timer = undefined,
    pager = slideWrapper.find('.pager a');

    //슬라이드 배치

    slides.each(function(idx){
        $(this).css({left:`${idx*100}%`});
    });

    //페이저 슬라이드 작동
    pager.click(function(e){
        e.preventDefault();
        let idx = $(this).index();
        moveSlide(idx);
    });

    //moveslide 함수
    function moveSlide(i){
        if(currnetIdx === i) return;
        let currnetSlide = slides.eq(currnetIdx);
        let nextSlide = slides.eq(i);

        // 다음 슬라이드 순간 left 100%, animate 0
        // 현재 슬라이드 순간 left 0%, animate -100%
        nextSlide.css({left:'100%'}).animate({left:'0%'});
        currnetSlide.animate({left:'-100%'});

        currnetIdx = i;

        //모든 페이저에서 active 제거 현재 번호에 맞는 요소에 active 추가
        pager.removeClass('active');
        pager.eq(currnetIdx).addClass('active');   
    }

    function autoSlide(){
        if(timer == undefined){
            timer = setInterval(()=>{
                //let ni = (currnetIdx + 1)%slides.length;
                let ni = currnetIdx + 1;
                if(ni === slides.length){
                    ni=0;
                }
                moveSlide(ni);
            }, 5000);
        }
       
    }
    autoSlide();
    slideWrapper.mouseenter(function(){
        clearInterval(timer);
        timer = undefined;
        // console.log(timer);
    })
    .mouseleave(function(){
        autoSlide();
    });

   