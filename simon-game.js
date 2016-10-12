/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    function playAudio(url) {
        var sound = new Audio(url);
        sound.play();
    }
    $('.button').on('click',function() {
        self = this;
        $(self).addClass('active');
        var audio = $(this).attr('data-audio');
        playAudio(audio);
        setTimeout(function(){
            $(self).removeClass('active');
        },200);
    });
});
