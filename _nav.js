export default{
    data(){
        return {

        }
    },
    template:
    `
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <span @click="$emit('changePage', 'vccontent')" class="navbar-brand user-select-none" style="font-family:'Newsreader', serif;">
                HCMUS’s Cafeteria
            </span>
            <form class="d-flex" role="search">
            <button @click="$emit('changePage', 'vcmenu')" type="button" class="btn btn-success me-4">Menu</button>
            <button @click="$emit('changePage', 'vcreport')" type="button" class="btn btn-success me-4">Báo cáo</button>
            <button @click="$emit('changePage', 'vcimport')" type="button" class="btn btn-success me-4">Kho hàng</button>
            <button @click="$emit('changePage', 'vcsell')" type="button" class="btn btn-success me-4">Bán hàng</button>
            </form>
        </div>
    </nav>
    `
}