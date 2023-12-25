export default{
    inject: ['ListMonAn', 'isPortionSet', 'portionAmount'],
    data(){
        return {
            currentDate: new Date().toLocaleDateString(),
            selectedId: null, 
            isHovered:false,
            hoveredImage:null,
            displayPortion: 0,
            displayName: null
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
        chooseItem(id, name) {
            if (this.selectedId == id) {
                this.selectedId = null;
                $('#ID-input').val("");
                $('#Name-input').val("");
                $('#Portion-input').val("");
                this.$emit('resetPortionCheck');
            }
            else {
                this.selectedId = id;
                $('#ID-input').val(id);
                $('#Name-input').val(name);
                $('#Portion-input').val("");
                this.$emit('checkPortionSet', id);
            }
        },
        setPortion() {
            if (this.selectedId != null) {
                this.$emit('setPortion', $('#ID-input').val(), $('#Portion-input').val());
                this.displayPortion = 0;
                this.displayName = null;
            }
        },
        alertAlreadySet() {
            alert("Chỉ tiêu của món ăn này cho ngày hôm nay đã được thiết lập rồi!");
        },
        hover(image) {
            this.isHovered = true;
            this.hoveredImage = image;
        },
        unhover() {
            this.isHovered = false;
            this.hoveredImage = null;
        },
        confirmBox() {
            this.displayPortion = $('#Portion-input').val();
            this.displayName = $('#Name-input').val();
            var modalElement = document.getElementById('myModal');
            var modalInstance = new bootstrap.Modal(modalElement, {keyboard: false});
            modalInstance.show();
        }
    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold user-select-none">Chỉ tiêu</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column col-8">
                <div class="card text-bg-success m-4 menu-display" style="height:720px">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in ListMonAn">
                            <div v-if="food.MaMonAn[0] == 'C'" :id="food.MaMonAn" @click="chooseItem(food.MaMonAn, food.TenMonAn)"
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
            <div class="card text-bg-light m-4 menu-detail">
                <div class="d-flex justify-content-center flex-column">
                    <div class="fs-5 fw-bold mt-3 text-center user-select-none">Thiết lập chỉ tiêu</div>
                    <div class="fs-6 fw-bold user-select-none text-center">{{ this.currentDate }}</div>
                </div>
                <div class="d-flex flex-column">
                    <div class="mb-3">
                        <label for="ID-input" class="form-label">ID</label>
                        <input type="text" class="form-control" id="ID-input" disabled="true">
                    </div>
                    <div class="mb-3">
                        <label for="Name-input" class="form-label">Tên món</label>
                        <input type="text" class="form-control" id="Name-input" disabled="true">
                    </div>
                    <div class="mb-3">
                        <label for="Portion-input" class="form-label">Chỉ tiêu</label>
                        <input type="number" class="form-control" id="Portion-input">
                    </div>
                    <div class="button-group d-flex flex-column gap-2">
                        <template v-if="!this.isPortionSet">
                            <div class="d-flex justify-content-center w-100">
                                <button @click="confirmBox()" type="button" class="btn btn-success w-100">&larr; Xác nhận</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="d-flex justify-content-center w-100">
                                <button @click="alertAlreadySet()" type="button" class="btn btn-danger w-100">&larr; Đã thiết lập</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div id="myModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Xác nhận thiết lập chỉ tiêu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <p>Thiết lập chỉ tiêu <span style="color: red;"><b>{{ this.displayPortion }}</b></span> cho món ăn <span style="color: green;"><b>{{ this.displayName }}</b></span></p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button @click="setPortion()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác nhận</button>
                </div>
            </div>
            </div>
        </div>

    </div>`
}