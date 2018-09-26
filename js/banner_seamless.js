/*
//面向过程的写法
$(function () {

    var $tabLi = $('#banner .tab li');
    var $picUl = $('#banner .pic ul');
    var $banner = $('#banner');
    var $btn = $('#banner .btn');
    var $btnA = $('#banner .btn a');
    //运动的宽度 （不带单位）
    var imgWidth = $('#banner .pic li').width();
    var index = 0;
    //目前时间
    var nowTime = new Date();

    //小圆点点击事件
    $tabLi.click(function () {
        //获取当前的序列号
        index = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        //动画animate({属性 ： 值}，时间);
        $picUl.animate({
            marginLeft: -imgWidth * (index + 1) + 'px'
        }, 300);
    });
    //hover 的第一个函数是移入事件，第二个是移出事件
    $banner.hover(function () {
        $btn.show();
        clearInterval(timer);
    }, function () {
        $btn.hide();
        timer = setInterval(function () {
            index++;
            fn();
        }, 2000);
    });
    //鼠标移入移出改变btn的背景
    $btnA.hover(function () {
        $(this).addClass('on');
    }, function () {
        $(this).removeClass('on');
    });

    //btn点击的时候切换图片
    $btnA.click(function () {
        if (new Date() - nowTime > 300)//当前时间减去上一次时间大于300毫秒才执行
        {
            nowTime = new Date();
            var i = $(this).index();
            //判断点击哪个按钮
            i ? index++ : index--;
            fn();
        }
    }).mousedown(function () {
        return false;
    });
    //开启定时器
    var timer = setInterval(function () {
        index++;
        fn();
    }, 2000);

    function fn() {
        var liIndex = index;
        //判断下标，最后一张时按钮也要回到第一个
        if (liIndex >= $tabLi.length) {
            liIndex = 0;
        }
        else if (liIndex < 0) {
            liIndex = $tabLi.length - 1;
        }
        $tabLi.eq(liIndex).addClass('on').siblings().removeClass('on');
        $picUl.animate({
            marginLeft: -imgWidth * (index + 1) + 'px'
        }, 300, function () {//回调函数判断，让图片瞬间复位
            if (index == $tabLi.length) {
                $picUl.css('marginLeft', -imgWidth + 'px');
                index = 0;
            }
            else if (index < 0) {
                $picUl.css('marginLeft', -imgWidth * ($tabLi.length) + 'px');
                index = $tabLi.length - 1;
            }
        });
    }

});
*/

//面向对象写法
$(function () {

    function Banner(ele) {
        this.$tabLi = $(ele.tabLi);//小圆点
        this.$picUl = $(ele.picUl);
        this.$banner = $(ele.banner);
        this.$btn = $(ele.btn);
        this.$btnA = $(ele.btnA);
        this.imgWidth = $(ele.picLi).width();
        this.index = 0;
        this.nowTime = new Date();
        this.timer = null;
        this.tabLiClick();//小圆点点击切换banner
        this.bannerHover();//鼠标移入停止banner
        this.btnAClick();//左右按钮点击切换banner
        this.autoPlay();//自动切换banner
    }

    Banner.prototype.tabLiClick = function () {
        var _this = this;
        _this.$tabLi.click(function () {
            //获取当前的序列号
            _this.index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            //动画animate({属性 ： 值}，时间);
            _this.$picUl.animate({
                marginLeft: -_this.imgWidth * (_this.index + 1) + 'px'
            }, 300);
        });
    };

    Banner.prototype.bannerHover = function () {
        var _this = this;
        _this.$banner.hover(function () {
            _this.$btn.show();
            clearInterval(_this.timer);
        }, function () {
            _this.$btn.hide();
            _this.timer = setInterval(function () {
                _this.index++;
                fn(_this);
            }, 2000);
        });
    };

    Banner.prototype.btnAClick = function () {
        var _this = this;
        _this.$btnA.click(function () {
            if (new Date() - _this.nowTime > 300)//当前时间减去上一次时间大于300毫秒才执行
            {
                _this.nowTime = new Date();
                var i = $(this).index();
                //判断点击哪个按钮
                i ? _this.index++ : _this.index--;
                fn(_this);
            }
        }).mousedown(function () {
            return false;
        });
    };

    Banner.prototype.autoPlay = function () {
        var _this = this;
        //开启定时器
        _this.timer = setInterval(function () {
            _this.index++;
            fn(_this);
        }, 2000);
    };

    function fn(_this) {
        var liIndex = _this.index;
        //判断下标，最后一张时按钮也要回到第一个
        if (liIndex >= _this.$tabLi.length) {
            liIndex = 0;
        }
        else if (liIndex < 0) {
            liIndex = _this.$tabLi.length - 1;
        }
        _this.$tabLi.eq(liIndex).addClass('on').siblings().removeClass('on');
        _this.$picUl.animate({
            marginLeft: -_this.imgWidth * (_this.index + 1) + 'px'
        }, 300, function () {//回调函数判断，让图片瞬间复位
            if (_this.index == _this.$tabLi.length) {
                _this.$picUl.css('marginLeft', -_this.imgWidth + 'px');
                _this.index = 0;
            }
            else if (_this.index < 0) {
                _this.$picUl.css('marginLeft', -_this.imgWidth * (_this.$tabLi.length) + 'px');
                _this.index = _this.$tabLi.length - 1;
            }
        });
    }

    var banner = new Banner({
        tabLi: '#banner .tab li',
        picUl: '#banner .pic ul',
        banner: '#banner',
        btn: '#banner .btn',
        btnA: '#banner .btn a',
        picLi: '#banner .pic li'
    });

});
