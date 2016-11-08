$(function(){
			
			//设为首页和加入收藏
			$('#toHome').on('click', function () {
				SetHome(this, window.location);
			});
			$('#store').on('click', function () {
				AddFavorite(window.location, document.title);
			});
	
			//轮播图
			$('#silder').imgSilder({
					s_width:692, //容器宽度
					s_height:292, //容器高度
					is_showTit:true, // 是否显示图片标题 false :不显示，true :显示
					s_times:2000, //设置滚动时间
					css_link:'css/slider.css'
			});
			
			
			//排行榜翻页
			
			$('.ph_head .ph_r').click(function(){
				var v = $('.ph_head .ph_tt span:visible');
				if(v.index()+1 < $('.ph_head .ph_tt span').size()){
					$('.ph_head .ph_tt span').hide();
					v.next().show();
					var vv = $('.ph_body table:visible');
					$('.ph_body table').hide();
					vv.next().show();
				}
			});
			$('.ph_head .ph_l').click(function(){
				var v = $('.ph_head .ph_tt span:visible');
				if(v.index() > 0){
					$('.ph_head .ph_tt span').hide();
					v.prev().show();
					var vv = $('.ph_body table:visible');
					$('.ph_body table').hide();
					vv.prev().show();
				}
			});
	
		//弹窗
		$('#openLogin').click(function(){
			
			 showAlert('.alert_longin');
		});
		$('.reg_btn').click(function(){
			
			 showAlert('.alert_reg1');
		});
		$('.btn_lingjiang').click(function(){
			
			 showAlert('.alert_yan');
		});
	
		//关闭弹窗
	$('.alert .alert_close').click(function(){
		
		closeAlert(this);
		
	});
	
	
	
	//浮动二维码
	$('body').append('<div class="ffloat close alpha" style="display:none;"></div>'
	+'<div class="ffloat open alpha">'
		+'<div class="cclose "></div>'
	+'<img class="qr_1" src="images/qrCode_1.png"/>'
	+'<img class="qr_2" src="images/qrCode_1.png"/>'
	+'</div>');
	
	setTimeout(function(){$('.ffloat').toggle();},3000);
	
	$('.ffloat.close,.ffloat .cclose').click(function(){
		$('.ffloat').toggle();
	});
	
	
	
});

function showAlert(cl,msg){
	var sTop = $(document).scrollTop();

     if ($.browser.msie && ($.browser.version == "7.0")) sTop = 0;

     //$('body').css('overflow', 'hidden');
     $('.mask').height($(document).height());
     
     $(cl).css('left', (($(window).width() - $(cl).width()) / 2) + 'px');
     $(cl).css('top', (250 + sTop) + 'px');
	
	if(msg){
		$(cl).find('.alert_con p').html(msg);
	}
	
	$('.mask').fadeTo(0, 0.6);
	$(cl).show();
}
function closeAlert(_this){
	$(_this).parents('.alert').hide();
		$('.mask').hide();
		$('.alert').each(function(){
			if($(this).css('display')=='block'){
				$('.mask').fadeTo(0, 0.6);
			}
		});
}


    //加入收藏的函数
  function AddFavorite(sURL, sTitle) {
        try {
            window.external.addFavorite(sURL, sTitle);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }

    //设为首页的函数
    function SetHome(obj, vrl) {
        try {
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(vrl);
        }
        catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("设为首页失败！");
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', vrl);
            } else {
                alert("设为首页失败！");
            }
        }
    }