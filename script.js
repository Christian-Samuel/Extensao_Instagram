    baixar.onclick=()=>
    {
        if(nometxt.value.length<=0)
            nometxt.value="Arquivo";

        chrome.tabs.executeScript({
            code: `
            var video = document.querySelectorAll("source");
            var imagem = document.querySelectorAll("img.y-yJ5");
            var foto = document.querySelectorAll("div>div>div>img.FFVAD");

            if(video.length>0)
                url = video[0].getAttribute("src");
            else
                {
                    if(imagem.length>0)
                        url = imagem[0].getAttribute("src");
                    else
                        { 
                            if(foto.length>0)
                                url = foto[0].getAttribute("src");
                        }
                }
        
            
            
           

            if(video.length>0 || imagem.length>0 || foto.length>0)
            {
                fileName = "${nometxt.value}";

                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.responseType = "blob";
                    xhr.onload = function(){
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL(this.response);
                        var tag = document.createElement('a');
                        tag.href = imageUrl;
                        tag.download = fileName;
                        document.body.appendChild(tag);
                        tag.click();
                        document.body.removeChild(tag);
                    }
                    xhr.send();
            }
            else
            {
                alert("Não existe nada para se baixar :(");
            }
            `
        });    
}
