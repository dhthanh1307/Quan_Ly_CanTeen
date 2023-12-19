export default{
    data(){
        return {
            
        }
    },
    methods: {
        login() {
            this.$emit('login', $('#username').val(), $('#password').val(), $('#isAdmin').is(':checked'));
        },
    },
    template:
    `<div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h3 class="text-center text-dark mt-3">Đăng nhập</h3>
                <div class="card my-5">
                    <div class="card-body cardbody-color p-lg-5">
                        <div class="text-center">
                            <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile">
                        </div>
                        <div class="mb-3">
                        <input type="text" class="form-control" id="username" placeholder="Tên đăng nhập" required="true">
                        </div>
                        <div class="mb-3">
                        <input type="password" class="form-control" id="password" placeholder="Mật khẩu" required="true">
                        </div>
                        <div class="form-check mb-3 float-end">
                            <input class="form-check-input" type="checkbox" value="" id="isAdmin">
                            <label class="form-check-label" for="isAdmin">
                                Admin
                            </label>
                        </div>
                        <div class="text-center">
                            <button @click="login()" class="btn btn-color px-5 mb-5 w-100">Login</button>
                        </div>
                        <div id="help" class="form-text text-center mb-5 text-dark">
                            Không có tài khoản?
                            <a href="" class="text-dark fw-bold"> Liên hệ 0246813579</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>`
}