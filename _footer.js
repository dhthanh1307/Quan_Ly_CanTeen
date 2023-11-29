export default{
    data(){
        return {
            currentDate: new Date().toLocaleDateString()
        }
    },
    template:
    `
    <nav class="navbar bg-body-tertiary  ">
        <span class="navbar-brand text-end  w-100 fw-bold" >{{ currentDate }}</span>
    </nav>
    `
}