export default{
    inject: ['ListThucPham'],
    data(){
        return {
            selectedId: null,
            selectedID_Max: 0
        }
    },
    methods: {
        chooseItem(id, name, unit, max) {
            if (this.selectedId == id) {
                this.selectedID_Max = 0;
                this.selectedId = null;
                $('#ID-input-i').val("");
                $('#Name-input-i').val("");
                $('#Unit-input-i').val("");
                $('#Quantity-input-i').val("");
                $('#Price-input-i').val("");
                $('#totalTax').text("0đ");
                $('#totalPrice').text("0đ");
                $('#ID-input-e').val("");
                $('#Name-input-e').val("");
                $('#Unit-input-e').val("");
                $('#Quantity-input-e').val("");
            }
            else {
                this.selectedId = id;
                this.selectedID_Max = max;
                $('#ID-input-i').val(id);
                $('#Name-input-i').val(name);
                $('#Unit-input-i').val(unit);
                $('#Quantity-input-i').val("");
                $('#Price-input-i').val("");
                $('#totalTax').text("0đ");
                $('#totalPrice').text("0đ");
                $('#ID-input-e').val(id);
                $('#Name-input-e').val(name);
                $('#Unit-input-e').val(unit);
                $('#Quantity-input-e').val("");
            }
        },
        updateTotal() {
            let quantity = parseInt($('#Quantity-input-i').val()) || 0;
            let price = parseInt($('#Price-input-i').val()) || 0;
            let total = quantity * price;
            $('#totalTax').text((parseInt(total) / 10) + 'đ');
            $('#totalPrice').text(total + 'đ');
        },
        insertThucPham() {
            if (this.selectedId != null && $("#Price-input-i").val().trim() !== '' && $('#Quantity-input-i').val().trim() !== '') {
                this.$emit('insertThucPham', $('#ID-input-i').val(), $('#Quantity-input-i').val(), $('#Price-input-i').val());
            }
        },
        removeThucPham() {
            if (this.selectedId != null && $('#Quantity-input-e').val().trim() !== '') {
                if ($('#Quantity-input-e').val() > this.selectedID_Max) {
                    alert("Export failed!");
                }
                else {
                    this.$emit('removeThucPham', $('#ID-input-e').val(), $('#Quantity-input-e').val());
                }
            }
        },
        emitSearch() {
            if ($('#inputKeyword').val().trim() !== '') {
                this.$emit('searchThucPham', $('#inputKeyword').val());
            }
            else this.$emit('searchThucPham', "");
        }
    },
    template:
    `<div class="container w-100 mb-5">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold user-select-none">Quản lý kho hàng</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column align-items-center col-7">
                <div class="d-flex w-100">
                    <input id="inputKeyword" class="form-control me-2" placeholder="Tìm kiếm">
                    <button class="btn btn-outline-success w-25" @click="emitSearch">Tìm kiếm</button>
                </div>
                <div class="card text-bg-success mt-4 goods-display">
                    <div class="card-body d-flex flex-row flex-wrap justify-content-between align-content-start overflow-hidden overflow-y-auto gap-4">
                    <template v-for="thucpham in ListThucPham">
                    <div :id="thucpham.MaThucPham" @click="chooseItem(thucpham.MaThucPham, thucpham.TenThucPham, thucpham.DonViTinh, thucpham.SoLuongTrongKho)" :class="{ 'chosen-item': selectedId === thucpham.MaThucPham }" class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                        <span class="fs-6 fw-bold user-select-none">{{ thucpham.TenThucPham }}</span>
                        <span class="fs-6 fw-bold user-select-none">{{ thucpham.SoLuongTrongKho }} {{ thucpham.DonViTinh }}</span>
                    </div>
                </template>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column col-5">
                <div class="card text-bg-light m-4 import-detail">
                    <div class="d-flex justify-content-center">
                        <span class="fs-5 fw-bold user-select-none">Nhập hàng</span>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="ID-input" class="form-label">ID</label>
                                <input type="text" class="form-control" id="ID-input-i" disabled="true">
                            </div>
                            <div class="mb-3">
                                <label for="Name-input" class="form-label">Tên</label>
                                <input type="text" class="form-control" id="Name-input-i" disabled="true">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="Quantity-input" class="form-label">Số lượng</label>
                                <input type="number" @input="updateTotal()" class="form-control" id="Quantity-input-i">
                            </div>
                            <div class="mb-3">
                                <label for="Unit-input" class="form-label">Đơn vị tính</label>
                                <input type="text" class="form-control" id="Unit-input-i" disabled="true">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="Price-input" class="form-label">Đơn giá</label>
                                <input type="number" @input="updateTotal()" class="form-control" id="Price-input-i">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <span class="fs-5">Thuế</span>
                            <span class="fs-5" id="totalTax">0đ</span>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <span class="fs-5 fw-bold">Tổng tiền</span>
                            <span class="fs-5 fw-bold" id="totalPrice">0đ</span>
                        </div>
                        <div class="button-group d-flex flex-column gap-2 mt-3">
                            <div class="d-flex justify-content-center w-100">
                                <button @click="insertThucPham" type="button" class="btn btn-success w-100">&larr; Nhập hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card text-bg-light m-4 export-detail">
                    <div class="d-flex justify-content-center">
                        <span class="fs-5 fw-bold user-select-none">Xuất hàng</span>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="ID-input" class="form-label">ID</label>
                                <input type="text" class="form-control" id="ID-input-e" disabled="true">
                            </div>
                            <div class="mb-3">
                                <label for="Name-input" class="form-label">Tên</label>
                                <input type="text" class="form-control" id="Name-input-e" disabled="true">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="Quantity-input" class="form-label">Số lượng</label>
                                <input type="number" class="form-control" id="Quantity-input-e">
                            </div>
                            <div class="mb-3">
                                <label for="Unit-input" class="form-label">Đơn vị tính</label>
                                <input type="text" class="form-control" id="Unit-input-e" disabled="true">
                            </div>
                        </div>
                        <div class="button-group d-flex flex-column gap-2">
                            <div class="d-flex justify-content-center w-100">
                                <button @click="removeThucPham()" type="button" class="btn btn-success w-100">&larr; Xuất hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}