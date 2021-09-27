
// swipe up to unlock
$('.locked').draggable({ 
    axis: "y",
    containment: $('.locked-wrapper'),
    handle: $('.locked .gesture'),
    revert: 'invalid',
	revertDuration: 200,
    start: () => {
        $('.locked').addClass('move');
        $('body').css('cursor', 'grabbing');
        $('.gesture').removeClass('stalling');
    },
    stop: () => {
        $('.locked').removeClass('move');
        $('body').css('cursor', 'default');
        $('.gesture').addClass('stalling');
    }
});
$('.locked-drop').droppable({
    drop: () => {
        unlocked();
    }
});
function unlocked() {
    $('.locked').animate({
        top: 0
    }, 200);
    launchHomeAnim();
}


function launchHomeAnim() {
    $('.pages-cont').removeClass('anim');
    $('.app').each((index, element) => {
        setTimeout(() => {
            $(element).removeClass('anim1');
        }, 60);
    });
    $('.unlocked-bottom').removeClass('anim2');
}

// home screen page scroll
var handle = false;
var start = 0;
var page = 0;
$('.home-cont').mousedown((e) => {
    $('body').css('cursor', 'grabbing');
    handle = true;
    start = e.clientX + $('.pages-cont').scrollLeft();
})
$('.home-cont').mousemove((e) => {
    if (handle) {
        var dif = start - e.clientX;
        if (page == 0 && dif > 130) {
            handle = false;
            scrollToPage(375);
        }
        else if (page == 1 && dif < 255.5) {
            handle = false;
            scrollToPage(0);
        }
        else {
            $('.pages-cont').scrollLeft(dif);
        }
    }
})
$('body').mouseup(() => {
    $('body').css('cursor', 'default');
    handle = false;
    if ($('.pages-cont').scrollLeft() > 0 && page == 0) {
        $('.pages-cont').animate({
            scrollLeft: 0
        }, 100);
    }
    else if ($('.pages-cont').scrollLeft() < 375 && page == 1) {
        $('.pages-cont').animate({
            scrollLeft: 375
        }, 100);
    }
})
function scrollToPage(pos) {
    $('.pages-cont').animate({
        scrollLeft: pos
    }, 150);
    
    if (pos == 0) {
        $('.p0').addClass('on');
        $('.p1').removeClass('on');
        page = 0;
    }
    else {
        $('.p1').addClass('on');
        $('.p0').removeClass('on');
        page = 1;
    }
}


// power button script
var power = false;
function powerToggle() {
    if (power == true) { // turn off
        $('.off').fadeIn();
        power = false;
    }
    else { // turn on
        $('.off').fadeOut();
        power = true;
        resetAnims();
        $('.gesture').addClass('stalling');
    }
}
$('.power-btn').click(() => {
    powerToggle();
})
// tap to wake
$('.off').click(() => {
    powerToggle();
})

function resetAnims() {
    // remove transitions
    $('.pages-cont').removeClass('transition');
    $('.app').each((index, element) => {
        $(element).removeClass('transition');
    })
    $('.unlocked-bottom').removeClass('transition');

    // add anim classes
    $('.pages-cont').addClass('anim');
    $('.app').each((index, element) => {
        $(element).addClass('anim1');
    });
    $('.unlocked-bottom').addClass('anim2');

    $('.locked').css('top', '812px');

    // add transitions back
    $('.pages-cont').addClass('transition');
    $('.app').each((index, element) => {
        $(element).addClass('transition');
    })
    $('.unlocked-bottom').addClass('transition');
}

// Coded By WhiteDevil (no need to write this anyway lmao)