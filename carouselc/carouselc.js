function carouselcSiguiente(){
    let car = new CarouselC();    
    car.clonar(1); 
    if(car.existeDom()) return;
    car.agregarClonados(1);

    let arr = car.getItems();    
    setTimeout(function() {
        arr.forEach(function(value, index) {                
            value.style.transition = car.transTime;
            value.style.transform = 'translateX(' + car.translatePorc +')'; 
        });
    }, car.transInterval/50);
    setTimeout (function() {            
        arr.forEach(function(value, index) {                
            value.style.transition = '';            
            value.style.transform = 'translateX(0%)'; 
        });            
        car.borrarDelDom(1);
    },car.transInterval);    
}

function carouselcAnterior(){
    let car = new CarouselC();    
    car.clonar(2);
    if(car.existeDom()) return;
    car.agregarClonados();

    let arr=car.getItems();
    arr.forEach(function(value) {            
        value.style.transition = '';
        value.style.transform = 'translateX(' + car.translatePorc +')'; 
    });
    
    setTimeout(function() {            
        arr.forEach(function(value) {                
            value.style.transition = car.transTime;
            value.style.transform = 'translateX(0%)'; 
        });            
    }, car.transInterval/50);        
    setTimeout (function() {        
        car.borrarDelDom();
    },car.transInterval);        
}
//----------------------------------------------------------------------
function CarouselC (){
    this.cantMuestra = 0;
    this.translatePorc = "";
    this.clonados=[];
    this.transTime = 'linear .5s';
    this.transInterval = 500;
    
    let ancho = 0;
    if(getComputedStyle(document.querySelector(".carouselc-item")).maxWidth.indexOf("%") > -1)
        ancho = Math.floor(
            document.querySelector(".carouselc-inner").clientWidth *
            getComputedStyle(document.querySelector(".carouselc-item")).maxWidth.replace('%','') / 100);
    else
        ancho = getComputedStyle(document.querySelector(".carouselc-item")).maxWidth.replace('px','');
    
    this.cantMuestra = Math.floor(
        document.querySelector(".carouselc-inner").clientWidth / ancho);

    if(document.querySelectorAll(".carouselc-item").length < this.cantMuestra)
        this.cantMuestra = document.querySelectorAll(".carouselc-item").length;
        
    this.translatePorc = "-" + Number.parseInt(this.cantMuestra * 100) + "%";    
    //-----------------------------------------------------------------
    this.clonar=function(op){
        this.clonados=[];    
        let elems;
        if(op==1)   //siguiente
            elems = document.querySelectorAll(".carouselc-item:nth-child(-n+" + this.cantMuestra + ")");
        else
            elems = document.querySelectorAll(".carouselc-item:nth-last-child(-n+" + this.cantMuestra + ")");        
        let that=this;
        elems.forEach(clon);
        function clon(value){
            that.clonados.push(value.cloneNode(true));
        }
    }
    this.agregarClonados=function(op){
        if(op==1)
            this.clonados.forEach(function(value){        
                document.querySelector(".carouselc-inner").appendChild(value);            
            });
        else
        {
            for(let i=this.clonados.length-1;i>=0;i--){
                let elem = document.querySelector(".carouselc-item");
                document.querySelector(".carouselc-inner").insertBefore(this.clonados[i], elem);
            }            
        }    
    }
    this.borrarDelDom=function(op){
        let elems;
        if(op==1)
            elems = document.querySelectorAll(".carouselc-item:nth-child(-n+" + this.cantMuestra +")");
        else
            elems = document.querySelectorAll(".carouselc-item:nth-last-child(-n+" + this.cantMuestra +")");
    
        elems.forEach(function(value){
            value.remove();            
        });    
    }
    this.existeDom=function(){
        return document.querySelectorAll(".carouselc-item[data-id='" +  this.clonados[0].getAttribute("data-id") +  "']").length > 1;
    }
    this.getItems=function(){
        return document.querySelectorAll(".carouselc-item");    
    }
}
