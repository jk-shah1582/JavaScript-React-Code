function x() {
    let a = 7;
    setTimeout(() => {
        console.log(a);
    }, 1000);
}

function x1(){
    for(let i=0; i<5; i++){
        setTimeout(()=>{
            console.log(i);
        },1000);
    }
} //above thing can also be done using closure

function x2(){
    for(var i=0; i<5; i++){
        function close(x){
            setTimeout(()=>{
                console.log(x);
            },1000);
        }
        close(i);
    }
}
x2();