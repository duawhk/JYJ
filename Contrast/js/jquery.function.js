$(function(){
  
  const $container = $('.slides > .slides-container');
  const $indicator = $('.slides > .slides-pagination > li > a');
  const $btnPrev = $('.prev');
  const $btnNext = $('.next');

  let nowIdx = 0;


  function moveFn(){
    
    $container.stop().animate({
      left : -1400 * nowIdx
    },400,'easeInOutCubic',function(){});

  }

  //활성화
  function indicatorFn(){
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
  }

  $indicator.on('click', function(evt){

    evt.preventDefault();

    nowIdx = $indicator.index(this);

    moveFn();
    indicatorFn();
  });

  //다음 버튼
  $btnNext.on('click', function(evt){

    evt.preventDefault();

    if(nowIdx<3){
      nowIdx ++;
    }else{
      nowIdx = 0;
    }

    $container.stop().animate({left:-1400},800,'easeInOutCubic',function(){

      const $slides = $('.slides > .slides-container > li');
      $slides.first().appendTo($container);
      $container.css({left:0});

    });
    indicatorFn();
  });

  //이전 버튼
  $btnPrev.on('click', function(evt){

    evt.preventDefault();

    if(nowIdx>0){
      nowIdx --;
    }else{
      nowIdx = 3;
    }

    const $slides = $('.slides > .slides-container > li');

    $slides.last().prependTo($container);
    $container.css({left: -1400});
    $container.stop().animate({left:0},800,"easeInOutCubic",function(){});

    indicatorFn();
  });

  //무한 롤링
  setInterval(function(){
    
    $container.stop().animate({left : -1400},800,'easeInOutCubic',function(){

      const $slides = $('.slides > .slides-container > li');
      $slides.first().appendTo($container);
      $container.css({left:0});     
    });    
    
    $btnNext.trigger('click');
  },4000);
  

});