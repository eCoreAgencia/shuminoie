$("#___rc-p-id").each(function(index) {
  var id = $(this).attr("value");
  var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";

  $.getJSON(data, function(data) {
    console.log(data);
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
    });
  });
});