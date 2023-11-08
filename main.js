import vctrangchu from './trang_chu.js' 
export default{
    data(){
        return{
            componentName:'vctrangchu',
        }

    },
    components:{
        vctrangchu,
    },
    template:  `
    <div class="trang_chu">
    
      <div class="frame">
        <div class="frame1">
          <div class="page_heading">
            <div class="quan_ly_can_tin_txt">Quản lý căn tin</div>
            <div class="divider"></div>
          </div>
          
          <div class="header">
            <div class="hcmuss_cafeteria">HCMUS’s Cafeteria</div>
            <div class="btn_menu" id="btnMenu">
              <div class="menu_txt">Menu</div>
            </div>
            <div class="btn_bao_cao" id="btnBaoCao">
                <div class="bao_cao_txt">Báo cáo</div>
            </div>
            <div class="btn_kho_hang" id="btnKhoHang">
              <div class="kho_hang_txt">Kho hàng</div>
            </div>
            <div class="btn_ban_hang" id="btnBanHang">
              <div class="ban_hang_txt">Bán hàng</div>
            </div>
          </div>
        </div>

        <div >
            <component :is="componentName"/>
        </div>
      </div>

      <div class="footer">
        <div class="date" id = "txtDate">August 21, 2023</div>
      </div>
    </div>`
}