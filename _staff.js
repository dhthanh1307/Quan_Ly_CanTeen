export default{
    inject:['NhanSu','LamViec'],
    data(){
        return {
            selectedId:null,
            uname:'',
            name:'',
            pw1:'',
            pw2:'',
            create:1,
            admin:false,
        }
    },
    methods:{
        chooseItem(s){
            this.selectedId=s.Username;
        },
        removeStaff(){
            if(this.selectedId!=null){
                for(let i=0;this.NhanSu.length;i++)
                    if(this.selectedId==this.NhanSu[i].Username)
                      this.$emit('removeStaff',this.NhanSu[i].Username);
            }else{
                alert('Error! Please select staff');
            }
            
        },
        insertStaff(){
            if(this.uname==''||this.pw1==''||this.pw2=='')
                alert('Vui lòng nhập đầy đủ thông tin!');
            else{
                if(this.pw1!=this.pw2)
                    alert('Mật khẩu nhập lại chưa chính xác!');
                else{
                    var ktra=true;
                    for(let i=0;i<this.NhanSu.length;i++)
                        if(this.NhanSu[i].Username == this.uname)
                            ktra=false;
                    const isadmin=this.admin.toString();
                    if(ktra)
                        this.$emit('insertStaff',this.uname,this.pw1,isadmin,this.name);
                    else alert('Username đã tồn tại. Vui lòng nhập lại!');
                }
            }
        },
        createStaff(){
            this.create=this.create*-1;
        }
    },
    template:
    `
    <div class="container w-100 ">
        <nav class="navbar  w-100 ">
                <span class="navbar-brand fs-1 fw-bold user-select-none">Nhân sự</span>
        </nav>
        <div class="row d-flex flex-row col-12 ms-4 justify-content-center">
            <div class="d-flex flex-column col-8 align-content-center" >
                <div class="card text-bg-success m-4 menu-display" style="height:500px">
                    <div class="card-body d-flex flex-row flex-wrap overflow-hidden overflow-y-auto gap-2 ms-2" >
                        <template v-for="(s,i) in this.NhanSu">
            

                            <div class="card" style="width: 15rem;" :id="s.Username" @click="chooseItem(s)"
                                    :class="{ 'chosen-item': selectedId === s.Username }" >
                                <img src="./images/avt.png" class="card-img-top" alt="..." >
                                <div class="card-body">
                                    <div class="d-flex flex-column text-center">                         
                                        <span class="fs-6 fw-bold user-select-none">{{ s.Username }}</span>
                                        <span class="fs-6 fw-bold user-select-none">{{ s.Password }}</span>
                                    </div>
                                </div>
                            </div>                            
                        </template>
                    </div>
                </div>
                <div class="row d-flex pb-5">
                <div class="text-center col-4">
                    <button type="button"  @click="removeStaff" class="btn btn-success ">Xóa tài khoản</button>
                </div>
                <div class="text-center ms-3 col-3">
                    <button type="button"  @click="createStaff" class="btn btn-success ">Tạo tài khoản</button>
                </div>
                <div class="text-center  ms-3 col-3" >
                    <button type="button" class="btn btn-success " @click="$emit('thongkegiolam')">Thống kê giờ làm</button>
                </div>
                </div>
            </div>

            <div class="card text-bg-light m-4 menu-detail" v-if="this.create==-1" style="height:600px">
                <h5 class="pt-5">Tên tài khoản</h5>
                <input id="uname" v-model="uname" type="text" class="form-control" placeholder="Nhập tài khoản" aria-label="Username" aria-describedby="addon-wrapping">
                <h5 class="pt-2">Họ tên</h5>
                <input id="name" v-model="name" type="text" class="form-control" placeholder="Nhập tài khoản" aria-label="Name" aria-describedby="addon-wrapping">
                <h5 class="pt-2">Mật khẩu</h5>
                <input id="pw1" type="text" v-model="pw1" class="form-control" placeholder="Nhập mật khẩu" aria-label="Username" aria-describedby="addon-wrapping">
                <h5 class="pt-2">Nhập lại mật khẩu</h5>
                <input id="pw2" type="text" v-model="pw2" class="form-control" placeholder="Nhập lại mật khẩu" aria-label="Username" aria-describedby="addon-wrapping">
                <div class="d-flex pt-4">
                    <input class="form-check-input" v-model="admin" type="checkbox">
                        <label class="form-check-label">
                            Admin
                        </label>
                </div>
                <div class="text-center" style="padding-top:140px">
                    <button type="button" class="btn btn-success w-100" @click="insertStaff">Tạo tài khoản</button>
                </div>
               
            </div>


        </div>
        <div class="row d-flex w-100"
            style=" background-attachment: fixed;background-image: url('../images/staff.png');height:500px;background-size:cover">
            <div class="text-white text-center " style="font-family:'Newsreader', serif;font-size:100px;margin-top:150px">Quản lí nhân sự</div>

        </div>
        <div class="p-5" v-if="LamViec.length>0" style="font-family:'Newsreader', serif">
        <h1>Thống kê số giờ làm việc của nhân viên</h1>
            <table class="table">
                <thead>
                    <th scope="col-2">STT</th>
                    <th scope="col-4">User name</th>
                    <th scope="col-4">Họ tên</th>
                    <th scope="col-2">Tổng số giờ làm việc</th>
                    <th scope="col-2">Tháng</th>
                    <th scope="col-2">Năm</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in LamViec" :key="item.Name">
                        <td>{{ index }}</td>
                        <td>{{ item.Name }}</td>
                        <td>{{ item.Username}}</td>
                        <td>{{ item.SoGioLam }}</td>
                        <td>{{ item.Thang }}</td>
                        <td>{{ item.Nam }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
}