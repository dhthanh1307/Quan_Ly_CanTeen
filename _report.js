export default{
    inject:['DoanhThu'],
    data(){
        return {
            date:'',
            option:'date',
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
            if(this.date=='') 
                alert('Vui lòng chọn ngày cần thống kê');
            else
                await this.$emit('thongKe', this.date, this.option);
           // this.tinh();
        },
        tinh(){
            var  result =0;

            for(let i=0;i<this.DoanhThu.length;i++)
            result+=parseInt(this.DoanhThu[i].TongThanhTien);
             $('#tongtien').html(`Tổng tiền: ` +result.toString()+` vnđ`);
        }
    },
    watch: {
        DoanhThu: function (newDoanhThu, oldDoanhThu) {
            this.tinh();
        },
    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold user-select-none">Báo cáo doanh thu</span>
        </nav>
        <div class="row d-flex w-40 mb-5">
            <div class="card text-bg-success m-4 report-display">
                <div class="card-body overflow-auto ">
                <h1 id='tongtien'>Tổng tiền</h1>
                <table class="table">
                    <thead class="table-dark">
                        <th scope="col">Mã món ăn</th>
                        <th scope="col">Tên món ăn</th>
                        <th scope="col">Giá bán</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thành Tiền</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in DoanhThu" :key="item.MaMonAn">
                            <td>{{ item.MaMonAn }}</td>
                            <td>{{ item.TenMonAn }}</td>
                            <td>{{ item.GiaBan}}</td>
                            <td>{{ item.SoLuongBan }}</td>
                            <td>{{ item.TongThanhTien }}</td>
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
                        <div  class="w-100" >
                            <input type="date" class="w-100" id="birthday" v-model="date" name="birthday">
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="report-options" @click="changeOption('date')" id="report-option-1" checked>
                            <label class="form-check-label" for="report-option-1">
                                Ngày
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="report-options"  @click="changeOption('month')" id="report-option-2">
                            <label class="form-check-label" for="report-option-2">
                                Tháng
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="report-options"  @click="changeOption('year')" id="report-option-3">
                            <label class="form-check-label" for="report-option-3">
                                Năm
                            </label>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" @click="TongTien" class="btn btn-success">&larr; Thống kê</button>
                    </div>
                </div>
            </div>
        </div>
   
    </div>`
}