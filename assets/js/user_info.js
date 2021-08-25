$(function () {
  var form = layui.form;

  //为昵称框设定字符限制
  form.verify({
    nickname: function (value) {
      if (value.length < 6){
        return '昵称必须在 1 - 6 个字符之间！'
      }
    }
  });

  initUserinfo();

  //初始化用户信息
  function initUserinfo() {
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function (res) {
        if (res.status !== 0){
          return layer.msg('获取用户信息失败！')
        }
        console.log(res);
        //调用form.val()快速为表单赋值
        from.val('formUserInfo',res.data)
      }
    })
  }

  //为表单添加重置效果
  $('#btnReset').on('click',function (e) {
    //阻止表单的默认重置行为
    e.preventDefault();
    initUserinfo();
  });

  //监听表单的提交行为
  $('.layui-form').on('submit',function (e) {
    //阻止表单的默认提交行为
    e.preventDefault();
    //发起ajax请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),//快速的拿到表单里填写的数据
      success:function (res) {
        if (res.status !== 0){
          return lay.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！');
        //调用父页面中的方法，重新渲染用户的头像和名称信息
        window.parent.getUserInfo();//window.parent表示当前的iframe的父页面
      }
    })
  })
});