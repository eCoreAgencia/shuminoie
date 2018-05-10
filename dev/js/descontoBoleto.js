// Desconto Boleto //
	function calcDesc(preco, desconto){
		desconto = desconto.match(/(\(\d+%\)|\(\d+\.\d{2}%\))/g)[0].split('%')[0].split('(')[1]/100;
		preco = preco.replace('.','').replace(',','.');
		var precoDesc = (preco*desconto).toFixed(2);
		var total = (preco - precoDesc).toFixed(2);
		total = total.replace('.',',');
		total = total.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
		return total;
	}
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