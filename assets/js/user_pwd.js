$(function () {
  var form = layui.form;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格',
    ],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]') .val()){
        return '新旧密码不能一致！'
      }
    },
    rePwd:function (value) {
      if (value !== $('[name=newPwd]').val()){
        return '两次密码不一致！'
      }
    }
  });

  //监听表单的提交行为
  $('.layui-form').on('submit',function (e) {
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function (res) {
        if (res.status !== 0){
          return layer.msg('密码更新失败！')
        }
        layer.msg('密码更新成功！');
        //重置表单
        $('.layui-form')[0].reset();//[0]是把jq转换为原生态的dom元素
      }
    })
  })
});