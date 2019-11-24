//向服务器端发送请求 获取文章列表数据

$.ajax({
    url: '/posts',
    type: 'get',
    success: function (response) {
        // console.log(response)
        var html = template('postsTpl', response)
        //console.log(html)
        $('#postsBox').html(html);

        var page = template('pageTpl', response);
        $('#page').html(page);
    }
})

//处理日期时间格式
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}




//
function changepage(page) {
    //alert(page)

    $.ajax({
        url: '/posts',
        type: 'get',
        data: { page },
        success: function (response) {
            // console.log(response)
            var html = template('postsTpl', response)
            //console.log(html)
            $('#postsBox').html(html);

            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    })
}