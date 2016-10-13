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
    game = {};
    game.strict = false;
    game.start = function() {
        self = this;
        self.reset();
        self.addNode();
        $('.screen').addClass('led-on');
        $('.button').addClass('clickable');
    }
    game.reset = function() {
        self = this;
        self.sequence = [];
        self.index = 0;
        self.strict = false;
    };
    //add one extra node to sequence
    game.addNode = function() {
        self = this;
        var random = Math.floor(Math.random() * 4 + 1);
        self.sequence.push(random);
        //self.updateCount();
    };
    //play node sequence
    game.playSequence = function() {
        self = this;
        var count = 0;
        self.updateCount();
        var repeat = setInterval(function() {
            if (count >= self.sequence.length) {
                clearInterval(repeat);
            }
            var buttonId = self.sequence[count];
            self.playANode('#' + buttonId);
            count += 1;
            console.log(count);
        },1000);
    };
    //play the audio of a button given the id
    game.playANode = function(button) {
        //button = '#' + id;
        $(button).addClass('active');
        var audio = $(button).attr('data-audio');
        playAudio(audio);
        setTimeout(function(){
            $(button).removeClass('active');
        },200);
    };
    game.verifyNode = function(element) {
        self = this;
        var node = $(element).attr('id');
        
        if (node == self.sequence[self.index]) { //right node
            self.index += 1;
            if (self.index === 20) { //all 20 nodes right
                self.promptWinMessage();
                self.reset();
                return;
            }
            if (self.index === self.sequence.length) { //all nodes are right in the current sequence
                self.addNode();
                self.index = 0;
                setTimeout(function() {
                    console.log('play');
                    self.playSequence();
                }, 1000);
            }
        } else { //wrong node
            self.alertError();
            if (game.strict) { //strict mode on
                setTimeout(function() {
                    game.start();
                    game.playSequence();
                },1000);
            } else {
                setTimeout(function() {
                    self.playSequence();
                    self.index = 0;
                },1000);
            }
        }
    };
    game.alertError = function() {
        $('.screen').text('ER');
        $('.error-message').fadeIn(1000);
        $('.error-message').fadeOut(1000);
    };
    game.promptWinMessage = function() {
        $('.win-message').fadeIn(1000);
        //$('.win-message').fadeOut(1000);
    };
    game.updateCount = function() {
        self = this;
        $('.screen').text(self.sequence.length);
    };
    game.toggleStrictMode = function() {
        self = this;
        if (game.strict === false) {
            game.strict = true;
        } else {
            game.strict = false;
        }
    }
    $('input[type="checkbox"]').on('click', function() {
        if ($(this).is(':checked')) {
            $('.screen').addClass('led-on');
            game.reset();
            game.updateCount();
            //toggle strict mode
            $('.strict').off('click').on('click', function() {
                game.toggleStrictMode();
            });
        } else {
            $('.screen').removeClass('led-on');
            game.reset();
            $('.button').removeClass('clickable');
            $('.button').unbind();
        }
    });
    
    $('.start .btn').on('click',function() {
        game.start();
        game.playSequence();
        $('.button.clickable').off('click').on('click', function() {
            game.playANode(this);
            game.verifyNode(this);
        });
    });
});
