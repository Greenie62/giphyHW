
//tvTimer
var ticker=10;
var intervalId="";
var isRunning=false;



function count(){
   ticker --
    $("#bottom").html("<h3>Tvs been on for:" + ticker + "</h3>");
    console.log(ticker)
    if(ticker === 0){
        $("#tvSpace").empty();
        $("#bottom").html("<h3> SLEEP MODE </h3>");
        clearInterval(intervalId);
        ticker=10;
    }
    }



function runTimer(){
    if(!isRunning){
    isRunning=true;
    intervalId=setInterval(count,1000)
    }
}

function stopTimer(){
    isRunning=false;
    clearInterval(intervalId);
}







var channels=['slam+dunks','baseball','tv news','rock+climbing','silicon+valley',
'mr+robot','sports','trump+memes'];





$(document).ready(function(){
    for(var i=0;i<channels.length;i++){
  var buttons=$("<div>");
  buttons.addClass("buttons")
  buttons.attr("channels",channels[i]);
  buttons.text(channels[i]);
  $("#channelSpace").append(buttons);
    }
  
  $("#channelSpace").on('click',".buttons",function(){
      $("#tvSpace").empty();
      var userChannel=$(this).attr("channels");
      console.log(userChannel)
       var queryUrl='https://api.giphy.com/v1/gifs/search?q=' + userChannel + "&api_key=nTv0EGtd08JY2KbjlEnIZwVsFolXRS2C&limit=5";
       $.ajax({
           url:queryUrl,
           type:"GET",
       }).then(function(res){
           console.log(res);
           for(var i=0;i<2;i++){
          /* $("#tvSpace").append("<img src=" + res.data[i].images.fixed_height.url/* + "data-still=" + res.data[i].images.fixed_height_still.url 
           + "data-animate=" + res.data[i].images.fixed_height.url +">");*/
           var gif=res.data[i].images.fixed_height.url;
           var still=res.data[i].images.fixed_height_still.url;
           var state;
           var movieDiv=$("<div>");
           movieDiv.attr("gif",gif);
           movieDiv.addClass("gifs");
           movieDiv.attr("still",still);
           movieDiv.attr("state","gif");
           $("#tvSpace").append("<img src= " + movieDiv.attr("gif") +  ">");
           
        
       runTimer();   
        }

        $("#pause").click(function(){
            movieDiv.attr("state","still")
            if(movieDiv.attr("state") === "still"){
                $("#tvSpace").html("<img src= " + movieDiv.attr("still") + ">")
                stopTimer();
            }
        })
        $("#play").click(function(){
            movieDiv.attr("state","gifs")
            if(movieDiv.attr("state") === "gifs"){
                $("#tvSpace").html("<img src= " + movieDiv.attr('gif') + ">");
                runTimer();
            }
        })
      
    })
})
    
       $("#getChannel").on('click',function(){
           var customWants=$("input[name=chan]").val();
           var newBtn=$("<div>");
           newBtn.addClass('buttons');
           newBtn.attr("channels",customWants);
           newBtn.text(customWants);
           $("#channelSpace").append(newBtn);
           
   
    }) 
    });