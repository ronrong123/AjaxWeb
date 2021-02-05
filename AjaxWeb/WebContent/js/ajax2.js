$(function(){
    $.ajax({
        url: '../data/MOCK_DATA.json', //호출할 페이지
        dataType: 'json',
        success: showContent, // 정상적으로 실행되었을때 실행될 함수
        error: function (result) {
            console.log('에러: ' + result.statusText);
        } // 정상적으로 실행되지않을때 실행될 함수
    });
    //button 클립 이벤트.
    $('#btn').on('click', function(){
        $('input:checked').parent().parent().remove();
    })
    //all_check 클릭 이벤트. (라이브이벤트방식)
    $('body').on('click', '#all_check', function(){
        $('td>input').prop('checked', $('#all_check').is(':checked'))
        // if($('#all_check').is(':checked')){
        //     $('td > input').prop('checked', true);
        // }else{
        //     $('td > input').prop('checked', false);
        // }
    })  
})
function showContent(result) {
    let headers = ['chkbox', 'id', 'first_name', 'last_name', 'email'];
    console.log(result);
    let data = result;
    let table = $('<table id="tbl"/>').attr('border', '1');
    let title = $('<tr />');
    let allchkBox =$("input[type='checkbox']");
    $(data).not('ip_address');
    for (field of headers) {
        let th = $('<th />').html(field);
        if(field == 'chkbox'){
            let checkbox = $('<input />').attr('type', 'checkbox').attr('id', 'all_check');
            th = $('<th />').attr('align', 'center');
            th.append(checkbox);
            th.css({'width':'40px'});
        }else{
            th = $('<th />').html(field.replace('_', '').toUpperCase());
        }
        title.append(th);
    }  
    table.append(title);
    $.each(data, function (idx, obj) { //반복문 $(data).each(function{})으로 적어도 가능 idx:순서, obj: index의 오브젝트 값들
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id', obj.id);
            for (field of headers) {
                let td = $('<td />');
                if(field == 'chkbox'){
                    let checkbox = $('<input />').attr('type', 'checkbox');
                    td.attr('align', 'center');
                    td.append(checkbox);
                }else{
                    td.html(obj[field]);
                }
                tr.append(td);
            }
            table.append(tr);
            
        $(tr).on({
            'mouseover': function () { $(this).css('background', '#ffcc00')},
            'mouseout': function () {$(this).css('background', '')}
        })
        if($("input:checked").length == allchkBox.length){
            $('#all_check').prop(':checked', true);
        }
        console.log(allchkBox);
        } 
    }
    )
    $('#show').append(table);
}