export default{
    inject:['DoanhThu','NhapHang'],
    data(){
        return {
            date:'',
            option:'date',
            display:'',
        }
    },
    beforeMount(){
      //  TongTien();
    },
    methods:{
        changeOption(type){
            this.option=type;
        },
        async TongTien(){
            this.display='thongke'
            if(this.date=='') 
                alert('Vui lòng chọn ngày cần thống kê');
            else
                await this.$emit('thongKe', this.date, this.option);
           // this.tinh();
        },
        async KhoHang(){
            this.display='nhaphang'
            if(this.date=='') 
                alert('Vui lòng chọn ngày cần thống kê');
            else
                await this.$emit('nhaphang', this.date, this.option);
           // this.tinh();
        },
        tinh(){
            var  result =0;

            for(let i=0;i<this.DoanhThu.length;i++)
            result+=parseInt(this.DoanhThu[i].TongThanhTien);
             $('#tongtien').html(`Tổng tiền: ` +result.toString()+` vnđ`);
        },
        tinhNhapHang(){
            var  result =0;

            for(let i=0;i<this.NhapHang.length;i++)
            result+=parseInt(this.NhapHang[i].ThanhTien);
             $('#tongnhap').html(`Tiền nhập hàng: ` +result.toString()+` vnđ`);
        },
    },
    watch: {
        DoanhThu: function (newDoanhThu, oldDoanhThu) {
            this.tinh();
        },
        NhapHang: function (newNhapHang, oldNhapHang) {
            this.tinhNhapHang();
        },
    },
    template:
    `<div class="container w-100">
    <nav class="navbar w-100">
      <span class="navbar-brand fs-1 fw-bold user-select-none">Thống kê</span>
    </nav>
    <div class="row d-flex w-40 mb-5">
      <div class="card text-bg-success m-4 report-display">
        <div class="card-body overflow-auto " v-if="display=='thongke'">
          <h1 id='tongtien'>Tổng tiền</h1>
          <table class="table">
            <thead class="table-dark">
              <th scope="col">Mã món ăn</th>
              <th scope="col">Tên món ăn</th>
              <th scope="col">Giá bán gốc</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thành Tiền</th>
            </thead>
            <tbody>
              <tr v-for="item in DoanhThu" :key="item.MaMonAn">
                <td>{{ item.MaMonAn }}</td>
                <td>{{ item.TenMonAn }}</td>
                <td>{{ item.GiaBan }}</td>
                <td>{{ item.SoLuongBan }}</td>
                <td>{{ item.TongThanhTien }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
  
        <div class="card-body overflow-auto " v-if="display=='nhaphang'">
          <h1 id='tongnhap'>Tiền nhập hàng</h1>
          <table class="table">
            <thead class="table-dark">
              <th scope="col">Mã thực phẩm</th>
              <th scope="col">Tên thực phẩm</th>
              <th scope="col">Giá nhập</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thành Tiền</th>
            </thead>
            <tbody>
              <tr v-for="item in NhapHang" :key="item.MaMonAn">
                <td>{{ item.MaThucPham }}</td>
                <td>{{ item.TenThucPham }}</td>
                <td>{{ item.GiaNhap }}</td>
                <td>{{ item.SoLuong }} {{item.DonViTinh}}</td>
                <td>{{ item.ThanhTien }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card text-bg-light m-4 report-option">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-center">
            <span class="fs-5 fw-bold user-select-none">Doanh thu chi tiết</span>
          </div>
          <div class="row d-flex justify-content-between">
            <div class="w-100">
              <input type="date" class="w-100" id="birthday" v-model="date" name="birthday">
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="report-options" @click="changeOption('date')"
                id="report-option-1" checked>
              <label class="form-check-label" for="report-option-1">
                Ngày
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="report-options" @click="changeOption('month')"
                id="report-option-2">
              <label class="form-check-label" for="report-option-2">
                Tháng
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="report-options" @click="changeOption('year')"
                id="report-option-3">
              <label class="form-check-label" for="report-option-3">
                Năm
              </label>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" @click="TongTien" class="btn btn-success">Doanh thu</button>
            <button type="button" @click="KhoHang" class="btn btn-success">Kho hàng</button>
          </div>
        </div>
      </div>
    </div>
  
  </div>`
}