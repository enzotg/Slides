
    window.onload   = function(){
        
        setInterval(() => {
            Siguiente();
        }, 5000);
    }

    function Siguiente(){
        let els = document.querySelectorAll("#slide-cont .slide");        
        let n = els.length;

        for(let i=0;i<n;i++)        {
            if(els[i].classList.contains("slshow")){
                els[i].classList.remove("slshow");
                els[(i+1) % n].classList.add("slshow");

                return;
            }                

        }
    }
    function Anterior(){
        let els = document.querySelectorAll("#slide-cont .slide");
        let n = els.length;

        for(let i=0;i<n;i++)        {
            if(els[i].classList.contains("slshow")){
                els[i].classList.remove("slshow");
                els[ Math.abs((i-1 + n) % n) ].classList.add("slshow");

                return;
            }                

        }
    }    