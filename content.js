



check_time = 200;

play_speed = 16;

var wait_time = 3000;

var course_num = 0;
var now_course_num = 1;

var all_list;
var nowPlay;
// var watched_list = new Array();
chrome.storage.local.get('speed', function(data) {
    play_speed = data.speed;
});
  
function get_list() {
    all_list = new Array();
    course_num = $(".video_lists").contents().find('a').length;
    for (var i = 0; i < course_num; i++) {
        all_list[i] = $(".video_lists").contents().find('a')[i];
    }
    for (var i = all_list.length-1;i >= 0 ;i--) {
        if (all_list[i].style.color == "red") {
            all_list.splice(i,1);        //执行后aa.length会减一
        }
        else if(all_list[i].innerText == "保存"){
            all_list.splice(i,1);
        }

    }        

}

function play_next() {
    get_list();
    nowPlay = $(".video_lists").contents().find('a').parent(".video_red1").contents()[1];
    if(all_list.length==0){
        console.log("此页面都播放完毕！");
    }
    else{
        if(all_list.includes(nowPlay))
            console.log("开始播放");
        else{
            console.log("播放: " + all_list[0].innerText);

            setTimeout("all_list[0].click();", 500); 
        }
        
    }
}

function play_media() {
    
    var player = $('div.video_play1').contents().find('video.plyr--setup')[0];
    // if (player == undefined) {
    //     // alert("脚本未获取到H5播放器，可能是因为您的课程暂未使用新版播放器...");
    //     // throw new Error("脚本未获取到H5播放器，可能是因为您的课程暂未使用新版播放器...");
    // }
    player.play();
    var interval = setInterval(function () {
        var click_button = $('.public_btn').contents();
        click_button = click_button[click_button.length-1];
        var play_button = $('button.plyr__play-large');
        if(click_button!=null)
            click_button.click();
        if(play_button!=null)
            play_button.click();
        var player = $('div.video_play1').contents().find('video.plyr--setup')[0];
        if (player.playbackRate != play_speed) {
            player.playbackRate = play_speed;
            player.play();
        }
        if (player.ended) {
            console.log("检测到视频播放结束");
            setTimeout(play_next(), 1000); 

            play_next();
            return;
        }
        if (player.paused) {
            console.log("检测到视频暂停了，继续播放，当前速度%f倍速", play_speed);
            player.playbackRate = play_speed;
            player.play();
        }
    }, check_time);
}

play_next();
play_media();
