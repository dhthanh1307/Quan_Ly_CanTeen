export default{
    inject: ['KhuyenMai'],
    data(){
        return {
        }
    },
    methods: {
        init() {
            $('#MocKM-input').val(this.KhuyenMai.MocKhuyenMai);
            $('#GiaTriKM-input').val(parseFloat(this.KhuyenMai.GiaTriKhuyenMai) * 100);
            $('#GioiHanKM-input').val(parseFloat(this.KhuyenMai.GioiHanKhuyenMai) * 100);
        },
        setDiscount() {
            var mocKM = $('#MocKM-input').val().trim();
            var giaTriKM = $('#GiaTriKM-input').val().trim();
            var gioiHanKM = $('#GioiHanKM-input').val().trim();
        
            if (mocKM !== '' && giaTriKM !== '' && gioiHanKM !== '') {
                giaTriKM = parseFloat(giaTriKM) / 100;
                gioiHanKM = parseFloat(gioiHanKM) / 100;
        
                this.$emit('updateDiscount', mocKM, giaTriKM, gioiHanKM);
                alert('Cập nhật khuyến mãi thành công!');
            }
        }
    },
    mounted() {
        this.init();
    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold user-select-none">Thiết lập khuyến mãi</span>
        </nav>
        <div class="row d-flex flex-row justify-content-center align-items-center col-12 ms-4">
            <div class="card text-bg-light m-4 menu-detail">
                <div class="d-flex justify-content-center">
                    <span class="fs-5 fw-bold user-select-none">Chỉnh sửa khuyến mãi</span>
                </div>
                <div class="d-flex flex-column">
                    <div class="mb-3">
                        <label for="MocKM-input" class="form-label">Mốc khuyến mãi (VNĐ)</label>
                        <input type="number" class="form-control" id="MocKM-input">
                    </div>
                    <div class="mb-3">
                        <label for="GiaTriKM-input" class="form-label">Giá trị khuyến mãi mỗi mốc (%)</label>
                        <input type="number" class="form-control" id="GiaTriKM-input">
                    </div>
                    <div class="mb-3">
                        <label for="GioiHanKM-input" class="form-label">Giới hạn khuyến mãi (%)</label>
                        <input type="number" class="form-control" id="GioiHanKM-input">
                    </div>
                </div>
                <div class="button-group d-flex flex-column gap-2">
                <div class="d-flex justify-content-center w-100">
                    <button @click="setDiscount()" type="button" class="btn btn-success w-100">Xác nhận</button>
                </div>
            </div>
            </div>
        </div>
    </div>`
}