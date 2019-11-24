
$('#addCategory').on('submit', function () {
    var formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    })
})

$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //console.log(response);
        var html = template('categoryListTpl', { data: response });
        // console.log(html);
        $('#categoryBox').html(html);
    }
})

$('#categoryBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    // console.log(id);

    $.ajax({
        url: '/categories/' + id,
        type: 'get',
        success: function (response) {
            // console.log(response);
            var html = template('modifycategoryTpl', response);
            $('#formBox').html(html);
        }

    })
})
//当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function () {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        url: '/categories/' + id,
        type: 'put',
        data: formData,
        success: function (response) {
            //console.log(response);
            var html = template('modifycategoryTpl', response)
            // console.log(html)
            location.reload();
        }
    })

    //阻止表单默认提交行为
    return false;
})

$('#categoryBox').on('click', '.delete', function () {
    if(confirm('你要删除这个？')){
      var id=  $(this).attr('data-id')
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})
