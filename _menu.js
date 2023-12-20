export default{
    inject: ['ListMonAn'],
    data(){
        return {
            isHovered:false,
            hoveredImage:null,
            selectedId: null,
            CongThuc: null,
            emptyCongThuc: null,
            add: false
        }
    },
    computed: {
        imageStyle() {
            return {
                transform: this.isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s',
                zIndex: this.isHovered ? 1 : 0,
            };
        },
    },
    methods: {
        getEmptyCongThuc() {
            console.log(this.ListMonAn[0].CongThuc);
            this.emptyCongThuc = [...this.ListMonAn[0].CongThuc];
            this.emptyCongThuc.forEach(ct => {
                ct.SoLuongThucPham = 0;
            });
            console.log(this.emptyCongThuc);
        },
        chooseItem(id, name, price, recipe) {
            if (this.selectedId == id) {
                this.selectedId = null;
                this.CongThuc = null;
                $('#ID-input').val("");
                $('#Name-input').val("");
                $('#Price-input').val("");
            }
            else {
                this.selectedId = id;
                this.CongThuc = recipe;
                $('#ID-input').val(id);
                $('#Name-input').val(name);
                $('#Price-input').val(price);
            }
        },
        updateItem() {
            if (this.selectedId != null) {
                const newCongThuc = this.CongThuc.map(ct => {
                    const inputField = $(`#${ct.MaThucPham}-input`);
                    return {
                        MaThucPham: ct.MaThucPham,
                        SoLuongThucPham: inputField ? inputField.val() : null,
                    };
                });
                this.$emit('updateItem', $('#ID-input').val(), $('#Name-input').val(), $('#Price-input').val(), newCongThuc);
            }
        },
        hover(image) {
            this.isHovered = true;
            this.hoveredImage = image;
        },
        unhover() {
            this.isHovered = false;
            this.hoveredImage = null;
        },
        switchToAddForm() {
            $('#EditForm').css("display", "none");
            $('#AddForm').css("display", "block");
            this.add = true;
        },
        switchToEditForm() {
            $('#EditForm').css("display", "block");
            $('#AddForm').css("display", "none");
            this.add = false;
        },
        addNewMonAn() {
            if ($('#ID-add').val().trim() !== '' && $("#Name-add").val().trim() !== '' && $("#Price-add").val().trim() !== '' && $("#Date-add").val().trim() !== '' && $("#Image-add").val().trim() !== '') {
                const newCongThuc = this.emptyCongThuc.map(ct => {
                    const inputField = $(`#${ct.MaThucPham}-add`);
                    return {
                        MaThucPham: ct.MaThucPham,
                        SoLuongThucPham: inputField ? inputField.val() : null,
                    };
                });
                this.$emit('addMonAn', $('#ID-add').val(), $('#Name-add').val(), $('#Price-add').val(), $('#Date-add').val(), $('#Image-add').val(), newCongThuc);
                this.getEmptyCongThuc();
            }
        }
    },
    mounted() {
        this.add = false;
        setTimeout(() => {
            this.getEmptyCongThuc();
        }, 100);
    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold user-select-none">Quản lý menu</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column col-8">
                <div class="card text-bg-success m-4 menu-display" style="height:720px">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in ListMonAn">
                            <div v-if="food.MaMonAn[0] == 'C'" :id="food.MaMonAn" @click="chooseItem(food.MaMonAn, food.TenMonAn, food.GiaBan, food.CongThuc)"
                            :class="{ 'chosen-item': selectedId === food.MaMonAn }"
                            class="card text-bg-light" style="width:238px">
                                <img :src="food.HinhAnh" class="card-img-top mt-2" alt="..." style="width:235px;height:250px"
                                @mouseover="hover(food)"
                                @mouseout="unhover"
                                :style="hoveredImage === food ? imageStyle : {}">                                                    
                                <div class="card-body  d-flex flex-column justify-content-evenly text-center">
                                    <span class="fs-6 fw-bold user-select-none">{{ food.TenMonAn }}</span>
                                    <span class="fs-6 fw-bold user-select-none">{{ food.GiaBan }}đ</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="card text-bg-success m-4 menu-display" style="height:720px">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in ListMonAn">
                            <div v-if="food.MaMonAn[0] != 'C'" :id="food.MaMonAn" @click="chooseItem(food.MaMonAn, food.TenMonAn, food.GiaBan, food.CongThuc)" 
                            :class="{ 'chosen-item': selectedId === food.MaMonAn }" 
                            class="card text-bg-light" style="width:238px">
                                <img :src="food.HinhAnh" class="card-img-top mt-2" alt="..." style="width:235px;height:250px"
                                @mouseover="hover(food)"
                                @mouseout="unhover"
                                :style="hoveredImage === food ? imageStyle : {}">                                                     
                                <div class="card-body  d-flex flex-column justify-content-evenly text-center">
                                    <span class="fs-6 fw-bold user-select-none">{{ food.TenMonAn }}</span>
                                    <span class="fs-6 fw-bold user-select-none">{{ food.GiaBan }}đ</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div id="EditForm" class="card text-bg-light m-4 menu-detail" style="display: block;">
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
                    <template v-if="this.selectedId !== null && this.selectedId[0] == 'C' && this.add == false" class="d-flex flex-column align-items-center">
                        <div class="mb-3">
                            <label class="form-label">Nguyên liệu</label>
                        </div>
                        <div class="mb-3" style="max-height: 400px !important; overflow: auto !important;">
                            <template v-for="ct in this.CongThuc">
                                <template v-if="ct.MaThucPham.startsWith('GV_') || ct.MaThucPham.startsWith('HS_') || ct.MaThucPham.startsWith('LT_') || ct.MaThucPham.startsWith('RC_') || ct.MaThucPham.startsWith('TPS_') || ct.MaThucPham.startsWith('TR_')">
                                    <div class="d-flex flex-row mb-3">
                                        <label :for="ct.MaThucPham + '-input'" style="margin-top: 5px;" class="form-label text-center w-50">{{ ct.TenThucPham }}</label>
                                        <input type="number" v-model="ct.SoLuongThucPham" class="form-control w-50" :id="ct.MaThucPham + '-input'">
                                    </div>
                                </template>
                            </template>
                        </div>
                    </template>
                    <div class="button-group d-flex flex-column gap-2">
                        <div class="d-flex justify-content-center w-100">
                            <button @click="updateItem()" type="button" class="btn btn-success w-100">&larr; Chỉnh sửa</button>
                        </div>
                        <div class="d-flex justify-content-center w-100">
                            <button @click="switchToAddForm()" type="button" class="btn btn-success w-100">&rarr; Thêm món ăn</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="AddForm" class="card text-bg-light m-4 menu-detail" style="display: none;">
                <div class="d-flex justify-content-center">
                    <span class="fs-5 fw-bold user-select-none">Thêm</span>
                </div>
                <div class="d-flex flex-column">
                    <div class="mb-3">
                        <label for="ID-add" class="form-label">ID <span style="color: red;">*Phải bắt đầu bằng kí tự 'C'</span></label>
                        <input type="text" class="form-control" id="ID-add">
                    </div>
                    <div class="mb-3">
                        <label for="Name-add" class="form-label">Tên món</label>
                        <input type="text" class="form-control" id="Name-add">
                    </div>
                    <div class="mb-3">
                        <label for="Price-add" class="form-label">Giá tiền</label>
                        <input type="number" class="form-control" id="Price-add">
                    </div>
                    <div class="mb-3">
                        <label for="Date-add" class="form-label">Ngày hết hạn</label>
                        <input type="date" class="form-control" id="Date-add">
                    </div>
                    <div class="mb-3">
                        <label for="Image-add" class="form-label">Đường dẫn ảnh</label>
                        <input type="text" class="form-control" id="Image-add">
                    </div>
                    <template v-if="this.add == true" class="d-flex flex-column align-items-center">
                        <div class="mb-3">
                            <label class="form-label">Nguyên liệu</label>
                        </div>
                        <div class="mb-3" style="max-height: 400px !important; overflow: auto !important;">
                            <template v-for="ct in this.emptyCongThuc">
                                <template v-if="ct.MaThucPham.startsWith('GV_') || ct.MaThucPham.startsWith('HS_') || ct.MaThucPham.startsWith('LT_') || ct.MaThucPham.startsWith('RC_') || ct.MaThucPham.startsWith('TPS_') || ct.MaThucPham.startsWith('TR_')">
                                    <div class="d-flex flex-row mb-3">
                                        <label :for="ct.MaThucPham + '-add'" style="margin-top: 5px;" class="form-label text-center w-50">{{ ct.TenThucPham }}</label>
                                        <input type="number" v-model="ct.SoLuongThucPham" class="form-control w-50" :id="ct.MaThucPham + '-add'">
                                    </div>
                                </template>
                            </template>
                        </div>
                    </template>
                    <div class="button-group d-flex flex-column gap-2">
                        <div class="d-flex justify-content-center w-100">
                            <button @click="addNewMonAn" type="button" class="btn btn-success w-100">&larr; Thêm</button>
                        </div>
                        <div class="d-flex justify-content-center w-100">
                            <button @click="switchToEditForm()" type="button" class="btn btn-success w-100">&rarr; Chỉnh sửa món ăn</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}