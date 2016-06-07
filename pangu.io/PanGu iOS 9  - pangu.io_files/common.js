$(function(){
	window.setTimeout(function(){
		$('.jb-download > .download').css('opacity', '1');
	}, 1100);
	window.setTimeout(function(){
		$('.jb-txt > .txt-1').css('opacity', '1');
	}, 1600);
	window.setTimeout(function(){
		$('.jb-txt > .txt-2').css('opacity', '1');
	}, 1900);
	window.setTimeout(function(){		
		$('.app-info').css('opacity', '1');
		$('.jb-txt > .txt-3').css('opacity', '1');
	}, 2300);
	
	var window_height = $(window).height();
	$('body').css('height', window_height).css('width', $(window).width());
	$(window).resize(function(){
		$('body').css('height', $(window).height()).css('width', $(window).width());
	})
	var box_n = 0;
	var leng = 5;
	var index = 0;
	var status_stop = null;
	var web_status = false;
	var hover_status = false;
	var web_switch = function(index_for){
		$('#point-list>li').removeClass('hover');
		index_for > 0 ? index_for = 0 : '';
		Math.abs(index_for) === leng ? index_for = -leng + 1 : '' ;
		$('.main').css('transform', 'translate3d(0px,'+(index_for * 100)+'%,0px)');
		$('.main').css('-webkit-transform', 'translate3d(0px,'+(index_for * 100)+'%,0px)');
		if(index_for === 0){
			window.setTimeout(function(){
				$('#point-list>li').eq(0).addClass('hover');
				web_status = false;
			},50)
		}
		if(index_for === -1){
			$('#point-list>li').eq(1).addClass('hover');
			window.setTimeout(function(){
				setTimeout(function(){
					$('#box2').addClass('left_center');
					setTimeout(function(){
						$('#box2').css('opacity', '1');
						$('#box_right2').addClass('right_center_40');
						setTimeout(function(){
							$('#box_right2').css('opacity', '1');
						}, 1000);
					}, 1000);
				},100);
				web_status = false;
			},100);
		};
		if(index_for === -2){
			$('#point-list>li').eq(2).addClass('hover');
			window.setTimeout(function(){
				setTimeout(function(){
					$('#help-msg').addClass('hidden_show_1');
					setTimeout(function(){
						$('#help-content > .forum').addClass('hidden_show_1');
						setTimeout(function(){
							$('#help-msg, #help-content > .forum').css('opacity', '1');
						}, 600);
						setTimeout(function(){
							$('#help-content').addClass('bg_lr');
							setTimeout(function(){
								$('#help-content').addClass('help-content');
							}, 1000);
						}, 100);
					}, 600);
				},100);
				web_status = false;
			},100)	
		};
		if(index_for === -3){
			$('#point-list>li').eq(3).addClass('hover');
			window.setTimeout(function(){
				setTimeout(function(){
					$('.Screen4').addClass('toggle-4bg');
					setTimeout(function(){
						$('#box3 > dl').eq(0).addClass('hidden_show_3');
						setTimeout(function(){
							$('#box3 > dl').eq(0).css('opacity', '1');
						}, 1200);
						$('#box3 > dl').eq(1).addClass('hidden_show_1');
						setTimeout(function(){
							$('#box3 > dl').eq(1).css('opacity', '1');
						}, 600);
						$('#box3 > dl').eq(2).addClass('hidden_show_2');
						setTimeout(function(){
							$('#box3 > dl').eq(2).css('opacity', '1');
						}, 900);
						$('.Screen4').css('background-position', 'bottom right');
						setTimeout(function(){
							$('#box_bottom').addClass('hidden_show_1');
							setTimeout(function(){
								$('#box_bottom').css('opacity', '1');
							}, 1000);
						}, 1200);
					}, 500);
				},500);
				web_status = false;
			},100)	
		};
		if(index_for === -4){
			$('#point-list>li').eq(4).addClass('hover');
			window.setTimeout(function(){
				setTimeout(function(){
					$('#box5').addClass('hidden_show_1');
					setTimeout(function(){
						$('#box5').css('opacity', '1');
						$('#box5-txt').addClass('hidden_show_1');
						$('#box5-txt2').addClass('hidden_show_2');
						$('#box5-txt3').addClass('hidden_show_3');
						setTimeout(function(){
							$('#box5-txt').css('opacity', '1');
						}, 600);
						setTimeout(function(){
							$('#box5-txt2').css('opacity', '1');
						}, 900);
						setTimeout(function(){
							$('#box5-txt3').css('opacity', '1');
						}, 1200);
					}, 600);
				}, 100);
				web_status = false;
			}, 100)	
		};
		web_status = true;
		index = index_for;
	}
	$('#box3 > dl').hover(function(){
		box_n = $(this).index();
		if(box_n != 1){
			$('#box3').find('dl').removeClass('box-hover-s');
			$('#box3 > dl').eq(box_n).addClass('box-hover-s');
		}else{
			$('.box-hover').addClass('box-hover-s2');
		}
	},function(){
		if(box_n != 1){
			$('#box3 > dl').eq(box_n).removeClass('box-hover-s');
			$('#box3 > dl').eq(box_n).addClass('box-down');
		}else{
			$('.box-hover').removeClass('box-hover-s2');
			$('.box-hover').addClass('box-down2');
		}
	});

	$('#point-list>li').click(function(){
		index = $(this).index();
		web_switch(-index);
	});
	$('.go_top').click(function(){
		web_switch(0);
	});
	$('.fix-top').click(function(){
		$("html, body").animate({scrollTop:0}, 500);
	});
	$('#navbar-toggle').click(function(){
		$('#mobile-link').toggle();
	})
	$(window).mousewheel(function(event, delta, deltaX, deltaY){
		if (isNaN(deltaY)){
            return 
        }
		if(deltaY && deltaY != ''){
			index_n = index + deltaY
			if(index > 0 || index < -4){
				return
			}
			if(web_status == false){
				if( deltaY > 1){
					deltaY = 1;
				}
				if(deltaY < -1){
					deltaY = -1;
				}
				clearTimeout(status_stop);
				status_stop = window.setTimeout(function(){
					web_switch(index += deltaY);
				}, 80);
			}else{
				web_status = true;
			}
		}
	});
	document.onkeydown = function(event) {
		var c = window.event.keyCode;
		if (c==40||c==32||c==39) {
			clearTimeout(status_stop);
			status_stop = window.setTimeout(function(){
				web_switch(index += -1);
			}, 80);
		}else if (c==38||c==37) {
			clearTimeout(status_stop);
			status_stop = window.setTimeout(function(){
				web_switch(index += 1);
			}, 80);
		}
	}
})