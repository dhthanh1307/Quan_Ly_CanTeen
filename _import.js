export default{
    data(){
        return {
            exampleGoods: [{id: "gao", name: "Gạo", quantity: 100, unit: "kg", price: 25000}, {id: "gao", name: "Gạo", quantity: 100, unit: "kg", price: 25000}, {id: "gao", name: "Gạo", quantity: 100, unit: "kg", price: 25000}, {id: "gao", name: "Gạo", quantity: 100, unit: "kg", price: 25000}, {id: "gao", name: "Gạo", quantity: 100, unit: "kg", price: 25000}, {id: "gao", name: "Gạo", quantity: 100, unit: "kg", price: 25000}]
        }
    },
    methods: {

    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold" >Quản lý kho hàng</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column col-7">
                <div class="card text-bg-success m-4 goods-display">
                    <div class="card-body d-flex flex-row flex-wrap justify-content-between align-content-start overflow-hidden overflow-y-auto gap-4">
                        <template v-for="goods in exampleGoods">
                            <div class="card text-bg-light goods-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ goods.name }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ goods.quantity }} {{ goods.unit }}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column col-5">
                <div class="card text-bg-light m-4 import-detail">
                    <div class="d-flex justify-content-center">
                        <span class="fs-5 fw-bold">Nhập hàng</span>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="ID-input" class="form-label">ID</label>
                                <input type="text" class="form-control" id="ID-input">
                            </div>
                            <div class="mb-3">
                                <label for="Name-input" class="form-label">Tên</label>
                                <input type="text" class="form-control" id="Name-input">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="Quantity-input" class="form-label">Số lượng</label>
                                <input type="number" class="form-control" id="Quantity-input">
                            </div>
                            <div class="mb-3">
                                <label for="Unit-input" class="form-label">Đơn vị tính</label>
                                <input type="text" class="form-control" id="Unit-input">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="Price-input" class="form-label">Đơn giá</label>
                                <input type="number" class="form-control" id="Price-input">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <span class="fs-5">Thuế</span>
                            <span class="fs-5">0đ</span>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <span class="fs-5 fw-bold">Tổng tiền</span>
                            <span class="fs-5 fw-bold">0đ</span>
                        </div>
                        <div class="button-group d-flex flex-column gap-2 mt-3">
                            <div class="d-flex justify-content-center w-100">
                                <button @click="addItem()" type="button" class="btn btn-success w-100">&larr; Nhập hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card text-bg-light m-4 export-detail">
                    <div class="d-flex justify-content-center">
                        <span class="fs-5 fw-bold">Xuất hàng</span>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="ID-input" class="form-label">ID</label>
                                <input type="text" class="form-control" id="ID-input">
                            </div>
                            <div class="mb-3">
                                <label for="Name-input" class="form-label">Tên</label>
                                <input type="text" class="form-control" id="Name-input">
                            </div>
                        </div>
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="mb-3">
                                <label for="Quantity-input" class="form-label">Số lượng</label>
                                <input type="number" class="form-control" id="Quantity-input">
                            </div>
                            <div class="mb-3">
                                <label for="Unit-input" class="form-label">Đơn vị tính</label>
                                <input type="text" class="form-control" id="Unit-input">
                            </div>
                        </div>
                        <div class="button-group d-flex flex-column gap-2">
                            <div class="d-flex justify-content-center w-100">
                                <button @click="addItem()" type="button" class="btn btn-success w-100">&larr; Xuất hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}