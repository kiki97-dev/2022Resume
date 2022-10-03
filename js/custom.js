$(function () {
    let cursor = $(".cursor");
    let a = $("a");
    let speed = 500;
    let sections = $("section");
    let transitionEffect = $(".transition_effect");
    let portfolio = $(".portfolio");
    let isdone = true;
    let video = $(".video_box video").get(0);
    let back = $(".back");

    let pos_arr = [];
    let init_pos = $(".list>li").first().offset().left;
    let scrollCnt = 0;

    $(".list>li").each(function () {
        pos_arr.push($(this).offset().left);
    });

    back.on("click", function (e) {
        e.preventDefault();
        scrollCnt = 0;
        $(".list>li").each(function (index) {
            $(this).animate({
                left: pos_arr[index]
            });
        })

    })


    $(window).on("mousemove", function (e) {
        let x = e.pageX;
        let y = e.pageY;

        cursor.css({ "left": x, "top": y, });
    })

    a.on("mouseenter", function () {
        cursor.addClass("on");
    })

    a.on("mouseleave", function () {
        cursor.removeClass("on");
    })

    transitionEffect.on("wheel", function (e) {
        e.preventDefault();
    })

    sections.on("wheel", function (e) {
        e.preventDefault();

        if (e.originalEvent.deltaY < 0) {
            if (scrollCnt > 0) {
                scrollCnt -= 120;
                $(".list>li").each(function (index) {
                    $(this).css({
                        left: pos_arr[index] - scrollCnt
                    });
                })
            }
            if ($(this).index() != 1 && isdone && scrollCnt <= 0) {
                console.log(scrollCnt);
                isdone = false;
                transitionEffect.removeClass("on");
                setTimeout(function () {
                    portfolio.removeClass("active");
                    video.pause();

                }, 600);

                setTimeout(function () {
                    isdone = true;
                }, 1000);

            }
        } else {
            if ($(this).index() < sections.length && isdone) {
                isdone = false;

                transitionEffect.addClass("on");
                setTimeout(function () {
                    portfolio.addClass("active");
                    video.play();

                }, 600);

                setTimeout(function () {
                    isdone = true;
                }, 1000);
            }

            if (portfolio.hasClass("active")) {
                scrollCnt += 120;
                $(".list>li").each(function (index) {
                    $(this).css({
                        left: pos_arr[index] - scrollCnt
                    });
                })

            }


        }

        /* if (e.originalEvent.deltaY < 0) {
            //마스휠 올림
            if ($(this).index() != 1) {
                console.log("안돼");
                let targetPos = sections.eq($(this).index()-2).offset().top;
                console.log(targetPos);
                $("html, body").stop().animate({ scrollTop: targetPos }, speed);
                cursor.css({ "top": y, });
            }

        } else {
            //휠 내림
            if ($(this).index() < sections.length) {
                let targetPos = sections.eq($(this).index()).offset().top;
                $("html, body").stop().animate({ scrollTop: targetPos }, speed);
            }
        } */
    })

})