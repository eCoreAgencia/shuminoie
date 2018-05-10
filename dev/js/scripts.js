// $.getScript('http://io.vtex.com.br/vtex.js/2.2.0/vtex.min.js');


// <script type="text/javascript">
// 	var _st_account = 1027;
// 	(function () {
// 		var ss = document.createElement('script');
// 		ss.type = 'text/javascript';
// 		ss.async = true;
// 		ss.src = '//app.shoptarget.com.br/js/tracking.js';
// 		var sc = document.getElementsByTagName('script')[0];
// 		sc.parentNode.insertBefore(ss, sc);
// 	})();

// </script>

(function() {
  var method;
  var noop = function() {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    if (!console[method]) {
      console[method] = noop;
    }
  }
});

jQuery.fn.simulateClick = function() {
	return this.each(function() {
		if ('createEvent' in document) {
			var doc = this.ownerDocument,
			evt = doc.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			this.dispatchEvent(evt);
		} else {
			this.click();
		}
	});
}


var body = $('body'),
	htmlBody = $('html, body'),
	$document = $(document),
	header = $('#header'),
	submenuDesktopWrapper = $('.js-submenu-wrap'),
	userSubmenu = $('.submenu-user'),
	sidePanelMobile = $('.side-panel'),
	mobileSubmenu = $('.submenu-mobile'),
	minicart = $('.minicart'),
	slide = $('.slide'),
	slideShelf = $('.slideShelf'),
	slideBrands = $('.servicos-e-cursos .servicos'),
	carousel = $('.shelf-carousel'),
	backToTop = $('.js-back-to-top'),
	shelf = $('.prateleira'),
	paginatedShelf = $('.prateleira[id*=ResultItems]'),
	orderList = $('.order-list'),
	formNews = $('.newsletter'),
	depCatBus = $('.dep-cat-bus'),
	duvidasFrequentes = $('.duvidas'),
	pagProduto = $('.produto'),
	sidebar = $('.sidebar');

function masterDataContato(){
    var jsonSaveDadosUser = {
        "nome": $("#cl_nome").val(),
        "email": $("#cl_email").val(),
        "tel": $("#cl_telefone").val(),
        "empresa": $("#cl_empresa").val(),
        "mensagem": $("#cl_mensagem").val(),
    };

    var storename = 'shumi';
    var dataEntity = 'FC';

    var urlSaveDadosUser = 'http://api.vtexcrm.com.br/'+storename+'/dataentities/'+dataEntity+'/documents/';

    $.ajax({
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(jsonSaveDadosUser),
        type: 'PATCH',
        url: urlSaveDadosUser,
        success: function (data) {
          console.log(data);
          $("div#messageSuccess").removeClass("hide");
          $("#cl_nome").val("");
          $("#cl_email").val("");
          $("#cl_telefone").val("");
          $("#cl_empresa").val("");
          $("#cl_mensagem").val("");
          alert("Mensagem Enviada com sucesso!");
        },
        error: function (data) {
          console.log(data);
          alert("Houve um erro ao enviar a mensagem. Tente novamente mais tarde");
        }
    });
}


$(function() {

	// Smooth Scrolling //

		$('a[href*="#"]').click(function(event){
		  	event.preventDefault();
			var target = $(this).attr('href');
			try{
				var targetOffset = ($(target).offset().top) - 250;
			}	  
			catch(err){}
			$('html, body').animate({ scrollTop: targetOffset}, 300);
		});

	// Smooth Scrolling //

	// Ajuste Meus Pedidos //
		if (orderList.length > 0) {
			orderList.find('link').remove();
			orderList.find('.page-header').unwrap('.container');
		}
	// Ajuste Meus Pedidos //


	// Tabs Shelf Home //
		$('.tabs-destaque a').click(function(){
			$('.tabs-destaque a').removeClass('active');
			var guardaClass = $(this).attr('class');
			var findShelfs = $(this).parent();
			var teste = findShelfs.parent();
			var testeDois = teste.parent();
			var testeTres = testeDois.parent();
			var mamae = testeTres.find('div');
			mamae.removeClass('active');
			$('.prateleiras-destaque div.shelf-'+guardaClass+'').addClass('active');
			$(this).addClass('active');
			$('.slick-next').simulateClick('click');
		});

	// Tabs Shelf Home //


	// BreadCrumb Ajuste Texto //
		try {
			$('.bread-crumb').find('li:first-child a').text('Home');
		} catch (e) {}


	// Remocao de Li HelperComplement Prateleira
		if ($('.helperComplement').length) {
			$('.helperComplement').remove();
		}
	// Remocao de Li HelperComplement Prateleira


  	// Voltar ao Topo
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 450) {
				$('.js-back-to-top').addClass('active');
			} else {
				$('.js-back-to-top').removeClass('active');
			}
		});

		body.on('click', '.js-back-to-top', function(event) {
		    event.preventDefault();
		    htmlBody.animate({ scrollTop: 0 }, 300);
		});

		body.on('click', '.bt-open-news', function(event) {
		    event.preventDefault();
		    htmlBody.animate({ scrollTop: 3500 }, 300);
		});
		body.on('click', '.rating-click-here', function(event) {
		    event.preventDefault();
		    htmlBody.animate({ scrollTop: 3500 }, 300);
		});
  	// Voltar ao Topo

	// Compra Rapida
		body.on('click', '.btn-fast-buy', function(event) {
			event.preventDefault();
			var url = $(this).attr('href');
			$.get(url, function(data) {
				vtexjs.checkout.getOrderForm().done(function(orderForm) {
					console.log(orderForm);
					htmlBody.animate({ scrollTop: 0 }, 300);
				});
			});
		});
	// Compra Rapida

	// Slider
		if (slide.length > 0) {
			slide.slick({
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 5000,
				pauseOnHover: true,
				arrows: true,
				dots: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		}
	// Slider

	// slideShelf
		if (slideShelf.length > 0) {
		    $('.home').find('.shelf-bordas-e-costura .slideShelf .prateleira').find('ul').slick({
				adaptiveHeight: true,
				autoplay: false,
				arrows: true,
				dots: false,
				mobileFirst: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 479,
						settings: {
							slidesToShow: 2
						}
					}
				]
		    });
		    $('.home').find('.shelf-corte-e-acessorios .slideShelf .prateleira').find('ul').slick({
				adaptiveHeight: true,
				autoplay: false,
				arrows: true,
				dots: false,
				mobileFirst: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 479,
						settings: {
							slidesToShow: 2
						}
					}
				]
		    });
		}
	// slideShelf

	// slideShelf
		if (slideBrands.length > 0) {
		    $('.home').find('.servicos-e-cursos .servicos').find('.slider').slick({
				adaptiveHeight: true,
				autoplay: false,
				arrows: false,
				dots: true,
				mobileFirst: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1
						}
					},
					{
						breakpoint: 479,
						settings: {
							slidesToShow: 1
						}
					}
				]
		    });
		}
	// slideShelf

	// Menu SidePanel //
		$('header .js-open-mobile-menu').click(function(){
			$(this).toggleClass('active');
			$('header .menu-header').toggleClass('slideActive');
		});
		$("header nav.menu .has-sub .js-open-sub").click(function() {
		  $(this).toggleClass('active');
		  $(this).next().toggleClass("slideActive");
		});
	// Menu SidePanel //

	function calcDesc(preco, desconto){
		desconto = desconto.match(/(\(\d+%\)|\(\d+\.\d{2}%\))/g)[0].split('%')[0].split('(')[1]/100;
		preco = preco.replace('.','').replace(',','.');
		var precoDesc = (preco*desconto).toFixed(2);
		var total = (preco - precoDesc).toFixed(2);
		total = total.replace('.',',');
		total = total.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
		return total;
	}

	// Desconto Boleto //
		$('.prateleira li').each(function(){
			if($(this).find('.best-price').length){
				var desconto = $(this).find('p[class^="flag desconto-no-boleto"]').text();
				var preco = $(this).find('.best-price').text().replace(' ','').split('$')[1];
				var total = calcDesc(preco, desconto);
				$(this).find('.price').append('<span class="preco-boleto">ou R$ '+total+' no boleto</span>');
			}
		});
		$('body.produto .buy-box').each(function(){
			if($(this).find('.skuBestPrice').length){
				var desconto = $(this).find('p[class^="flag desconto-no-boleto"]').text();
				var preco = $(this).find('.skuBestPrice').text().replace(' ','').split('$')[1];
				var total = calcDesc(preco, desconto);
				$(this).find('p.descricao-preco').append('<em class="preco-boleto">ou R$ '+total+' no boleto</em>');
			}
		});
		// Alteração sku //
			if($('body.produto .buy-box .skuBestPrice').length){
				var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
				var elementChange    = new MutationObserver (function(){
				    $('.buy-box').each(function(){
				        var desconto = $(this).find('p[class^="flag desconto-no-boleto"]').text();
				        var preco = $(this).find('.skuBestPrice').text().replace(' ','').split('$')[1];
				        var total = calcDesc(preco, desconto);
				        $(this).find('p.descricao-preco').append('<em class="preco-boleto">ou R$ '+total+' no boleto</em>');
				    });
				});
				$(".buy-box .productName").each ( function () {
				    elementChange.observe (this, {childList: true, characterData: true, attributes: true, subtree: true });
				} );
			}
		// Alteração sku //
		
	// Desconto Boleto //

	// Usuário deslogado //
		$(window).load(function(){
			vtexjs.checkout.getOrderForm().done(function(orderForm) {
		    	if(!orderForm.loggedIn){
		    		$('header span.logout').remove();
		    		if(window.matchMedia('(max-width: 1365px)').matches){
						$('header nav.menu ul').append('<li class="menu-item"><a href="/login">Entrar</a></li>');
					}
		    	}else if(window.matchMedia('(max-width: 1365px)').matches){
					$('header nav.menu ul').append('<li class="menu-item"><a href="/logout">Sair</a></li>');
				}
		    });
	   	});
	// Usuário deslogado //
	
	// Frete Grátis //
		$('.prateleira li').each(function(){
			if($(this).find('.best-price').length){
				var preco = $(this).find('.best-price').text().replace(' ','').split('$')[1];
				preco = preco.replace('.','').replace(',','.');
				if(preco > 200){
					$(this).find('.flag-frete').append('<p class="flag frete-gratis">Frete grátis SP</p>');
				}
			}
		});

		$('body.produto .buy-box').each(function(){
			if($(this).find('.skuBestPrice').length){
				var preco = $(this).find('.skuBestPrice').text().replace(' ','').split('$')[1];
				preco = preco.replace('.','').replace(',','.');
				if(preco > 200){
					$(this).find('.productReference').after('<p class="flag frete-gratis">Frete grátis SP</p>');
				}
			}
		});

		$('.prateleira').find('span[data-category^="Máquinas de bordar"], span[data-category^="Bordado"], span[data-category^="Costura"]').each(function(){
		    if($(this).find('span.flag-frete p.flag.frete-gratis').length){
		        $(this).find('span.flag-frete p.flag.frete-gratis').text('FRETE GRÁTIS para todo o Brasil');    
		    }else{
		        $(this).find('span.flag-frete').append('<p class="flag frete-gratis">FRETE GRÁTIS para todo o Brasil</p>');    
		    }
		});
	// Frete Grátis //



	// Smart Research //
		if (sidebar.length > 0) {
			try {
				sidebar.find('input[type="checkbox"]').vtexSmartResearch({
					elemLoading: '',
					returnTopText: '',
					elemLoading:'<i class="shelf__loading"></i>',
					filterScrollTop: function(shelfOffset) {
						return 20;
					}
				});
			} catch(e) {}
		}
	// Smart Research //

	// Resultado da busca //

		var termoBusca = $('body.resultado-busca .searchResultsTime .resultado-busca-termo .value').text();
		$('body.resultado-busca h3.tlt-shelf').append(termoBusca);

	// Resultado da busca //

	// Frete Gratis Aberto //
		try {
			$document.ready(function(){
				$('.shipping-value').simulateClick('click');

				$(".box-clipping:nth-child(3n+1)").addClass("colum-edit");
				$(".box-clipping:nth-child(3n+2)").addClass("no-margin pull-text-left");
				$(".box-clipping:nth-child(3n+3)").addClass("no-margin pull-text-right");				

				// Buy Button Text //
					$('.buy-button').text('Comprar');
				// Buy Button Text //


				// Slide Toggle Product Description //
					$('.active-desc').click(function(){
						$(this).next().slideToggle();
					});	
				// Slide Toggle Product Description //


				// Relacionados Vazio //
					if($('.shelfRelacionados li').length == 0){
						$('.shelfRelacionados').remove();
					}	
				// Relacionados Vazio //

			});
		} catch(e) {}
	// Frete Gratis Aberto //

	function unHide(t){
		setTimeout(function(){
			$('header').removeClass('ha-hide');
			$('header').removeClass('ha-hidding');
		}, t);
	}

	// Menu Persistente Begin //
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if (scroll >= 350) {
				$('header').addClass('menu-persistente');
				$('body').addClass('top-height-active');
			} else {
				$('.menu-persistente').addClass('ha-hidding');
				$('.menu-persistente').addClass('ha-hide');
				unHide(99);
				$('header').removeClass('menu-persistente');
				$('body').removeClass('top-height-active');
			}
		});

		// if($('body.scanncut').length > 0){
		// 	$(window).scroll(function() {
		// 		var scroll = $(window).scrollTop();
		// 		if (scroll >= 350) {
		// 			$('nav.menu').addClass('menu-persistente');
		// 		} else {
		// 			$('nav.menu').removeClass('menu-persistente');
		// 		}
		// 	});
		// }

		// if($('body.impressora-textil').length > 0){
		// 	$(window).scroll(function() {
		// 		var scroll = $(window).scrollTop();
		// 		if (scroll >= 350) {
		// 			$('nav.menu').addClass('menu-persistente');
		// 		} else {
		// 			$('nav.menu').removeClass('menu-persistente');
		// 		}
		// 	});
		// }

    // Menu Persistente END //

    // Scripts Pagina de Produto //
    	// Campos Produto //
			$('.product-info menu button[name=productDescription]').addClass('active');
			$('.product-info .info article.productDescription').addClass('active');
	    	$('.product-info menu button').click(function(){
				$('.product-info menu button').removeClass('active');
				$(this).addClass('active');
				var prodCampo = $(this).attr('name');
				$('.product-info .info .active').removeClass('active');
				$('.product-info .info article.'+prodCampo).addClass('active');
			});
			$(window).load(function(){
				$("#___rc-p-id").each(function(index) {
					var id = $(this).attr("value");
					var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";

					$.getJSON(data, function(data) {
						$.each(data, function(key, val) {
						    var faq = val.faq;
						    var vids = val.videos;
						    var down = val.download;
						    var acss = val.acessorios;
						    var spec = val.especificacao_tecnica;

						    var where = $('.product-info .info');
						    
						    where.find('.faq').append(faq);
						    where.find('.vids').append(vids);
						    where.find('.spec').append(spec);
						    where.find('.download').append(down);
						    where.find('.acessorios').append(acss);

						    var hasStock = 0;
						    for(i=0; i < val.items.length; i++){
						    	hasStock += val.items[i].sellers[0].commertialOffer.AvailableQuantity;
						    }
						    if(!hasStock){
						    	$('.choose-skus .skuList input[type=radio]:first-of-type').simulateClick();
						    }
						    $('.product-info .info article').each(function(){
					        	if(!($(this).children().length)){
					        		var buttonName = $(this).attr('class').split()[0];
					        		$('.product-info .menu button[name="'+buttonName+'"]').remove();
					        	}
					        });
						});
					});
				});
			});
	    // Campos Produto //
	    if (pagProduto.length > 0) {
			try {
				$document.ready(function() {
				// Script Quantidade de Produtos END. Pego a quantidade de produtos pelo val e jogo na URL do botao.
					$('.selecao-sku .more').click(function(){
						var $input = $(this).prev();
						$input.val( +$input.val() + 1 );
						var opt_value = $input.val();
						var link = $(this).next();
						var currentURL = $('.buy-button').attr('href');
						var nomedoproduto = currentURL.split(/\&/)[0];
						$('.buy-button').removeAttr('href');
						$('.buy-button').attr('href', nomedoproduto + '&qty=' + opt_value + '&seller=1&redirect=false&sc=1');
					});

					$('.selecao-sku .less').click(function(){
						var $input = $(this).next();
						$input.val( +$input.val() - 1 );
						var opt_value = $input.val();
						var encontraInput = $(this).next();
						var currentURL = $('.buy-button').attr('href');
						var nomedoproduto = currentURL.split(/\&/)[0];

						$('.buy-button').removeAttr('href');
						$('.buy-button').attr('href', nomedoproduto + '&qty=' + opt_value + '&seller=1&redirect=false&sc=1');
					});
		        // Script Quantidade de Produtos END

				});
			} catch(e) {}
	    }
	    
	    // Produto esgotado //

	// Produto esgotado //
			
    // Scripts Pagina de Produto //


  	// Scripts Departamento //
		if($(depCatBus).length > 0){
			// Adicionando classe nos elementos do Ordernar Por quando ativos
			if(window.location.href.indexOf("OrderByTopSaleDESC")!=-1){
				$(".main-category__orderBy li:nth-child(2) a").addClass("active");
			}
			if(window.location.href.indexOf("OrderByReleaseDateDESC")!=-1){
				$(".main-category__orderBy li:nth-child(3) a").addClass("active");
			}
			if(window.location.href.indexOf("OrderByPriceDESC")!=-1){
				$(".main-category__orderBy li:nth-child(4) a").addClass("active");
			}
			if(window.location.href.indexOf("OrderByPriceASC")!=-1){
				$(".main-category__orderBy li:nth-child(5) a").addClass("active");
			}
			// Adicionando classe nos elementos do Ordernar Por quando ativos
		}
  	// Scripts Departamento //


        // Scripts Modal //
    // Open Modal //
    // Open Modal //
        // Open Modal //

        // Close Modal //
        $('.close-modal, .bg_modal').click(function() {
            $('.modal-opacity').fadeOut(600);
            $('body').removeClass('modal-active');
            $('.modal-content').remove();
        });
        $(document).keyup(function(ev) {
            if (ev.keyCode == 27)
            $('.modal-opacity').fadeOut(600);
            $('body').removeClass('modal-active');
        });
    // Close Modal //
    
    // Render newsletter //
    	$(function(){
  			if(!(localStorage.getItem("shumi-newsletter-popup"))){
				$('body.home').each(function(){
					var newsLetter = '<div class="newsletter-popup-wrapper"><div class="newsletter-popup"><h2>Newsletter</h2><h3>Bem-vindo!</h3><p>Inscreva-se na nossa lista e saiba de tudo em primeira mão!</p><form action="" method="POST" class="form-newsletter" data-module="newsletter"><input type="hidden" name="newsInternalPart" value="newsletter" /><input type="hidden" name="newsInternalPage" value="_" /><input type="hidden" name="newsInternalCampaign" value="newsletter:opt-in" /><fieldset class="nome"><input type="text" name="newsletterClientName" id="cl_nome" class="nome newsletter-client-nome" placeholder="Digite seu nome" data-validation="required" data-msg-required="Preencha o seu nome"/></fieldset><fieldset class="email"><input type="text" name="newsletterClientEmail" id="cl_email" class="email" placeholder="Digite seu e-mail" data-validation="required email" data-msg-required="Preencha o seu email" data-msg-email="O e-mail que você inseriu está incorreto" /></fieldset><button type="submit" class="newsletter-button-ok submit">Cadastrar</button></form><button id="newsletter-close">X</button></div></div>'
					$(this).append(newsLetter);
				});
			}
			// Newsletter close //
				$('.newsletter-popup #newsletter-close').click(function(){
					$('.newsletter-popup-wrapper').hide();
					localStorage.setItem("shumi-newsletter-popup", "true");
				});
			// Newsletter close //
		});
    // Render newsletter //

    



	// Scripts Modal //
	    // Remocao Loading Meus Pedidos//
			try {
				$document.ajaxStop(function() {
					orderList.parents('html').removeClass('is-loading');
				});
			} catch(e) {}
	    // Remocao Loading Meus Pedidos//


	    // Simulate Click Search //
			try {
				$document.ready(function(){
					$('.btn-search').click(function(){
						$('.btn-buscar').simulateClick('click');
					});
				});
			} catch(e) {}
	    // Simulate Click Search //

	    // Scripts Departamento //
			if($(duvidasFrequentes).length > 0){

				// Slide Toggle itens
					$(".tab span").click(function() {
						$(this).toggleClass("active");
						$(this).next().slideToggle();
					});
				// Slide Toggle itens

			}
	  	// Scripts Departamento //
	// Scripts Modal //

	// App instagram //
		$('#insta-app').each(function(){
			var Class = '';
			var elementClass = $(this).attr('class');
			if(elementClass){
				Class = elementClass;
			}
			$(this).replaceWith('<ul id="insta-app" class="'+Class+'"></ul>');
			var count = 16;
			var userId = '1657718611';
			var accessToken = '1657718611.4b09eb8.66504be972cb41e184a97bf07cea9434';
			$.ajax({
			    url: 'https://api.instagram.com/v1/users/'+userId+'/media/recent/?count='+count+'&access_token='+accessToken,
			    dataType: 'JSONP',
			    jsonpCallback: 'callback',
			    type: 'GET',
			}).done(function(data){
				var post = data.data;
				console.log(post);
				for(i=0; i< post.length; i++){
					var photo = '<li><a href="'+post[i].link+'"><img src="'+post[i].images.thumbnail.url+'"/></a></li>'
					$('#insta-app').append(photo);
				}
			});
		});
	// App instagram //

	// Counter BlackFriday //
		$('body.blackFriday').find('.countDownCounter').each(function(){
			function calcDis(){
				var distance = dateTime - Date.now();
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		        if (days < 10) days = '0'+days;
		        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		        if (hours < 10) hours = '0'+hours;
		        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		        if (minutes < 10) minutes = '0'+minutes;
		        return [days,hours,minutes];
			}
			function renderCounter(_this, now){
				var component = '<img class="fundo" src="/arquivos/contador_shumi01.png"/><div class="wrapper"><div class="days"><em class="DD">'+now[0]+'</em><span>Dia';
				if (now[0] > 1) component += 's';
				component += '</span></div><div class="hours"><em class="HH">'+now[1]+'</em><span>Horas</span></div><div class="minutes"><em class="mm">'+now[2]+'</em><span>Minutos</span></div></div>';
				$(_this).html(component);
				if(now[0] == "00" && now[1] == "00" && (now[2] == "00" || now[2] == 00 || now[2] == 0)) {
					$(_this).remove();
					clearInterval(counterInterval);
				}
			}
			var _this = $(this);
			var dateTime = new Date($(this).attr('data-endTime'));
			var now = calcDis();
			console.log('Das now', now);
			if(!(now[0] == "00" && now[1] == "00" && (now[2] == "00" || now[2] == 00 || now[2] == 0))) {
				renderCounter(_this, now);
				var counterInterval = setInterval(function(){
					var now = calcDis();
					renderCounter(_this, now);
				}, 60000);
			}
		});
	// Counter BlackFriday //

});
$(window).load(function(){

	//	Miniatura slider //
	if(window.matchMedia('(min-width: 768px)').matches){
    	$('.banners-top .slider .slick-dots li').each(function(){
			var slideNum = parseInt($(this).find('button').text())-1;
			var url = $('.banners-top .slider .slick-track .slick-slide[data-slick-index='+slideNum+']').find('img').attr('src');
			$(this).find('button').css('background-image', ('url("'+url+'")'));
		});
    }
    //	Miniatura slider //

	// Cancelar login //
    	$('#vtexIdUI-auth-selector .modal-header .close').click(function(){
			window.location.href = window.location.href.split('/login?')[0];
		});
    // Cancelar login //

});
// Fale conosco //
	function FaleConosco(){
	    var jsonSaveDadosUser = {
	        "nome": $("#cl_nome").val(),
	        "email": $("#cl_email").val(),
	        "tel": $("#cl_tel").val(),
	        "type": $("#cl_type").val(),
	        "description": $("#cl_description").val()
	    };

	    var storename = 'shumi';
	    var dataEntity = 'FL';

	    var urlSaveDadosUser = '/'+storename+'/dataentities/'+dataEntity+'/documents/';

	    $.ajax({
	        headers: {
	            'Accept': 'application/vnd.vtex.ds.v10+json',
	            'Content-Type': 'application/json',
	        },
	        data: JSON.stringify(jsonSaveDadosUser),
	        type: 'PATCH',
	        url: urlSaveDadosUser,
	        success: function (data) {
	          console.log(data);
	          $("div#messageSuccess").removeClass("hide");
	          $("#cl_nome").val("");
	          $("#cl_email").val("");
	          $("#cl_tel").val("");
	          $("#cl_type").val("");
	          $("#cl_description").val("");
	          alert("Mensagem Enviada com sucesso!");
	        },
	        error: function (data) {
	          console.log(data);
	          alert("Houve um erro ao enviar a mensagem. Tente novamente mais tarde");
	        }
	    });
	}
// Fale conosco //

// Compre Junto //
	$(window).load(function(){
		$('body').find('#divCompreJunto').each(function(){
		    $(this).find('img').each(function(){
		        this.src = this.src.replace(/-90-90/g,'-300-225');
		        this.width = 300;
		        this.height = 225;
		    });
		    $(this).find('.buy').each(function(){
		        var total = $(this).html().split('<br>')[1].split("<strong>")[0].split(':')[1];
		        total = '<span class="total">Valor total:<strong>'+total+'</strong></span>';
		        var savings = $(this).find('strong').last().html().split(':')[1];
		        savings = '<span class="savings">Comprando junto você economiza:<strong>'+savings+'</strong></span>';
		        var installments = '<span class="installmetns">Por apenas '+$(this).find('strong').first().html()+' de '+$(this).find('strong:nth-child(2)').html()+'</span>';
		        $(this).prepend(total+installments+savings);
		    });
		});
	});
// Compre Junto //
