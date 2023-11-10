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
            <div class="card text-bg-success m-4 mx-auto" style="max-width: 25rem;height:13rem">
                <div class="card-body ">
                    <h1 class="card-title text-center mt-5 user-select-none">Bán hàng</h1>
                </div>
            </div>
            <div @click="$emit('changePage', 'vcmenu')" class="card text-bg-success m-4  mx-auto " style="max-width: 25rem;height:13rem">
                <div class="card-body">
                    <h1 class="card-title text-center mt-5 user-select-none">Quản lý thực đơn</h1>
                </div>
            </div>
        </div>
        <div class="row d-flex w-100 mt-5"  >
            <div @click="$emit('changePage', 'vcreport')" class="card text-bg-success m-4  mx-auto " style="max-width: 25rem;height:13rem;">
                <div class="card-body">
                    <h1 class="card-title text-center mt-5 user-select-none">Báo cáo doanh thu</h1>
                </div>
            </div>
            <div @click="$emit('changePage', 'vcimport')" class="card text-bg-success m-4  mx-auto " style="max-width: 25rem;height:13rem">
                <div class="card-body">
                    <h1 class="card-title text-center mt-5 user-select-none">Quản lí kho hàng</h1>
                </div>
            </div>
        </div>
   
    </div>`
}