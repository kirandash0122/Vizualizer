function init(){
    canvas=document.getElementById('canvas');
    width=canvas.width=window.innerWidth;
    height=canvas.height=550;
    ctx=canvas.getContext('2d');
    arr=[];
    size=55;
    generateRandom();
    draw();
    console.log(arr);
}
function generateRandom(){
    while(arr.length>0){
        arr.pop();
    }
    for(let i=0;i<size;i++){
        let x=Math.round(Math.floor((Math.random() * 100) + 1));
        arr.push(x);
    }
}
function draw(idx1=-1,idx2=-1){
  ctx.clearRect(0,0,width,height);
  var x=90,y=10,dx=20,dy=5;
  for(let i=0;i<size;i++){
      var ny=y;
      if(i==idx1 || i==idx2){
          ctx.fillStyle="#f28907";
      }
      else{
          ctx.fillStyle="#563838";
      }
      for(let j=0;j<arr[i];j++){
          ctx.fillRect(x,ny,dx,dy);
          ny+=dy;
      }
      ny+=3*dy;
      ctx.fillStyle="white";
      ctx.font="14px Roboto";
     ctx.fillText(arr[i],x,ny);
      x+=(dx+3);
  }
}
function drawBinary(start=-1,end=-1){
    ctx.clearRect(0,0,width,height);
    var x=90,y=10,dx=20,dy=5;
    for(let i=0;i<size;i++){
        var ny=y;
        if(i>=start && i<=end){
            ctx.fillStyle="#f28907";
        }
        else{
            ctx.fillStyle="#563838";
        }
        for(let j=0;j<arr[i];j++){
            ctx.fillRect(x,ny,dx,dy);
            ny+=dy;
        }
        ny+=3*dy;
        ctx.fillStyle="white";
        ctx.font="14px Roboto";
       ctx.fillText(arr[i],x,ny);
        x+=(dx+3);
    }
}
init();
document.getElementById("generate").addEventListener("click",function(){
    document.getElementById("result").innerHTML="";
    generateRandom();
    draw();
    console.log("new array generated!!!");
});
document.getElementById("linear").addEventListener("click",function(){
    var key=parseInt(document.getElementById("lkey").value);
    var i=0;
    var res=document.getElementById("result");
    var t1=setInterval(lsearch,200);
    function lsearch(){
        if(i==size){
            clearInterval(t1);
            res.innerHTML="Element Not Found";
            draw();
            return;
        }
        draw(i);
        console.log(arr[i],key);
        if(arr[i]==key){
            clearInterval(t1);
            res.innerHTML="Element found at index "+i;
            return;
        }
        i++;
    }

});
document.getElementById("binary").addEventListener("click",function(){
  //here we are sorting the array
    for(let i=0;i<size;i++){
        for(let j=0;j<size-i-1;j++){
            if(arr[j]>arr[j+1]){
                let temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    draw();
    var key=parseInt(document.getElementById("bkey").value);
    var start=0,end=size-1,mid;
    var res=document.getElementById("result");
    var t1=setInterval(bsearch,600);
    function bsearch(){
        if(start>end){
            clearInterval(t1);
            res.innerHTML="Element Not Found";
            draw();
            return;
        }
        drawBinary(start,end);
        mid=Math.round(Math.floor((start+end)/2));
        if(arr[mid]==key){
            clearInterval(t1);
            res.innerHTML="Element found at index "+mid;
            draw(mid);
            return;
        }
        if(arr[mid]>key){
          end=mid-1;

        }
        else{
          start=mid+1;
        }
    }
});
