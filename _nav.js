export default{
    data(){
        return {

        }
    },
    template:
    `
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <span @click="$emit('changePage', 'vccontent')" class="navbar-brand user-select-none fw-bold" style="font-family:'Newsreader', serif;font-size:30px;color:#426b1f">
                HCMUS’s Cafeteria
            </span>
            <form class="d-flex" role="search">
            <button @click="$emit('changeMenu')" type="button" class="btn btn-success me-4">Menu</button>
            <button @click="$emit('changePage', 'vcreport')" type="button" class="btn btn-success me-4">Báo cáo</button>
            <button @click="$emit('changeImport')" type="button" class="btn btn-success me-4">Kho hàng</button>
            <button @click="$emit('changeServing')" type="button" class="btn btn-success me-4">Chỉ tiêu</button>
            <button @click="$emit('changePage', 'vcsell')" type="button" class="btn btn-success me-4">Bán hàng</button>
            <button @click="$emit('changeStaff')" type="button" class="btn btn-success me-4">Nhân sự</button>
            <button @click="$emit('logOut')" type="button" class="btn btn-success me-4">Đăng xuất</button>
            </form>
        </div>
    </nav>
    `
}