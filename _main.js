import { computed } from 'vue'
import vcnav from './_nav.js'
import vccontent from './_content.js'
import vcfooter from './_footer.js'
export default {
    data() {
        return {
       
            comName: 'vccontent',
        

        }
    },
    components: {
         vcnav,  vccontent, vcfooter
         
    },
    provide() {
        return {
            
        }
    },
    methods: {
       

    },
    beforeMount(){
     
    },
    template:
        `<div class="container">

            <div class="row">
                <vcnav/>
            </div>
            <div class="row w-100">                             
                <component :is="comName"/>                                   
            </div>
            <div class="row">
                <vcfooter/>
            </div>
        </div>`
};