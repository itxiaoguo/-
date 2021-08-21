$(function () {
    //点击去注册链接
    $('#link_reg').on('click',function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    //点击去登录链接
    $('#link_login').on('click',function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //自定义校验规则
    //1.从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //2.通过form.verify函数自定义校验规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能出现空格'],
        repwd: function (value) {
            //通过形参拿到确认密码中的参数
            //还需要拿到密码框中的参数
            var pwd = $('#pwd').val();
            //然后进行一次等于判断
            if (value !== pwd){
                //如果失败，则返回一个消息即可
                return "两次密码不一致!"
            }
        }
    });

    //监听表单的提交事件
    $('#form_reg').on('submit',function (e) {
        //阻止默认提交事件
        e.preventDefault();
        $.post('/api/reguser',
            { username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val() },
            function (res) {
            if (res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！');
            //模拟人点击行为
            $('#link_login').click();
        } )
    });

    //监听登入表单提交行为
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0){
                    return layui.msg('登录失败！')
                }
                layui.msg('登录成功！');
                //将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token);
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
});