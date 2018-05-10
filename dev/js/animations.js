function intoView(elemento, divide){
	var divideBy = 2;
	var wWidth = $(window).width();
	var dasView = $(window).height();
		dasView += $(window).scrollTop();
	if(window.matchMedia('(min-width: 1366px)').matches){
		divideBy = 4;
	}
	if(divide){
		divideBy = divide;
	}
	var dasEl = ($(elemento).offset().top + ($(elemento).height()/divideBy));
	if(dasEl <= dasView){
		return true;
	}else{
		return false;
	}
}
function animateIt(el, anime){
	if(intoView(el)){
		el.addClass(anime);
	}
}
if(window.matchMedia('(min-width: 1366px)').matches){
	$(window).scroll(function(){
		$('body.home').each(function(){
			var shelfFull = $('.shelf-bordas-e-costura > .container');
			var shelfLeft = $('.shelf-corte-e-acessorios .shelf-left');
			var shelfRight = $('.shelf-corte-e-acessorios .shelf-right');
			var tipBar = $('main .tip-bar');
			var printText = $('section.print-text');
			var servicose = $('section.servicos-e-cursos');
			var canal = $('section.canal-youtube');
			var servicos = $('section.servicos');
			var face = $('section.blog').first();
			var blog = $('section.blog').last();
			var minibanners = $('.minibanners-services');
			
			animateIt(tipBar, "visible");
			animateIt(printText, "visible");
			animateIt(shelfFull, "visible");
			animateIt(shelfLeft, "visible");
			animateIt(shelfRight, "visible");
			animateIt(servicose, "visible");
			animateIt(canal, "visible");
			animateIt(servicos, "visible");
			animateIt(face, "visible");
			animateIt(blog, "visible");
			animateIt(minibanners, 'visible');
		});
		
	});
}

$(window).scroll(function(){
	$('body.categoria').each(function(){
		var shelfSec = $('section.shelf');
		if(intoView(shelfSec, 1)){
			shelfSec.addClass('parallax');
		}else{
			shelfSec.removeClass('parallax');
		}
	});
});