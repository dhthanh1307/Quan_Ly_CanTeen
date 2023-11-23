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

class DisplayThucPham {
    constructor(ThucPham) {
        this.MaThucPham = ThucPham.MaThucPham;
        this.TenThucPham = ThucPham.TenThucPham;
        this.DonViTinh = ThucPham.DonViTinh;
        this.SoLuongTrongKho = ThucPham.SoLuongTrongKho;
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
        if (response.status === 500) {
            window.location = '/';
        }
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

async function fetchLogin(username, password, isAdmin) {
    const url = `http://localhost:3000/login`;
    const json = await fetchPost(url, { username: username, password: password, isAdmin: isAdmin });
    return json;
}

async function fetchUpdateMonAn(ID, Name, Price) {
    const url = `http://localhost:3000/updateMonAn`;
    const json = await fetchPost(url, { MaMonAn: ID, TenMonAn: Name, GiaBan: Price });
    return json;
}




async function fetchGetAllThucPham() {
    const url = "http://localhost:3000/getAllThucPham";
    const json = await fetchGet(url);
    //console.log(json);
    //const jsonArray = json.data ?? [];
    return {
        displayArrayThucPham: json.map((ThucPham) => {
            return ThucPham;
        })
    };
}

async function fetchInsertThucPham(MaThucPham, SoLuongNhap, NgayNhap, GiaNhap) {
    const url = `http://localhost:3000/insertThucPham`;
    const json = await fetchPost(url, { MaThucPham: MaThucPham, SoLuongNhap: SoLuongNhap, NgayNhap: NgayNhap, GiaNhap:GiaNhap });
    return json;
}

async function fetchRemoveThucPham(MaThucPham, SoLuong) {
    const url = `http://localhost:3000/removeThucPham`;
    const json = await fetchPost(url, { MaThucPham: MaThucPham, SoLuong: SoLuong });
    return json;
}


import { computed } from 'vue'
import vclogin from './_login.js'
import vcnav from './_nav.js'
import vccontent from './_content.js'
import vcinfo from './_info.js'
import vcfooter from './_footer.js'
import vcreport from './_report.js'
import vcmenu from './_menu.js'
import vcimport from './_import.js'
import vcsell from './_sell.js'
export default {
    data() {
        return {

            login: false,
            isAdmin: false,

            comName: 'vccontent',
            loading: false,
            ListMonAn: [],
            ListThucPham: []
        }
    },
    components: {
        vclogin, vcnav, vccontent, vcinfo, vcfooter, vcreport, vcmenu, vcimport, vcsell,
    },
    provide() {
        return {
            ListMonAn: computed(() => this.ListMonAn),
            ListThucPham: computed(() => this.ListThucPham)
        }
    },
    methods: {
        async doLogin(username, password, isAdmin) {
            const res = await fetchLogin(username, password, isAdmin);
            if (res == 'true') {
                this.login = true;
                this.isAdmin = isAdmin;
            }
            else {
                this.showToast();
            }
        },
        showToast() {
            var toastEl = document.getElementById('liveToast');
            var toast = new bootstrap.Toast(toastEl);
            toast.show();
        },
        currentDate() {
            const current = new Date();
            const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
            return date;
        },
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
        },
        async reloadThucPham() {
            const res = await fetchGetAllThucPham();
            this.ListThucPham = res.displayArrayThucPham;
            this.loading = false;
            //console.log(this.ListThucPham);
        },
        async changeToImport() {
            this.comName = 'vcimport';
            this.loading = true;
            try {
                this.reloadThucPham();
            }
            catch (error) {
                console.log(error);
            }
        },
        async insertThucPham(MaThucPham, SoLuongNhap, GiaNhap) {
            try {
                let NgayNhap = this.currentDate();
                const res = await fetchInsertThucPham(MaThucPham, SoLuongNhap, NgayNhap, GiaNhap);
                this.reloadThucPham();
            } catch (error) {
                console.log(error);
            }
        },
        async removeThucPham(MaThucPham, SoLuong) {
            try {
                const res = await fetchRemoveThucPham(MaThucPham, SoLuong);
                this.reloadThucPham();
            } catch (error) {
                console.log(error);
            }
        }
    },
    beforeMount() {

    },
    template:
        `<div class="container" v-if="login">

            <div class="row mt-4">
                <vcnav @change-page="changePage" @change-menu="changeToMenu" @change-import="changeToImport"/>
            </div>

            <vcinfo v-if="comName=='vccontent'"/>
            
            <div class="row w-100">                             

                <component v-if="!loading" @change-page="changePage" @thanh-toan="thanhtoan"
                 @change-menu="changeToMenu" @change-import="changeToImport" @update-item="updateItem" @insert-thuc-pham="insertThucPham" @remove-thuc-pham="removeThucPham" :is="comName"/>
                <component v-else :is="comName"/>                                   
            
            </div>

            <div class="row">
                <vcfooter/>
            </div>
        </div>
        <vclogin @login="doLogin" v-if="!login"/>
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">Lỗi</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Tài khoản hoặc mật khẩu không đúng!
                </div>
            </div>
        </div>
        `
};

