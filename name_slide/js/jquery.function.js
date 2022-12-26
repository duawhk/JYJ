$(function(){

  const $indicator = $('.slide > .indicator > ol > li > a');
  const $slideContainer = $('.slide-container');
  let nowIdx = 0;

  function moveFn(){

    //활성화
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    
    //이동
    $slideContainer.stop().animate({
      left : -1000*nowIdx
    },500,'easeInOutCubic',function(){});
  }

  $indicator.on('click', function(evt){

    evt.preventDefault();

    nowIdx = $indicator.index(this);
    moveFn();
  });

  setInterval(function(){
    
    if(nowIdx<4){
      nowIdx ++
    }else{
      nowIdx = 0
    }
    moveFn();
  },3000);


});