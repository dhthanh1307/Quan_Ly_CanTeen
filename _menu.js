export default{
    inject: ['ListMonAn'],
    data(){
        return {
            selectedId: null
        }
    },
    methods: {
        chooseItem(id, name, price) {
            if (this.selectedId == id) {
                this.selectedId = null;
                $('#ID-input').val("");
                $('#Name-input').val("");
                $('#Price-input').val("");
            }
            else {
                this.selectedId = id;
                $('#ID-input').val(id);
                $('#Name-input').val(name);
                $('#Price-input').val(price);
            }
        },
        updateItem() {
            if (this.selectedId != null) {
                this.$emit('updateItem', $('#ID-input').val(), $('#Name-input').val(), $('#Price-input').val());
            }
        }
    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold user-select-none">Quản lý menu</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column col-8">
                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in ListMonAn">
                            <div v-if="food.MaMonAn[0] == 'C'" :id="food.MaMonAn" @click="chooseItem(food.MaMonAn, food.TenMonAn, food.GiaBan)" :class="{ 'chosen-item': selectedId === food.MaMonAn }" class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ food.TenMonAn }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ food.GiaBan }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in ListMonAn">
                            <div v-if="food.MaMonAn[0] != 'C'" :id="food.MaMonAn" @click="chooseItem(food.MaMonAn, food.TenMonAn, food.GiaBan)" :class="{ 'chosen-item': selectedId === food.MaMonAn }" class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ food.TenMonAn }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ food.GiaBan }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="card text-bg-light m-4 menu-detail">
                <div class="d-flex justify-content-center">
                    <span class="fs-5 fw-bold user-select-none">Chỉnh sửa</span>
                </div>
                <div class="d-flex flex-column">
                    <div class="mb-3">
                        <label for="ID-input" class="form-label">ID</label>
                        <input type="text" class="form-control" id="ID-input" disabled="true">
                    </div>
                    <div class="mb-3">
                        <label for="Name-input" class="form-label">Tên món</label>
                        <input type="text" class="form-control" id="Name-input">
                    </div>
                    <div class="mb-3">
                        <label for="Price-input" class="form-label">Giá tiền</label>
                        <input type="number" class="form-control" id="Price-input">
                    </div>
                    <div class="button-group d-flex flex-column gap-2">
                        <div class="d-flex justify-content-center w-100">
                            <button @click="updateItem()" type="button" class="btn btn-success w-100">&larr; Chỉnh sửa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}