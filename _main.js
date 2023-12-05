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
        const json = await response.json();
        console.log(json);
        return json;
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

async function fetchSearchThucPham(Keyword) {
    const url = `http://localhost:3000/searchThucPham`;
    const json = await fetchPost(url, { Keyword: Keyword });
    return {
        displayArrayThucPham: json.map((ThucPham) => {
            return ThucPham;
        })
    };
}

async function fetchSetPortion(id, currentDate, portion) {
    const url = `http://localhost:3000/setPortion`;
    const json = await fetchPost(url, { id: id, currentDate: currentDate, portion: portion });
    return json;
}

async function fetchCheckPortionSet(id, currentDate) {
    const url = `http://localhost:3000/checkPortionSet`;
    const json = await fetchPost(url, { id: id, currentDate: currentDate });
    return json;
}

async function fetchCreateKhachHang(SoDienThoai) {
    const url = `http://localhost:3000/createKhachHang`;
    const json = await fetchPost(url, { SoDienThoai: SoDienThoai });
    return json;
}

async function fetchGetKhachHang(SoDienThoai) {
    const url = `http://localhost:3000/getKhachHang`;
    const json = await fetchPost(url, { SoDienThoai: SoDienThoai });
    return json;
}

async function fetchUpdateKhachHang(SoDienThoai, TichLuy, GiamGia, ThanhToan) {
    const url = `http://localhost:3000/updateKhachHang`;
    const json = await fetchPost(url, { SoDienThoai: SoDienThoai, TichLuy: TichLuy, GiamGia: GiamGia, ThanhToan: ThanhToan });
    return json;
}

import { computed  ,watch,} from 'vue'
import vclogin from './_login.js'
import vcnav from './_nav.js'
import vccontent from './_content.js'
import vcinfo from './_info.js'
import vcfooter from './_footer.js'
import vcreport from './_report.js'
import vcmenu from './_menu.js'
import vcimport from './_import.js'
import vcsell from './_sell.js'
import vcstaff from './_staff.js'
import vcserving from './_serving.js'


export default {
    data() {
        return {

            login: false,
            Username:'',
            isAdmin: false,
            timelogin:null,

            comName: 'vccontent',
            loading: false,
            ListMonAn: [],
            ListThucPham: [],
            DoanhThu:[],
            NhanSu:[],
            ChiTieu:[],
            isPortionSet: false,
            LamViec:[],
            SoDienThoai: null,
            TichLuy: 0,
            GiamGia: 0,
            isValidKhachHang: false
        }
    },
    components: {
        vclogin, vcnav, vccontent, vcinfo, vcfooter, vcreport, vcmenu, vcimport, vcsell, vcstaff, vcserving
    },
    provide() {
        return {
            ListMonAn: computed(() => this.ListMonAn),
            ListThucPham: computed(() => this.ListThucPham),
            DoanhThu: computed(()=> this.DoanhThu),
            NhanSu: computed(()=> this.NhanSu),
            LamViec: computed(()=> this.LamViec),
            isPortionSet: computed(() => this.isPortionSet),
            SoDienThoai: computed(() => this.SoDienThoai),
            TichLuy: computed(() => this.TichLuy),
            GiamGia: computed(() => this.GiamGia)
        }
    },
    methods: {
        async doLogin(username, password, isAdmin) {
            const res = await fetchLogin(username, password, isAdmin);
            if (res.result) {
                this.login = true;
                this.isAdmin = isAdmin;
                this.Username=username;
                this.timelogin=new Date();
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
        async thanhtoan(result,ListEdit,SoDienThoai,TichLuy,GiamGia){
            const url = `http://localhost:3000/insertHoaDon`;
            const json = await fetchPost(url, {PhuongThuc:`online`,SoTien:result,ListEdit:ListEdit});
            if(json.ktra===false){
                alert('Số lượng sản phẩm trong kho không đủ');
            }
            else{
                alert('Thanh toán thành công');
            }
            if (this.SoDienThoai != null) {
                await fetchUpdateKhachHang(SoDienThoai, TichLuy, GiamGia, result);
            }
            return json;
        },
        async thongke(date,option){
            try {
                const url = `http://localhost:3000/thongke`;
                const json = await fetchPost(url, { Date: date, Type: option });
                this.DoanhThu = json;
                console.log(this.DoanhThu);
            } catch (error) {
                console.error('Error during thongke API call:', error);
            }
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
        async loadStaff(){
            const url = `http://localhost:3000/nhansu`;
            const json = await fetchGet(url);
            this.NhanSu = json;
            this.loading = false;
        },
        async changeToStaff() {
            if (this.isAdmin) {
                this.comName = 'vcstaff';
                this.loading = true;
                try {
                    this.loadStaff();
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                alert("Không đủ quyền hạn!");
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
            }
            catch (error) {
                console.log(error);
            }
        },
        async searchThucPham(Keyword) {
            try {
                const res = await fetchSearchThucPham(Keyword);
                this.ListThucPham = res.displayArrayThucPham;
            }
            catch(e){
                console.log(e);
            }
        },
        async fetchRemoveStaff(username){
            const url = `http://localhost:3000/removeStaff`;
            const json = await fetchPost(url, {Username:username});
        },
        async removeStaff(username){
            try {
                await this.fetchRemoveStaff(username);
                await this.loadStaff();
            } catch (error) {
                console.log(error);
            }
        },
        async insertStaff(uname,pw,admin,name){
            try {
                const url=`http://localhost:3000/insertStaff`;
                const res = await fetchPost(url,{Username:uname,Password:pw,Admin:admin,Name:name});
                await this.loadStaff();
            } catch (error) {
                console.log(error);
            }
        },
        async changeToServing() {
            this.comName = 'vcserving';
            this.loading = true;
            try {
                this.reloadMonAn();
            }
            catch (error) {
                console.log(error);
            }
        },
        async setPortion(id, portion) {
            try {
                let currentDate = this.currentDate();
                const res = await fetchSetPortion(id, currentDate, portion);
                if (res) {
                    this.isPortionSet = true;
                }
                else {
                    alert("Nguyên liệu trong kho không đáp ứng được chỉ tiêu này!");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async checkPortionSet(id) {
            try {
                let currentDate = this.currentDate();
                const res = await fetchCheckPortionSet(id, currentDate);
                this.isPortionSet = res;
            } catch (error) {
                console.log(error);
            }
        },
        async resetPortionCheck() {
            this.isPortionSet = false;
        },
        async logOut(){
            if(this.isAdmin!=true){
                const giolam=(new Date() - this.timelogin) / (1000 * 60 * 60);            
                const url=`http://localhost:3000/insertGioLam`;
                const res = await fetchPost(url,{Username:this.Username,GioLam:giolam,Ngay:new Date()});
            }
          
            window.location.href='/';
        },
        async thongkegiolam(){
            const url=`http://localhost:3000/giolam`;
            const res = await fetchGet(url);
            this.LamViec=res;
        },
        async createKhachHang(SoDienThoai) {
            try {
                const res = await fetchCreateKhachHang(SoDienThoai);
                if (res == false) {
                    alert('Khách hàng đã tồn tại!');
                }
                else {
                    alert('Tạo mới thành công!');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getKhachHang(SoDienThoai) {
            try {
                const res = await fetchGetKhachHang(SoDienThoai);
                if (res != null) {
                    this.SoDienThoai = SoDienThoai;
                    this.TichLuy = res.TichLuy;
                    this.GiamGia = res.GiamGia;
                    this.isValidKhachHang = true;
                    //console.log(this.SoDienThoai + ", TichLuy: " + this.TichLuy + ", GiamGia: " + this.GiamGia);
                }
                else {
                    this.resetKhachHang();
                }
            } catch (error) {
                console.log(error);
            }
        },
        resetKhachHang() {
            this.SoDienThoai = null;
            this.TichLuy = 0;
            this.GiamGia = 0;
            this.isValidKhachHang = false;
            //console.log(this.SoDienThoai + ", TichLuy: " + this.TichLuy + ", GiamGia: " + this.GiamGia);
        }
    },
    async beforeMount() {

    },
    template:
        `<div class="container" v-if="login">

            <div class="row mt-4">
                <vcnav @change-page="changePage" @change-menu="changeToMenu" @change-import="changeToImport" 
                 @change-staff="changeToStaff" @change-serving="changeToServing"
                 @logOut="logOut" />
            </div>

            <vcinfo v-if="comName=='vccontent'"/>
            
            <div class="row w-100">                  
                <component v-if="!loading" @change-page="changePage" @thanh-toan="thanhtoan" @thongKe="thongke" 
                @removeStaff="removeStaff" @insert-staff="insertStaff" 
                @change-menu="changeToMenu" @change-import="changeToImport" 
                @update-item="updateItem" @insert-thuc-pham="insertThucPham" 
                @remove-thuc-pham="removeThucPham" @search-thuc-pham="searchThucPham" 
                @set-portion="setPortion" @check-portion-set="checkPortionSet"
                @get-khach-hang="getKhachHang" @reset-khach-hang="resetKhachHang"
                @thongkegiolam="thongkegiolam"
                @create-khach-hang="createKhachHang" @reset-portion-check="resetPortionCheck" :is="comName"/>
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

