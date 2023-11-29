export default{
    inject:['NhanSu'],
    data(){
        return {
            selectedId:null,
            name:'',
            pw1:'',
            pw2:'',
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
           
            if(this.name==''||this.pw1==''||this.pw2=='')
                alert('Vui lòng nhập đầy đủ thông tin!');
            else{
                if(this.pw1!=this.pw2)
                    alert('Mật khẩu nhập lại chưa chính xác!');
                else{
                    var ktra=true;
                    for(let i=0;i<this.NhanSu.length;i++)
                        if(this.NhanSu[i].Username == this.name)
                            ktra=false;
                    const isadmin=this.admin.toString();
                    if(ktra)
                        this.$emit('insertStaff',this.name,this.pw1,isadmin);
                    else alert('Username đã tồn tại. Vui lòng nhập lại!');
                }
            }
        },
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
                            <div :id="s.Username" @click="chooseItem(s)"
                            :class="{ 'chosen-item': selectedId === s.Username }" 
                            class="card text-bg-light menu-item d-flex flex-column justify-content-evenly text-center">
                                <span class="fs-6 fw-bold user-select-none">{{'Nhân viên '+(i+1)}}</span>
                                <span class="fs-6 fw-bold user-select-none">{{'Account: '+ s.Username }}</span>
                                <span class="fs-6 fw-bold user-select-none">{{'Password: '+ s.Password }}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="text-center">
                    <button type="button"  @click="removeStaff" class="btn btn-success ">Xóa tài khoản</button>
                </div>
            </div>

            <div class="card text-bg-light m-4 menu-detail" style="height:650px">
                <h5 class="pt-5">Tài khoản</h5>
                <input id="name" v-model="name" type="text" class="form-control" placeholder="Nhập tài khoản" aria-label="Username" aria-describedby="addon-wrapping">
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
                <div class="text-center" style="padding-top:280px">
                    <button type="button" class="btn btn-success w-100" @click="insertStaff">Tạo tài khoản</button>
                </div>
            </div>
        </div>
    </div>
    `
}