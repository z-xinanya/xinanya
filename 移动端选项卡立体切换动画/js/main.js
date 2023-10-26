// 功能 --- 点击任意一张卡，被点击卡跳转到最前面 其他卡片依次往后排
// 1.判断当前点击项 为第几张卡片
//当单机第二张时，执行一次，点击第三张时，先执行一次，1s后（既第一次动画执行完毕）再执行一次

// 鼠标点击时执行函数
$(".bg_box").on('click', '.box', function () {

    // 声明变量储存当前点击卡片
    let _this = $(this);

    // 获取当前点击卡片对应data-id
    let this_id = _this.attr("data-id");

    // 判断当前点击的为第几张卡片 通过 data-id 判断
    if (this_id === "1") {
        // 当this_id 等于 1 时，即当前点击的为第一张卡片
        console.log("当前已是第一张，别点了");
    } else if (this_id === "2") {
        // 当this_id 等于 2 时，即当前点击的为第二张卡片

        // 调用动画方法
        ani();

    } else if (this_id === "3") {
        // 当this_id 等于3时，即当前点击的为第三张卡片

        //调用动画
        ani();

        // 1s后再执行一次动画 此时1=3，3=2，2=1
        setTimeout(function () {
            ani();
        }, 1000);
    }
})

// 动画方法
function ani() {
    // 动画逻辑：点击第二张卡片时，所有卡片向前翻转动画，第一张翻转完成后渐隐，而后出现在最后方
    // 一次动画时长为1s
    //知识点：
    //1.attr("data-id","值")，attr可以修改DOM
    //2.根据data-*查询标签，$('需查询data的父元素').find('div[data-id="3"]');

    $('.over_box').show(); //显示遮罩，防止多次点击

    // 根据data-id查询出所有div
    let id_1 = $('.bg_box').find('div[data-id="1"]');
    let id_2 = $('.bg_box').find('div[data-id="2"]');
    let id_3 = $('.bg_box').find('div[data-id="3"]');

    /* 添加动画 */
    id_1.addClass("animation1");
    id_2.addClass("animation2");
    id_3.addClass("animation3");

    // 1s后第一个div添加动画4，从后方渐显
    setTimeout(function () {
        id_1.addClass("animation4")
    }, 500);

    // 设置定时器，在动画执行完毕后，重新绘制出三张卡片 移动后的位置及样式
    setTimeout(function () {
        id_1.css('zIndex', '0');
        id_1.css('bottom', '14.375rem');
        id_1.css('transform', 'scale(0.7, 0.7)');

        id_2.css('zIndex', '2');
        id_2.css('bottom', '0');
        id_2.css('transform', 'scale(1, 1)');

        id_3.css('zIndex', '1');
        id_3.css('bottom', '6.875rem');
        id_3.css('transform', 'scale(0.9, 0.9)');

        // 清空动画
        id_1.removeClass("animation1");
        id_1.removeClass("animation4")
        id_2.removeClass("animation2");
        id_3.removeClass("animation3");

        // 更新移动后的data-id，点击的卡片data-id = 1；再将data-id=1的卡片改为data-id=3；data-id=3的卡片改为data-id=2;
        id_1.attr("data-id", "3");
        id_2.attr("data-id", "1");
        id_3.attr("data-id", "2");

        $('.over_box').hide(); //动画执行完毕，隐藏遮罩
    }, 1000);
}