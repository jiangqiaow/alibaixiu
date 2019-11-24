


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
$('#modifyBox').on('change', '#avatar', function () {
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

$('#userBox').on('click', '.delete', function () {

    if (confirm('你真的要删除当前用户？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})
//获取全选按钮
var seletAll = $('.seletAll')

var deletMany = $('#deletMany');
//当全选按钮的状态发生改变时
seletAll.on('change', function () {
    //获取到全选按钮房钱的状态
    var status = $(this).prop('checked')
    //获取到所有用户
    $('#userBox').find('input').prop('checked', status);

    if (status) {
        seletAll.prop('checked', true);
        deletMany.show();
    } else {
        deletMany.hide();
    }

})

$('#userBox').on('change', '.userStatus', function () {
    var inputs = $('#userBox').find('input');
    //filter() 过滤
    //当用户的input的长度 ==过滤的长度 等于为true 反之false
    if (inputs.length == inputs.filter(':checked').length) {
        seletAll.prop('checked', true);
    } else {
        seletAll.prop('checked', false);
    };

    if (inputs.filter(':checked').length > 0) {
        deletMany.show();
    } else {
        deletMany.hide();
    }

})

deletMany.on('click', function () {
    var ids = []
    var checkUser = $('#userBox').find('input').filter(':checked');
    checkUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    if(confirm('你真的要删除？')){
        $.ajax({
            type:'delete',
            url:'/users/'+ids.join('-'),
            success(){
                location.reload();
            }
        })
    }
})