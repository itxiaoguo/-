$(function () {
  getUserInfo();

  //退出
  $('#btnLogout').on('click',function () {


    //eg1
    layer.confirm('确定退出登录？', {icon: 3, title:'提示'},
      function(index){
        //1.清除本地储存的token
        localStorage.removeItem('token');
        //2.跳转到登录页面
        location.href = 'login.html' ;
        layer.close(index);
      });
  })
});

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    //headers就是请求头配置
    // header:{
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if(res.status !== 0){
        return layui.msg('获取用户信息失败！')
      }
      renderAvatar(res.data);
    }

  })
}

//渲染用户头像
function renderAvatar(user) {
  //1.获取用户的名称
  var name = user.nickname || user.username;
  //2.设置欢迎文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  //3.按需渲染用户头像
  if(user_pic !== null){
    //3.1渲染图片头像
    $('.layui-nav-img')
      //让这个img的图片地址为data中的头像地址
      .attr('src',user.user_pic).show();
    //字母头像隐藏
    $('.text-avatar').hide();
  }else {
    //3.2渲染文本头像
    $('.layui-nav-img').hide();
    //设置文本头像为用户name中的第一个字符的大写
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
}