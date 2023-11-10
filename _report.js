export default{
    data(){
        return {

        }
    },
    template:
    `<div class="container w-100">
        <nav class="navbar w-100">
            <span class="navbar-brand fs-1 fw-bold" >Báo cáo doanh thu</span>
        </nav>
        <div class="row d-flex w-40 mb-5">
            <div class="card text-bg-success m-4 report-display">
                <div class="card-body ">
                    
                </div>
            </div>
            <div class="card text-bg-light m-4 report-option">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-center">
                        <span class="fs-5 fw-bold">Doanh thu chi tiết</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="report-options" id="report-option-1" checked>
                            <label class="form-check-label" for="report-option-1">
                                Ngày
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="report-options" id="report-option-2">
                            <label class="form-check-label" for="report-option-2">
                                Tháng
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="report-options" id="report-option-3">
                            <label class="form-check-label" for="report-option-3">
                                Năm
                            </label>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-success">&larr; Thống kê</button>
                    </div>
                </div>
            </div>
        </div>
   
    </div>`
}