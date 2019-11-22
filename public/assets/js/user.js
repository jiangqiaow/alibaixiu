$('#userForm').on('submit', function () {
    var fromData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: fromData,
        success: function (response) {
            console.log(response)
            location.reload();
        },
        error: function () {
            alert('用户添加失败');
        }

    })
    return false;
})
$('#modifyBox').on('change','#avatar', function () {
    //用户选择到的文件
    //this。files[0];
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData: false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})

$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response)
        var html = template('userTpl', { data: response })
        $('#userBox').html(html);
    }
})

$('#userBox').on('click', '.edit', function () {
    //获取被点击用户的id值
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response)
            var html = template('modifyTpl', response)
            $('#modifyBox').html(html);
        }
    })
});
//为修改表单添加提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    // console.log(formData)
    var id = $(this).attr('data-id')

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            //console.log(response)
            location.reload()
        }

    })
    return false;
});