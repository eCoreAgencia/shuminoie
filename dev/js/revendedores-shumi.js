$(function(){

  /*var getImages = function(id, filename){
    $.ajax({
      headers: {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'image/png',
      },
      type: 'GET',
      url: '/api/dataentities/RR/documents/'+id+'/logo/attachments/'+filename,
      async: false,
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.log(data)
      }

    });
  }*/
  $(".box-revendedores").html('carregando...');
  $.ajax({
    headers: {
      'Accept': 'application/vnd.vtex.ds.v10+json',
      'Content-Type': 'application/json',
    },
    type: 'GET',
    url: 'api/dataentities/RR/search?_fields=id,nome,logo,logradouro,estado,cep,telefone1,telefone2,site',
    async: false,
    success: function (data) {
      if(data.length){
        var item = "";
        $.each(data, function(k, v){
          item += __element({type: 'div', className:'lista-revendedores', content:__element({
              type:'img',
              className: 'logo-revendedor',
              src: 'api/dataentities/RR/documents/'+v.id+'/logo/attachments/'+ v.logo,
              title: v.nome,
              alt: v.nome
            }) + __element({
              type: 'div',
              className:'box-endereco',
              content:__element({type: 'p', content: v.logradouro}) + __element({ type: 'p', content: v.estado}) +
              __element({ type: 'p', content: v.cep}) +
              __element({ type: 'p', content: 'Fone: ' + v.telefone1}) +
              __element({ type: 'p', content: 'Fone: '+ v.telefone2}) +
              __element({ type: 'p', content: __element({type: 'a', className: 'link-revendedores', href: v.site, content: v.site }) })
            })
          });

        })
      }
      console.log(data);
      //item = item + item + item + item + item + item;
      $(".box-revendedores").html(item);
    },
    error: function (data) {
      console.log(data)
    }

  });
});
