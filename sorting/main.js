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
document.getElementById("selection").addEventListener("click",function(){
    var i=0;j=0;index=-1;
    t1=setInterval(selectOut,300);
    function selectOut(){
        if(i==(size-1)){
            clearInterval(t1);
            return;
        }
        else{
            index=i;
            j=i+1;
            console.log("i,j",i,j);
            selectIn();
            draw(i,index);
            console.log("i,index",i,index);
            var temp=arr[i];
            arr[i]=arr[index];
            arr[index]=temp;
            function selectIn(){
                while(j<size){
                    if(arr[j]<arr[index]){
                        index=j;
                    }
                    j++;
                }
                return;
            }
            draw(i);
            i++;
        }
    }
    console.log("selection sorted");
});
document.getElementById("insertion").addEventListener("click",function(){
    var i=1;j=0,val=0;
    t1=setInterval(insertOut,300);
    function insertOut(){
        if(i==size){
            clearInterval(t1);
        }
        else{
            val=arr[i];
            j=i-1;
            t2=setInterval(insertIn,300);
            draw();
            console.log("i is",i);
            i++;
            function insertIn(){
                while(j>=0 && arr[j]>val){
                    arr[j+1]=arr[j];
                    console.log("j is ",j);
                    j--;
                    draw(j,j+1);
                }
                arr[j+1]=val;
                clearInterval(t2);
                return;
            }
        }
    }
    console.log("insertion sorted");
});
document.getElementById("bubble").addEventListener("click",function(){
    var i=0,j=0;
    var t1=setInterval(bubbleOut,300);
    function bubbleOut(){
        if(i==size){
            clearInterval(t1);
        }
        else{
            var t2=setInterval(bubbleIn,300);
            function bubbleIn(){
                if(j==(size-1)){
                    clearInterval(t2);
                    j=0;
                    return;
                }
                else{
                    if(arr[j]>arr[j+1]){
                        let temp=arr[j];
                        arr[j]=arr[j+1];
                        arr[j+1]=temp;
                        draw(j,j+1);
                    }
                    j++;
                }
            }
            draw();
            i++;
        }
    }
    console.log("bubble sorted");
});
