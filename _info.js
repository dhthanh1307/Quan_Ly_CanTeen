export default{
    data(){
        return {

        }
    },
    template:
    `
    <div class="row w-100" style="height:500px">
    <div id="carouselExample" class="carousel slide h-100" >
        <div class="carousel-inner h-100">
            <div class="carousel-item active">
                <img src="../images/image1.jpg" class="d-block " alt="..." style="object-fit: contain;">
            </div>
            <div class="carousel-item">
                <img src="../images/image2.jpg" class="d-block w-100 h-100" alt="..." style="object-fit: contain;">
            </div>
            <div class="carousel-item">
                <img src="../images/image3.jpg" class="d-block w-100 h-100" alt="..." style="object-fit: contain;">
            </div>
            <div class="carousel-item">
                <img src="../images/image4.png" class="d-block w-100 h-100" alt="..." style="object-fit: contain;">
            </div>
        </div>
       

      
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>

<div class="bg-success w-100 row "  style="height:250px">
    <h1 class="text-white mt-5 ms-3">Giới thiệu</h1>
    <p class="text-white mb-5  ms-3  text-wrap me-3 w-75" >Chào mừng bạn đến với trang web quản lý canteen của chúng tôi! Đây là nơi bạn có thể dễ dàng đặt hàng, theo dõi đơn hàng và trải nghiệm dịch vụ tuyệt vời của chúng tôi.
    Trang web quản lý canteen của chúng tôi là một nền tảng trực tuyến tiện lợi, dễ sử dụng, giúp cải thiện và tối ưu hóa quy trình quản lý căng tin. Hãy khám phá và tận hưởng những món ăn ngon miệng mà chúng tôi phục vụ. Rất vui được phục vụ bạn!</p>

</div>
<div class="row d-flex w-100"
     style=" background-attachment: fixed;background-image: url('../images/background.jpg');height:500px;background-size:cover">
    <div class="text-white text-center  col-12" style="font-family:'Newsreader', serif; font-size:30px;height:40px;margin-top:100px">Chào mừng các bạn đến với</div>
    <div class="text-white text-center " style="font-family:'Newsreader', serif;font-size:100px;margin-bottom:200px">Website quản lý canteen</div>
</div>
`
}