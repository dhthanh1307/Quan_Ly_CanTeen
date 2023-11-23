//NOTES: 
//thêm cột số lượng trong món ăn
//mã bán hàng tự động tăng
class DisplayMonAn {
    constructor(MonAn) {
        this.MaMonAn = MonAn.MaMonAn;
        this.TenMonAn = MonAn.TenMonAn;
        this.GiaBan = MonAn.GiaBan;
        this.HanSuDung = MonAn.HanSuDung;
        this.SoLuong=MonAn.SoLuong;
    }
};

async function fetchGet(url) {
    const response = await fetch(url, {
        cache: "no-store",
        method: 'GET',
    });
    if (response.status >= 200 && response.status < 300) {
        const json = await response.json();
        return json;
    } else {
        if (response.status === 500) {
            window.location = '/';
        }
    }
}

async function fetchPost(url, obj) {
    const response = await fetch(url, {
        cache: "no-store",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    if (response.status >= 200 && response.status < 300) {
        const text = await response.text();
        return text;
    } else {
        // if (response.status === 500) {
        //     window.location = '/';
        // }
    }
}

async function fetchGetAllMonAn() {
    const url = "http://localhost:3000/getAllMonAn";
    const json = await fetchGet(url);
    //console.log(json);
    //const jsonArray = json.data ?? [];
    return {
        displayArray: json.map((MonAn) => {
            return MonAn;
        })
    };
}

async function fetchUpdateMonAn(ID, Name, Price) {
    const url = `http://localhost:3000/updateMonAn`;
    const json = await fetchPost(url, { MaMonAn: ID, TenMonAn: Name, GiaBan: Price });
    return json;
}



import { computed } from 'vue'
import vcnav from './_nav.js'
import vccontent from './_content.js'
import vcfooter from './_footer.js'
import vcreport from './_report.js'
import vcmenu from './_menu.js'
import vcimport from './_import.js'
import vcsell from './_sell.js'
export default {
    data() {
        return {
            comName: 'vccontent',
            loading: false,
            ListMonAn: []
        }
    },
    components: {
        vcnav, vccontent, vcfooter, vcreport, vcmenu, vcimport, vcsell
    },
    provide() {
        return {
            ListMonAn: computed(() => this.ListMonAn)
        }
    },
    methods: {
        changePage(page) {
            this.comName = page;
            if (this.comName == 'vcsell') {
                this.loading = true;
                try {
                    this.reloadMonAn();
                }
                catch (error) {
                    console.log(error);
                }   
            }
        },
        async reloadMonAn() {
            const res = await fetchGetAllMonAn();
            this.ListMonAn = res.displayArray;
            this.loading = false;
            //console.log(this.ListMonAn);

        },
        async changeToMenu() {
            this.comName = 'vcmenu';
            this.loading = true;
            try {
                this.reloadMonAn();
            }
            catch (error) {
                console.log(error);
            }
        },
        async thanhtoan(result,ListEdit){
            const url = `http://localhost:3000/insertHoaDon`;
            const json = await fetchPost(url, {PhuongThuc:`online`,SoTien:result,ListEdit:ListEdit});
            return json;
        },
        async updateItem(ID, Name, Price) {
            try {
                const res = await fetchUpdateMonAn(ID, Name, Price);
                this.reloadMonAn();
            } catch (error) {
                console.log(error);
            }
        }
    },
    beforeMount() {

    },
    template:
        `<div class="container">

            <div class="row mt-4">
                <vcnav @change-page="changePage" @change-menu="changeToMenu"/>
            </div>


            <div class="row w-100" style="height:500px" v-if="comName=='vccontent'">
                <div id="carouselExample" class="carousel slide h-100" >
                    <div class="carousel-inner h-100">
                        <div class="carousel-item active">
                            <img src="../images/image1.jpg" class="d-block " alt="..." style="object-fit: contain;">
                        </div>
                        <div class="carousel-item">
                            <img src="../images/image2.jpg" class="d-block w-100 h-100" alt="..." style="object-fit: contain;">
                        </div>
                        <div class="carousel-item">
                            <img src="../images/image3.jpg" class="d-block w-100 h-100" alt="..." style="object-fit: contain;">
                        </div>
                        <div class="carousel-item">
                            <img src="../images/image4.png" class="d-block w-100 h-100" alt="..." style="object-fit: contain;">
                        </div>
                    </div>
                   

                  
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            
            <div class="bg-success w-100 row "  style="height:250px"  v-if="comName=='vccontent'">
                <h1 class="text-white mt-5 ms-3">Giới thiệu</h1>
                <p class="text-white mb-5  ms-3  text-wrap me-3 w-75" >Chào mừng bạn đến với trang web quản lý canteen của chúng tôi! Đây là nơi bạn có thể dễ dàng đặt hàng, theo dõi đơn hàng và trải nghiệm dịch vụ tuyệt vời của chúng tôi.
                Trang web quản lý canteen của chúng tôi là một nền tảng trực tuyến tiện lợi, dễ sử dụng, giúp cải thiện và tối ưu hóa quy trình quản lý căng tin. Hãy khám phá và tận hưởng những món ăn ngon miệng mà chúng tôi phục vụ. Rất vui được phục vụ bạn!</p>

            </div>
            <div v-if="comName=='vccontent'" class="row d-flex w-100"
                 style=" background-attachment: fixed;background-image: url('../images/background.jpg');height:500px;background-size:cover">
                <div class="text-white text-center  col-12" style="font-family:'Newsreader', serif; font-size:30px;height:40px;margin-top:100px">Chào mừng các bạn đến với</div>
                <div class="text-white text-center " style="font-family:'Newsreader', serif;font-size:100px;margin-bottom:200px">Website quản lý canteen</div>
            </div>
            
            <div class="row w-100">                             
                <component v-if="!loading" @change-page="changePage" @update-item="updateItem" @thanh-toan="thanhtoan" :is="comName"/>                                   
            </div>

            <div class="row">
                <vcfooter/>
            </div>
        </div>`
};

