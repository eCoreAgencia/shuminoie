function intoView(elemento,divide){var divideBy=2,dasView=($(window).width(),$(window).height());dasView+=$(window).scrollTop(),window.matchMedia("(min-width: 1366px)").matches&&(divideBy=4),divide&&(divideBy=divide);var dasEl=$(elemento).offset().top+$(elemento).height()/divideBy;return dasEl<=dasView}function animateIt(el,anime){intoView(el)&&el.addClass(anime)}window.matchMedia("(min-width: 1366px)").matches&&$(window).scroll(function(){$("body.home").each(function(){var shelfFull=$(".shelf-bordas-e-costura > .container"),shelfLeft=$(".shelf-corte-e-acessorios .shelf-left"),shelfRight=$(".shelf-corte-e-acessorios .shelf-right"),tipBar=$("main .tip-bar"),printText=$("section.print-text"),servicose=$("section.servicos-e-cursos"),canal=$("section.canal-youtube"),servicos=$("section.servicos"),face=$("section.blog").first(),blog=$("section.blog").last(),minibanners=$(".minibanners-services");animateIt(tipBar,"visible"),animateIt(printText,"visible"),animateIt(shelfFull,"visible"),animateIt(shelfLeft,"visible"),animateIt(shelfRight,"visible"),animateIt(servicose,"visible"),animateIt(canal,"visible"),animateIt(servicos,"visible"),animateIt(face,"visible"),animateIt(blog,"visible"),animateIt(minibanners,"visible")})}),$(window).scroll(function(){$("body.categoria").each(function(){var shelfSec=$("section.shelf");intoView(shelfSec,1)?shelfSec.addClass("parallax"):shelfSec.removeClass("parallax")})});;function masterDataContato(){var jsonSaveDadosUser={nome:$("#cl_nome").val(),email:$("#cl_email").val(),tel:$("#cl_telefone").val(),empresa:$("#cl_empresa").val(),mensagem:$("#cl_mensagem").val()},storename="shumi",dataEntity="FC",urlSaveDadosUser="http://api.vtexcrm.com.br/"+storename+"/dataentities/"+dataEntity+"/documents/";$.ajax({headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json"},data:JSON.stringify(jsonSaveDadosUser),type:"PATCH",url:urlSaveDadosUser,success:function(data){console.log(data),$("div#messageSuccess").removeClass("hide"),$("#cl_nome").val(""),$("#cl_email").val(""),$("#cl_telefone").val(""),$("#cl_empresa").val(""),$("#cl_mensagem").val(""),alert("Mensagem Enviada com sucesso!")},error:function(data){console.log(data),alert("Houve um erro ao enviar a mensagem. Tente novamente mais tarde")}})}function FaleConosco(){var jsonSaveDadosUser={nome:$("#cl_nome").val(),email:$("#cl_email").val(),tel:$("#cl_tel").val(),type:$("#cl_type").val(),description:$("#cl_description").val()},storename="shumi",dataEntity="FL",urlSaveDadosUser="http://api.vtexcrm.com.br/"+storename+"/dataentities/"+dataEntity+"/documents/";$.ajax({headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json"},data:JSON.stringify(jsonSaveDadosUser),type:"PATCH",url:urlSaveDadosUser,success:function(data){console.log(data),$("div#messageSuccess").removeClass("hide"),$("#cl_nome").val(""),$("#cl_email").val(""),$("#cl_tel").val(""),$("#cl_type").val(""),$("#cl_description").val(""),alert("Mensagem Enviada com sucesso!")},error:function(data){console.log(data),alert("Houve um erro ao enviar a mensagem. Tente novamente mais tarde")}})}jQuery.fn.simulateClick=function(){return this.each(function(){if("createEvent"in document){var doc=this.ownerDocument,evt=doc.createEvent("MouseEvents");evt.initMouseEvent("click",!0,!0,doc.defaultView,1,0,0,0,0,!1,!1,!1,!1,0,null),this.dispatchEvent(evt)}else this.click()})};var body=$("body"),htmlBody=$("html, body"),$document=$(document),header=$("#header"),submenuDesktopWrapper=$(".js-submenu-wrap"),userSubmenu=$(".submenu-user"),sidePanelMobile=$(".side-panel"),mobileSubmenu=$(".submenu-mobile"),minicart=$(".minicart"),slide=$(".slide"),slideShelf=$(".slideShelf"),slideBrands=$(".servicos-e-cursos .servicos"),carousel=$(".shelf-carousel"),backToTop=$(".js-back-to-top"),shelf=$(".prateleira"),paginatedShelf=$(".prateleira[id*=ResultItems]"),orderList=$(".order-list"),formNews=$(".newsletter"),depCatBus=$(".dep-cat-bus"),duvidasFrequentes=$(".duvidas"),pagProduto=$(".produto"),sidebar=$(".sidebar");$(function(){function unHide(t){setTimeout(function(){$("header").removeClass("ha-hide"),$("header").removeClass("ha-hidding")},t)}$('a[href*="#"]').click(function(event){event.preventDefault();var target=$(this).attr("href");try{var targetOffset=$(target).offset().top-250}catch(err){}$("html, body").animate({scrollTop:targetOffset},300)}),orderList.length>0&&(orderList.find("link").remove(),orderList.find(".page-header").unwrap(".container")),$(".tabs-destaque a").click(function(){$(".tabs-destaque a").removeClass("active");var guardaClass=$(this).attr("class"),findShelfs=$(this).parent(),teste=findShelfs.parent(),testeDois=teste.parent(),testeTres=testeDois.parent(),mamae=testeTres.find("div");mamae.removeClass("active"),$(".prateleiras-destaque div.shelf-"+guardaClass).addClass("active"),$(this).addClass("active"),$(".slick-next").simulateClick("click")});try{$(".bread-crumb").find("li:first-child a").text("Home")}catch(e){}if($(".helperComplement").length&&$(".helperComplement").remove(),$(window).scroll(function(){var scroll=$(window).scrollTop();scroll>=450?$(".js-back-to-top").addClass("active"):$(".js-back-to-top").removeClass("active")}),body.on("click",".js-back-to-top",function(event){event.preventDefault(),htmlBody.animate({scrollTop:0},300)}),body.on("click",".bt-open-news",function(event){event.preventDefault(),htmlBody.animate({scrollTop:3500},300)}),body.on("click",".rating-click-here",function(event){event.preventDefault(),htmlBody.animate({scrollTop:3500},300)}),body.on("click",".btn-fast-buy",function(event){event.preventDefault();var url=$(this).attr("href");$.get(url,function(data){vtexjs.checkout.getOrderForm().done(function(orderForm){console.log(orderForm),htmlBody.animate({scrollTop:0},300)})})}),slide.length>0&&slide.slick({adaptiveHeight:!0,autoplay:!0,autoplaySpeed:5e3,pauseOnHover:!0,arrows:!0,dots:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1}),slideShelf.length>0&&($(".home").find(".shelf-bordas-e-costura .slideShelf .prateleira").find("ul").slick({adaptiveHeight:!0,autoplay:!1,arrows:!0,dots:!1,mobileFirst:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1,responsive:[{breakpoint:991,settings:{slidesToShow:4}},{breakpoint:767,settings:{slidesToShow:3}},{breakpoint:479,settings:{slidesToShow:2}}]}),$(".home").find(".shelf-corte-e-acessorios .slideShelf .prateleira").find("ul").slick({adaptiveHeight:!0,autoplay:!1,arrows:!0,dots:!1,mobileFirst:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1,responsive:[{breakpoint:991,settings:{slidesToShow:2}},{breakpoint:767,settings:{slidesToShow:3}},{breakpoint:479,settings:{slidesToShow:2}}]})),slideBrands.length>0&&$(".home").find(".servicos-e-cursos .servicos").find(".slider").slick({adaptiveHeight:!0,autoplay:!1,arrows:!1,dots:!0,mobileFirst:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1,responsive:[{breakpoint:991,settings:{slidesToShow:1}},{breakpoint:767,settings:{slidesToShow:1}},{breakpoint:479,settings:{slidesToShow:1}}]}),$("header .js-open-mobile-menu").click(function(){$(this).toggleClass("active"),$("header .menu-header").toggleClass("slideActive")}),$("header nav.menu .has-sub .js-open-sub").click(function(){$(this).toggleClass("active"),$(this).next().toggleClass("slideActive")}),$(".prateleira li").each(function(){if($(this).find(".best-price").length){var desconto=.1404,preco=$(this).find(".best-price").text().replace(" ","").split("$")[1];preco=preco.replace(".","").replace(",",".");var precoDesc=(preco*desconto).toFixed(2),total=(preco-precoDesc).toFixed(2);total=total.replace(".",","),total=total.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1."),$(this).find(".price").append('<span class="preco-boleto">ou R$ '+total+" no boleto</span>")}}),$("body.produto .buy-box").each(function(){if($(this).find(".skuBestPrice").length){var desconto=.1404,preco=$(this).find(".skuBestPrice").text().replace(" ","").split("$")[1];preco=preco.replace(".","").replace(",",".");var precoDesc=(preco*desconto).toFixed(2),total=(preco-precoDesc).toFixed(2);total=total.replace(".",","),total=total.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1."),$(this).find("p.descricao-preco").append('<em class="preco-boleto">ou R$ '+total+" no boleto</em>")}}),$("body.produto .buy-box .skuBestPrice").length){var MutationObserver=window.MutationObserver||window.WebKitMutationObserver,elementChange=new MutationObserver(function(){$(".buy-box").each(function(){var desconto=.1404,preco=$(this).find(".skuBestPrice").text().replace(" ","").split("$")[1];preco=preco.replace(".","").replace(",",".");var precoDesc=(preco*desconto).toFixed(2),total=(preco-precoDesc).toFixed(2);total=total.replace(".",","),total=total.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1."),$(this).find("p.descricao-preco").append('<em class="preco-boleto">ou R$ '+total+" no boleto</em>")})});$(".buy-box .productName").each(function(){elementChange.observe(this,{childList:!0,characterData:!0,attributes:!0,subtree:!0})})}if($(window).load(function(){vtexjs.checkout.getOrderForm().done(function(orderForm){orderForm.loggedIn?window.matchMedia("(max-width: 1365px)").matches&&$("header nav.menu ul").append('<li class="menu-item"><a href="/logout">Sair</a></li>'):($("header span.logout").remove(),window.matchMedia("(max-width: 1365px)").matches&&$("header nav.menu ul").append('<li class="menu-item"><a href="/login">Entrar</a></li>'))})}),$(".prateleira li").each(function(){if($(this).find(".best-price").length){var preco=$(this).find(".best-price").text().replace(" ","").split("$")[1];preco=preco.replace(".","").replace(",","."),preco>200&&$(this).find(".flag-frete").append('<p class="flag frete-gratis">Frete grátis SP</p>')}}),$("body.produto .buy-box").each(function(){if($(this).find(".skuBestPrice").length){var preco=$(this).find(".skuBestPrice").text().replace(" ","").split("$")[1];preco=preco.replace(".","").replace(",","."),preco>200&&$(this).find(".productReference").after('<p class="flag frete-gratis">Frete grátis SP</p>')}}),$(window).load(function(){$("body.produto").each(function(){var fbApp=document.getElementById("fb-comments-app");fbApp.innerHTML="<fb:comments href='"+document.location.href+"' num_posts='5' width='100%'></fb:comments>",FB.XFBML.parse(fbApp)})}),sidebar.length>0)try{sidebar.find('input[type="checkbox"]').vtexSmartResearch({elemLoading:"",returnTopText:"",elemLoading:'<i class="shelf__loading"></i>',filterScrollTop:function(shelfOffset){return 20}})}catch(e){}var termoBusca=$("body.resultado-busca .searchResultsTime .resultado-busca-termo .value").text();$("body.resultado-busca h3.tlt-shelf").append(termoBusca);try{$document.ready(function(){$(".shipping-value").simulateClick("click"),$(".box-clipping:nth-child(3n+1)").addClass("colum-edit"),$(".box-clipping:nth-child(3n+2)").addClass("no-margin pull-text-left"),$(".box-clipping:nth-child(3n+3)").addClass("no-margin pull-text-right"),$(".buy-button").text("Comprar"),$(".active-desc").click(function(){$(this).next().slideToggle()}),0==$(".shelfRelacionados li").length&&$(".shelfRelacionados").remove()})}catch(e){}if($(window).scroll(function(){var scroll=$(window).scrollTop();scroll>=350?($("header").addClass("menu-persistente"),$("body").addClass("top-height-active")):($(".menu-persistente").addClass("ha-hidding"),$(".menu-persistente").addClass("ha-hide"),unHide(99),$("header").removeClass("menu-persistente"),$("body").removeClass("top-height-active"))}),$(".product-info menu button[name=productDescription]").addClass("active"),$(".product-info .info article.productDescription").addClass("active"),$(".product-info menu button").click(function(){$(".product-info menu button").removeClass("active"),$(this).addClass("active");var prodCampo=$(this).attr("name");$(".product-info .info .active").removeClass("active"),$(".product-info .info article."+prodCampo).addClass("active")}),$(window).load(function(){$("#___rc-p-id").each(function(index){var id=$(this).attr("value"),data="/api/catalog_system/pub/products/search/?fq=productId:"+id;$.getJSON(data,function(data){$.each(data,function(key,val){var faq=val.faq,vids=val.videos,down=val.download,acss=val.acessorios,spec=val.especificacao_tecnica,where=$(".product-info .info");where.find(".faq").append(faq),where.find(".vids").append(vids),where.find(".spec").append(spec),where.find(".download").append(down),where.find(".acessorios").append(acss);var hasStock=0;for(i=0;i<val.items.length;i++)hasStock+=val.items[i].sellers[0].commertialOffer.AvailableQuantity;hasStock||$(".choose-skus .skuList input[type=radio]:first-of-type").simulateClick(),$(".product-info .info article").each(function(){if(!$(this).children().length){var buttonName=$(this).attr("class").split()[0];$('.product-info .menu button[name="'+buttonName+'"]').remove()}})})})})}),pagProduto.length>0)try{$document.ready(function(){$(".selecao-sku .more").click(function(){var $input=$(this).prev();$input.val(+$input.val()+1);var opt_value=$input.val(),currentURL=($(this).next(),$(".buy-button").attr("href")),nomedoproduto=currentURL.split(/\&/)[0];$(".buy-button").removeAttr("href"),$(".buy-button").attr("href",nomedoproduto+"&qty="+opt_value+"&seller=1&redirect=false&sc=1")}),$(".selecao-sku .less").click(function(){var $input=$(this).next();$input.val(+$input.val()-1);var opt_value=$input.val(),currentURL=($(this).next(),$(".buy-button").attr("href")),nomedoproduto=currentURL.split(/\&/)[0];$(".buy-button").removeAttr("href"),$(".buy-button").attr("href",nomedoproduto+"&qty="+opt_value+"&seller=1&redirect=false&sc=1")})})}catch(e){}$(depCatBus).length>0&&(window.location.href.indexOf("OrderByTopSaleDESC")!=-1&&$(".main-category__orderBy li:nth-child(2) a").addClass("active"),window.location.href.indexOf("OrderByReleaseDateDESC")!=-1&&$(".main-category__orderBy li:nth-child(3) a").addClass("active"),window.location.href.indexOf("OrderByPriceDESC")!=-1&&$(".main-category__orderBy li:nth-child(4) a").addClass("active"),window.location.href.indexOf("OrderByPriceASC")!=-1&&$(".main-category__orderBy li:nth-child(5) a").addClass("active")),$(".close-modal, .bg_modal").click(function(){$(".modal-opacity").fadeOut(600),$("body").removeClass("modal-active"),$(".modal-content").remove()}),$(document).keyup(function(ev){27==ev.keyCode&&$(".modal-opacity").fadeOut(600),$("body").removeClass("modal-active")}),$(function(){localStorage.getItem("shumi-newsletter-popup")||$("body.home").each(function(){var newsLetter='<div class="newsletter-popup-wrapper"><div class="newsletter-popup"><h2>Newsletter</h2><h3>Bem-vindo!</h3><p>Inscreva-se na nossa lista e saiba de tudo em primeira mão!</p><form action="" method="POST" class="form-newsletter" data-module="newsletter"><input type="hidden" name="newsInternalPart" value="newsletter" /><input type="hidden" name="newsInternalPage" value="_" /><input type="hidden" name="newsInternalCampaign" value="newsletter:opt-in" /><fieldset class="nome"><input type="text" name="newsletterClientName" id="cl_nome" class="nome newsletter-client-nome" placeholder="Digite seu nome" data-validation="required" data-msg-required="Preencha o seu nome"/></fieldset><fieldset class="email"><input type="text" name="newsletterClientEmail" id="cl_email" class="email" placeholder="Digite seu e-mail" data-validation="required email" data-msg-required="Preencha o seu email" data-msg-email="O e-mail que você inseriu está incorreto" /></fieldset><button type="submit" class="newsletter-button-ok submit">Cadastrar</button></form><button id="newsletter-close">X</button></div></div>';$(this).append(newsLetter)}),$(".newsletter-popup #newsletter-close").click(function(){$(".newsletter-popup-wrapper").hide(),localStorage.setItem("shumi-newsletter-popup","true")})});try{$document.ajaxStop(function(){orderList.parents("html").removeClass("is-loading")})}catch(e){}try{$document.ready(function(){$(".btn-search").click(function(){$(".btn-buscar").simulateClick("click")})})}catch(e){}$(duvidasFrequentes).length>0&&$(".tab span").click(function(){$(this).toggleClass("active"),$(this).next().slideToggle()})}),$(window).load(function(){window.matchMedia("(min-width: 768px)").matches&&$(".banners-top .slider .slick-dots li").each(function(){var slideNum=parseInt($(this).find("button").text())-1,url=$(".banners-top .slider .slick-track .slick-slide[data-slick-index="+slideNum+"]").find("img").attr("src");$(this).find("button").css("background-image",'url("'+url+'")')}),$("#vtexIdUI-auth-selector .modal-header .close").click(function(){window.location.href=window.location.href.split("/login?")[0]})});