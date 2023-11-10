import { computed } from 'vue'
import vcnav from './_nav.js'
import vccontent from './_content.js'
import vcfooter from './_footer.js'
import vcreport from './_report.js'
import vcmenu from './_menu.js'
import vcimport from './_import.js'
export default {
    data() {
        return {  
            comName: 'vccontent'
        }
    },
    components: {
        vcnav, vccontent, vcfooter, vcreport, vcmenu, vcimport
    },
    provide() {
        return {
            
        }
    },
    methods: {
        changePage(page) {
            this.comName = page;
        }
    },
    beforeMount(){
     
    },
    template:
        `<div class="container">

            <div class="row">
                <vcnav @change-page="changePage"/>
            </div>
            <div class="row w-100">                             
                <component @change-page="changePage" :is="comName"/>                                   
            </div>
            <div class="row">
                <vcfooter/>
            </div>
        </div>`
};