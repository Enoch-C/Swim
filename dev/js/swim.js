$(document).ready(function(){

  $(".button-rule,.rules-close").click(function(){
    $(".rules").toggleClass("rules-show");
  });
  $(".button-play").click(function(){
    $(".stage-2").removeClass("hide").siblings().addClass("hide");
    arrow();
    showobs();
    gameover();
  });
  $(".button-share").click(function(){
    $(".share").css({display: "block"});
  });
  $(".button-replay").click(function(){
    $(".stage-1").removeClass("hide").siblings().addClass("hide");
    clearInterval(hit);
  });
  $(".share").click(function(){
    $(this).css({display: "none"});
  });
});

var pos
  , move
  , dis
  , second
  , append
  , remove
  , distance
  , time
  , hit
  , obss
  , man;
function arrow(){
  move = 37;
  pos = 2;
  $(".man").css({left: move+"%"});
  $(".arrow-left").unbind().on("click",function(){
    if(pos > 1){
      pos -= 1;
      move -= 32;
      $(".man").css({left: move+"%"});
    };
  });
  $(".arrow-right").unbind().on("click",function(){
    if(pos < 3){
      pos += 1;
      move += 32;
      $(".man").css({left: move+"%"});
    };
  });
};

function showobs(){
  // var robs = 1+Math.floor(Math.random()*8)
  //   , obs = {
  //     rpos: 1+Math.floor(Math.random()*3),
  //     src: 'obs-'+robs
  //   };
  dis = 0, second = 0;
  $(".distance .num").text(dis);
  $(".time .num").text(second);
  if(!$(".stage-2").hasClass("hide")){
    append = setInterval(function(){
      $(".obss").append("<img src='/img/obs-"+(1+Math.floor(Math.random()*8))+".png' class='obs rpos-"+(1+Math.floor(Math.random()*3))+"'>");
    },3000);
    remove = setInterval(function(){
      if(document.getElementsByClassName("obs").length > 2){
        $(".obss").children().first().remove();
      };
    },3000);
    distance = setInterval(function(){
      dis += 1;
      $(".distance .num").text(dis);
    },500);
    time = setInterval(function(){
      second += 1;
      $(".time .num").text(second);
    },1000);
  };
};

function gameover(){
  obss = document.getElementsByClassName("obs")
  , man = document.getElementsByClassName("man");
  hit = setInterval(function(){
    for(var i=0;i<obss.length;i++){
      var obsbottom = obss[i].offsetTop + obss[i].clientHeight;
      if(obsbottom > man[0].offsetTop && obss[i].className == "obs rpos-"+pos){
        clearInterval(append);
        clearInterval(remove);
        clearInterval(time);
        clearInterval(distance);
        $(".obss").children().remove();
        $(".stage-3").removeClass("hide").siblings().addClass("hide");
        setTimeout(function(){
          $(".end,.count").addClass("end-show");
        },500);
        $(".count").text("本局共游了"+dis+"米");
      };
    };
  },500);
};

// function obs(rpos,src){
//   this.rpos = rpos;
//   this.src = src;
// };


