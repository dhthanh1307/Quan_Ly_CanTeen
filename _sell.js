export default {
    data() {
        return {
            selectedId: null,
            exampleFoods: [{id: "f1", name: "Cơm gà", price: 25000,count:0}, {id: "f2", name: "Cơm heo", price: 25000,count:0}, {id: "f3", name: "Cơm heo", price: 25000,count:0}, {id: "f4", name: "Cơm heo", price: 25000,count:0}, {id: "f5", name: "Cơm heo", price: 25000,count:0}, {id: "f6", name: "Cơm heo", price: 25000,count:0}, {id: "f7", name: "Cơm heo", price: 25000,count:0}],
            exampleDrinks: [{id: "d1", name: "Coca", price: 25000,count:0}, {id: "d2", name: "Pepsi ", price: 25000,count:0}, {id: "d3", name: "7 Up", price: 25000,count:0}]
            
        }
    },
    methods: {
        chooseItem(goods) {
            this.selectedId = goods.id;
            goods.count=goods.count+1;
        },
        removeItem(goods){
            this.selectedId = goods.id;
            goods.count=goods.count-1;
            if(goods.count<0)
                goods.count=0;
        },
        calTotal(){
            let result=0;
            for(let i=0;i< this.exampleDrinks.length;i++)
                result=result+this.exampleDrinks[i].count*this.exampleDrinks[i].price;
            for(let i=0;i< this.exampleFoods.length;i++)
                result=result+this.exampleFoods[i].count*this.exampleFoods[i].price;
            $("#total").html(result.toString()+"đ");
            
        }


    },
    template: `
    <div class="container w-100 ">
        <nav class="navbar  w-100 ">
                <span class="navbar-brand fs-1 fw-bold" >Bán hàng</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column col-8">
                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in exampleFoods">
                            <div :id="food.id" @click="chooseItem(food)" @contextmenu.prevent="removeItem(food)" :class="{ 'chosen-item': selectedId === food.id }" class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ food.name }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ food.price }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="drink in exampleDrinks">
                            <div :id="drink.id" @click="chooseItem(drink)" @contextmenu.prevent="removeItem(drink)" :class="{ 'chosen-item': selectedId === drink.id }" class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ drink.name }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ drink.price }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="card text-bg-light m-4 menu-detail" style="height:650px">
                    <h1 class="fs-4 fw-bold mt-4">Hóa đơn</h1>
                    <p class="  overflow-hidden overflow-y-auto" id="pick" style="height:420px" >
                        <template v-for="drink in exampleFoods">
                            <div class="row" v-if="drink.count>0">
                                <div class="col-6 ms-2 mb-3">{{ drink.name+ " x "+drink.count}}</div>
                                <div class="col-5 text-end">{{ drink.price }}đ</div>
                            </div>
                        </template>
                        <template v-for="drink in exampleDrinks">
                            <div class="row" v-if="drink.count>0">
                                <div class="col-6 ms-2 mb-3">{{ drink.name+ " x "+drink.count}}</div>
                                <div class="col-5 text-end">{{ drink.price }}đ</div>
                            </div>
                        </template>
                    </p>
                    <p>Thuế</p>
                    <p  class="row d-flex">
                        <div class="col-6">Tổng</div>
                        <div id="total" class="col-6 text-end">0</div>
                    </p>
                    <div class="d-flex justify-content-end w-100">
                        <button @click="calTotal()" type="button" class="btn btn-success w-100">Thanh toán </button>
                    </div>
            </div>
        </div>
   
    </div>
    `
}