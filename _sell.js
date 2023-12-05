export default {
    inject:['ListMonAn'],
    data() {
        return {
            selectedId: null,
        }
    },
    methods: {
        chooseItem(goods) {
            this.selectedId = goods.MaMonAn;
                goods.SoLuong = goods.SoLuong + 1;
            
        },
        removeItem(goods){
            this.selectedId = goods.MaMonAn;
            
                goods.SoLuong = goods.SoLuong - 1;
                if (goods.SoLuong < 0) {
                    goods.SoLuong = 0;
                }
            
        },
        calTotal() {
            
            let result = 0;
            for (let i = 0; i < this.ListMonAn.length; i++) {
                if (!isNaN(this.ListMonAn[i].SoLuong ) && !isNaN(this.ListMonAn[i].GiaBan)) {
                    result = result + this.ListMonAn[i].SoLuong * this.ListMonAn[i].GiaBan;
                }
                
            }
            this.$emit('thanhToan',result,this.ListMonAn);
            
            $("#total").html(result.toString() + "đ");
        }


    },
    template: `
    <div class="container w-100 ">
        <nav class="navbar  w-100 ">
                <span class="navbar-brand fs-1 fw-bold user-select-none">Bán hàng</span>
        </nav>
        <div class="row d-flex w-100 p-1">

            <div class="col-4"><img  src="./images/sell4.png" alt=""  width="430px"></div>
            <div class="col-4"><img  src="./images/sell5.png" alt=""  width="430px"></div>
            <div class="col-4"><img  src="./images/sell6.png" alt=""  width="430px"></div>
            <div class="col-12 text-center">
                <h1  style="font-family:'Newsreader', serif">Chúc quý khách ngon miệng</h1>
            </div>
            <div class="col-6"><img  src="./images/sell7.png" alt=""  width="645px"></div>
            <div class="col-6"><img  src="./images/sell8.png" alt="" width="645px" ></div>
        </div>
        
       
        <div class="row d-flex flex-row col-12 ms-4">
            <div class="d-flex flex-column col-8">
                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="food in ListMonAn">
                            <div v-if="food.MaMonAn[0] == 'C'" :id="food.MaMonAn" @click="chooseItem(food)" @contextmenu.prevent="removeItem(food)"
                             :class="{ 'chosen-item': selectedId === food.MaMonAn }" 
                            class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ food.TenMonAn }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ food.GiaBan }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="card text-bg-success m-4 menu-display">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2">
                        <template v-for="drink in ListMonAn">
                            <div v-if="drink.MaMonAn[0] != 'C'" :id="drink.MaMonAn" @click="chooseItem(drink)" @contextmenu.prevent="removeItem(drink)" 
                            :class="{ 'chosen-item': selectedId === drink.MaMonAn }" 
                            class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{ drink.TenMonAn }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{ drink.GiaBan }}đ</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="card text-bg-light m-4 menu-detail" style="height:650px">
                    <h1 class="fs-4 fw-bold mt-4 user-select-none">Hóa đơn</h1>
                    <p class="  overflow-hidden overflow-y-auto" id="pick" style="height:420px" >
                        <template v-for="drink in ListMonAn">
                            <div class="row" v-if="drink.MaMonAn[0] == 'C' && drink.SoLuong>0">
                                <div class="col-6 ms-2 mb-3">{{ drink.TenMonAn+ " x "+drink.SoLuong}}</div>
                                <div class="col-5 text-end">{{ drink.GiaBan }}đ</div>
                            </div>
                        </template>
                        <template v-for="drink in ListMonAn">
                            <div class="row" v-if="drink.MaMonAn[0] != 'C' &&  drink.SoLuong>0">
                                <div class="col-6 ms-2 mb-3">{{ drink.TenMonAn+ " x "+drink.SoLuong}}</div>
                                <div class="col-5 text-end">{{ drink.GiaBan }}đ</div>
                            </div>
                        </template>
                    </p>
                    <p>Thuế</p>
                    <p  class="row d-flex">
                        <div class="col-6">Tổng</div>
                        <div id="total" class="col-6 text-end">0</div>
                    </p>
                    <div class="d-flex justify-content-end w-100">
                        <button @click="calTotal()"  type="button" class="btn btn-success w-100">Thanh toán </button>
                    </div>
            </div>
            <div class="row text-center fw-bold"  style="font-family:'Newsreader', serif">
                <div class="col-4">
                    <img class="m-3" src="./images/sell1.png" alt="" width="370" height="395">
                    <h3>Chất lượng</h3>
                </div>
                <div class="col-4">
                    <img class="m-3" src="./images/sell2.png" alt="" width="370" height="395">
                    <h3>Sạch sẽ</h3>
                </div>

                <div class="col-4">
                    <img class="m-3" src="./images/sell3.png" alt="" width="370" height="395">
                    <h3>Giá tốt</h3>
                </div>

            </div>
        </div>
       
   
    </div>
    `
}