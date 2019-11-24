
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //console.log(response)
        var html = template('categoryTpl', { data: response })
        $('#category').html(html);
    }
})

$('#feature').on('change', function () {
    //获取到管理员选择的文件
    var file = this.files[0];
    //创建formData对象 实现二进制文件上传
    var formData = new FormData();
    //实现文章封面图片上传
    formData.append('cover', file);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            $('#thumbnail').val(response[0].cover);
        }
    })
})

//当添加文章表单提交的时候

$('#addForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        url:'/posts',
        type:'post',
        data:formData,
        success:function(){
            location.href='/admin/posts.html'
        }
    })

    return false;

})