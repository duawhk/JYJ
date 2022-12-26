//제이쿼리 방식으로 DOM, 이벤트, Data 핸들링
//read == DOMContentLoaded 와 같은 의미
$(document).ready(function(){

    const $aside = $("aside");
    const $header = $("header");
    const headerH = $header.outerHeight();//헤더의 높이(보더,패딩 포함해서 측정)

    console.log(headerH);

    const $aboutme = $("#aboutme");
    const $mnu = $('header>.container>nav>.gnb>li>a');//6개의 메뉴셀렉팅
    let idx = 0;//현재 선택된 메뉴의 인덱스

    let arrTopVal = [];//header이후에 나타나는 section의 top값

    
    // 함수는 반복되는 코드를 많들어 놓고 사용하면 코드의 재활용 측면에서 유용하게 사용 가능
    function pageAni(topVal){
        $('html, body').stop().animate({scrollTop:topVal});
    }


    //로딩 애니메이션
    $(".loading>p").fadeOut();
    $(".loading").delay(350).fadeOut(800, function(){
        $(this).remove();//내용삭제
    });


    //load 이벤트는 컨텐츠가 페이지에 노출된 시점에 딱 한번 일어남
    //resize 이벤트는 브라우저의 크기가 바뀌면 일어남
    $(window).on('load resize', function(){

        const $h1 = $('h1');
        const $h2 = $('#visual h2');
        const $intro = $h2.parent();
        
        $("#visual").height($(window).height());
        $intro.css({
            marginTop : -$intro.height()/2
        });

        $h1.css({
            top : $h2.offset().top-100,
            marginLeft : -$h1.width()/2
        });

    
        console.log("현재 메뉴의 개수 : "+$mnu.size());
        
        //어떤 요소의 top값(문서/브라우저/body로부터의 거리)를 구하는 방법 -> .offset().top
        //각 section의 top값을 자동으로 계산하는 장점
        //반복문을 이용한 처리
        for(let i=0;i<$mnu.size();i++){
            arrTopVal[i] = $("#visual~section").eq(i).offset().top;
        }
        
    });
    
    
    console.log(arrTopVal);//[508, 1208, 2108, 2808, 3708]
    //0: 568    1: 1068    2: 1568    3: 2068    4: 2568

    $mnu.on('click', function(evt){
        //이번에 클릭한 요소의 index번호
        idx = $mnu.index(this);//0~5
        pageAni(arrTopVal[idx]-headerH+1);//fixed한 헤더의 높이값
        evt.preventDefault();
    });


    $(window).on('scroll', function(){

        let scrollTop = $(this).scrollTop();
        console.log("scrollTop = ",scrollTop);

        //오른쪽 하단 top 화살표
        if(scrollTop>150){
            //$aside.css({display:"block"});
            //$aside.show();
            $aside.fadeIn();
        }else{
            //$aside.css({display:"none"});
            //$aside.hide();
            $aside.fadeOut();
        }

        //헤더고정
        if(scrollTop>$(this).height()){
            $header.addClass('h-fixed');
            $aboutme.css({marginTop:headerH})
        }else{
            $header.removeClass('h-fixed');
            $aboutme.css({marginTop:0})
        }


        //메뉴 활성화 표시
        for(let i=0;i<$mnu.size();i++){
            if(scrollTop>=arrTopVal[i]-headerH-200){//fixed한 헤더의 높이값
                $mnu.eq(i).parent().addClass('on');
                $mnu.eq(i).parent().siblings().removeClass('on');
            }else if(scrollTop<arrTopVal[0]-headerH-200){//비주얼 슬라이드 구간
                $mnu.parent().removeClass('on');
            }
        }

    });

    //로고에 대한 클릭이벤트 구문
    $(".logo>a, aside").on('click', function(evt){
        evt.preventDefault();
        pageAni(0);
    });


    $(window).on('load', function(){
        pageAni(0);
    });

});


//#uidesign
$(function(){
    const $thmbs = $("#uidesign .gallery-thmbs>li>a");

    $thmbs.on('click', function(evt){
       evt.preventDefault();

       const imgSrc = $(this).attr('href');

       $("#uidesign .gallery-screen").css({
           'background-image' : 'url(' + imgSrc + ')'
       });

       $(this).parent().addClass('on');
       $(this).parent().siblings().removeClass('on');
    });
});