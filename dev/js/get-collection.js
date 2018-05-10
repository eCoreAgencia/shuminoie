$("body.home").each(function(index) {
    var storeName = "shumi.vtexcommercestable.com.br";
    var storeDomain = "faraone.vtexcommercestable.com.br"
    var data = "http://"+storeName+"/api/catalog_system/pub/products/search/?fq=H:137";
    function convert(a){
        a = a.toString();
        if(a.indexOf('.') < 1){
            a += '.00';
        }
        if(a.split('.')[1].length < 2){
            a += '0';
        }
        return a.replace('.',',');
    }
    $.getJSON(data, function(data) {
        $.each(data, function(key, val) {
            var links = val.link.split(storeName);
            links = links[0]+storeDomain+links[1];
            var productNames = val.productName;
            var clusHighlight = val.clusterHighlights['137'];
            try{
                var disHighlight = val.items["0"].sellers["0"].commertialOffer.DiscountHighLight["0"]["<Name>k__BackingField"];
            }
            catch(err){
                var disHighlight = null;
            }
            var oldPrice = convert(val.items[0].sellers[0].commertialOffer.ListPrice);
            var preco = convert(val.items[0].sellers[0].commertialOffer.Price);
            
            var imageId = val.items[0].images[0].imageId;
            var imageText = val.items[0].images[0].imageText;
            var imageSize = '-130-130';
            var prodHtml = `
                <li class="`+imageId+`">
                    <div class="principal">
                        <a href="`+links+`" class="productShelf">
                            <img src="http://faraone.vteximg.com.br/arquivos/ids/`+imageId+imageSize+imageText+`.jpg"/>
                        </a>`;
            if(disHighlight){
                prodHtml += ` <span class="flag-discount">`+disHighlight+`</span>`
            }
            if(disHighlight){
                prodHtml += ` <span class="flag-neo">`+clusHighlight+`</span>`
            }
            prodHtml+=`</div>
                    <article>
                        <a href="`+links+`">
                            <h3>`+productNames+`</h3>
                        </a>`;
            if(oldPrice != preco){
               prodHtml += `<span class="oldPrice">R$ `+oldPrice+`</span>`;
            }
            prodHtml += `
                <span class="bestPrice">R$ `+preco+`</span>
                        <a class="toProduct" href="`+links+`">Comprar</a>
                    </article>
                </li>
            `;
             $(prodHtml).appendTo('.faraOne .shelf ul');
        });
    });
});