export default{
    data(){
        return {
            selectedId: null,
            exampleFoods: [{id: "f1", name: "Cơm gà", price: 25000}, {id: "f2", name: "Cơm heo", price: 25000}, {id: "f3", name: "Cơm heo", price: 25000}, {id: "f4", name: "Cơm heo", price: 25000}, {id: "f5", name: "Cơm heo", price: 25000}, {id: "f6", name: "Cơm heo", price: 25000}, {id: "f7", name: "Cơm heo", price: 25000}],
            exampleDrinks: [{id: "d1", name: "Cơm gà", price: 25000}, {id: "d2", name: "Cơm heo", price: 25000}, {id: "d3", name: "Cơm heo", price: 25000}]
        }
    },
    methods: {
        chooseItem(id, name, price) {
            this.selectedId = id;
            $('#ID-input').val(id);
            $('#Name-input').val(name);
            $('#Price-input').val(price);
        },
        addItem() {
            this.exampleDrinks.push({id: $('#ID-input').val(), name: $('#Name-input').val(), price: $('#Price-input').val()});
        }
    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold" >Quản lý menu</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column col-8">
                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in exampleFoods">
                            <div :id="food.id" @click="chooseItem(food.id, food.name, food.price)" :class="{ 'chosen-item': selectedId === food.id }" class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ food.name }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ food.price }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="drink in exampleDrinks">
                            <div :id="drink.id" @click="chooseItem(drink.id, drink.name, drink.price)" :class="{ 'chosen-item': selectedId === drink.id }" class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ drink.name }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ drink.price }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="card text-bg-light m-4 menu-detail">
                <div class="d-flex justify-content-center">
                    <span class="fs-5 fw-bold">Chỉnh sửa</span>
                </div>
                <div class="d-flex flex-column">
                    <div class="mb-3">
                        <label for="ID-input" class="form-label">ID</label>
                        <input type="text" class="form-control" id="ID-input">
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
                            <button @click="addItem()" type="button" class="btn btn-success w-100">&larr; Thêm</button>
                        </div>
                        <div class="d-flex justify-content-center w-100">
                            <button type="button" class="btn btn-success w-100">&larr; Chỉnh sửa</button>
                        </div>
                        <div class="d-flex justify-content-center w-100">
                            <button type="button" class="btn btn-success w-100">&larr; Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}