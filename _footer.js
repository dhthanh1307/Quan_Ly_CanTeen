export default{
    data(){
        return {
            currentDate: new Date().toLocaleDateString()
        }
    },
    template:
    `
    <nav class="navbar bg-success text-white container fw-bold"  style="font-family:'Newsreader', serif;">
       <div class="col-5 p-1 m-1 ms-4">
            <div class="row w-100  d-flex">
                <div class="col-2"><img src="./images/logo.png" style="width:80px"></div>
                <div class="col-8 pt-3"><h2>HCMUS's Cafeteria</h2></div> 
            </div>
            
            Chúng tôi mong muốn HCMUS's Cafeteria sẽ trở thành “Nhà Ăn", nơi mọi người xích lại gần nhau và tìm thấy niềm vui,
            sự sẻ chia thân tình bên những món ăn ngon miệng, chất lượng.
            
       </div>
       <div class="col-3 p-1 m-1">
            <h2>Liên hệ với chung tôi</h2>
            <div>
               Địa chỉ: 227, Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh
            </div>
            <div>
                Hotline: 2112 0123
            </div>
       </div>
       <div class="col-3 p-1 m-1">
            <h2>Đăng kí nhận tin</h2>
            Đừng bỏ lỡ những sản phẩm và chương trình khuyến mãi hấp dẫn
            <div class="d-flex w-100">
                    <input v-on:keyup.enter="emitSearch()" id="inputKeyword" class="form-control me-2" placeholder="Đăng kí">
                    <button class="btn btn-outline-success w-25">Đăng kí</button>
            </div>
       </div>
       <div class="row w-100">
            <div class="col-12  text-end">{{currentDate}}</div>
       </div>
    
    </nav>
    `
}