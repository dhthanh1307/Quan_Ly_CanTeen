export default{
    data(){
        return {

        }
    },
    template:
    `<div class="container w-100 ">
        <nav class="navbar  w-100 ">
                <span class="navbar-brand fs-1 fw-bold" >Quản lý căn tin</span>
        </nav>
        <div class="row d-flex w-100 mb-5  " >
            <div class="card text-bg-success mt-4 mx-auto" @click="$emit('changePage', 'vcsell')" style="max-width: 18rem;">
            <img src="../images/content2.jpg" class="card-img-top mt-2" alt="..."> 
                <div class="card-body ">
                    <h3 class="card-title text-center mt-2 user-select-none" >Bán hàng</h3>
                </div>
            </div>
            <div @click="$emit('changeMenu')" class="card text-bg-success mt-4  mx-auto " style="max-width: 18rem;">
                <img src="../images/content1.jpg" class="card-img-top mt-2" alt="..."> 
                
                <div class="card-body">
                    <h3 class="card-title text-center mt-2 user-select-none" @click="$emit('changeMenu')">Quản lý thực đơn</h3>
                </div>
            </div>
            <div @click="$emit('changePage', 'vcreport')" class="card text-bg-success mt-4  mx-auto " style="max-width: 18rem;">
                <img src="../images/content4.jpg" class="card-img-top mt-2" alt="..."> 

                <div class="card-body">

                    <h3 class="card-title text-center mt-2 user-select-none" @click="$emit('changePage', 'vcreport')">Báo cáo doanh thu</h3>
                </div>
            </div>
            <div @click="$emit('changeImport')" class="card text-bg-success mt-4  mx-auto " style="max-width: 18rem;">
                <img src="../images/content3.jpg" class="card-img-top mt-2" alt="..."> 
                <div class="card-body">
                    <h3 class="card-title text-center mt-2 user-select-none" @click="$emit('changeImport')">Quản lí kho hàng</h3>
                </div>
            </div>
        </div>
        
   
    </div>`
}