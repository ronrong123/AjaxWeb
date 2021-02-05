$(document).ready(function () {
    // ajax 호출
    $.ajax({
        url: '../data/MOCK_DATA.json', //호출할 페이지
        dataType: 'json',
        success: showContent, // 정상적으로 실행되었을때 실행될 함수
        error: function (result) {
            console.log('에러: ' + result.statusText);
        } // 정상적으로 실행되지않을때 실행될 함수
    });
    //버튼이벤트
    $('#btn').click(addRow);
    //찾기이벤트
    $('#findBtn').on('click', findRow);
});
function findRow() {
    let findId = $('#find_id').val();
    let findRow = $('#' + findId + '').css('background', 'gray');
    //신규 row 생성
    findRow.after(makeNewTr());
    //after: 뒤에 추가,  before: 앞에추가
}
function makeNewTr() {

    let inputs = $('.input_val');
    let tr = $('<tr />');
    $(tr).hover(function () { $(this).css('background', '#ffcc00') }, function () { $(this).css('background', 'none') })
    //첫번째function()은 mouseover 두번째function()은 mouseout기능

    $(tr).click(trToInputFunc);
    for (let i = 0; i < inputs.length; i++) {
        let td = $('<td />').html(inputs[i].value);
        tr.append(td);
    }
    let td = $('<td />');
    let button = $('<button />').html('삭제');
    td.append(button);
    tr.append(td);
    $(button).click(function () {
        $(this).parent().parent().remove();
    })
    return tr;
}
function addRow() {
    $('#tbl').append(makeNewTr);

}
function btnFunc() {
    console.log($(this));
    let id = $('#id').val();
    let fName = $('#first_name').val();
    let lName = $('#last_name').val();
    let email = $('#email').val();
    let tr = $('<tr />');
    let tdId = $('<td />').html(id);
    let tdFirst = $('<td />').html(fName);
    let tdLast = $('<td />').html(lName);
    let tdemail = $('<td />').html(email);
    $('#tbl').append($(tr).append(tdId, tdFirst, tdLast, tdemail));
}
function showContent(result) {
    let headers = ['id', 'first_name', 'last_name', 'email'];
    console.log(result);
    let data = result;
    let table = $('<table id="tbl"/>').attr('border', '1');
    let title = $('<tr />');
    $(data).not('ip_address');
    for (field of headers) {
        let th = $('<th />').html(field);
        title.append(th);
    }
    let th = $('<th />').html('설정');
    title.append(th);
    table.append(title);
    $.each(data, function (idx, obj) { //반복문 $(data).each(function{})으로 적어도 가능 idx:순서, obj: index의 오브젝트 값들
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id', obj.id);
            for (field of headers) {
                let td = $('<td />');
                td.html(obj[field]);
                tr.append(td);
            }
            let td = $('<td />');
            let button = $('<button />').html('삭제');
            td.append(button);
            tr.append(td);
            $(button).click(function () {
                $(this).parent().parent().remove();
            })
            table.append(tr);
            
            $(tr).on({
                'click': trToInputFunc,
                'mouseover': function () { $(this).css('background', '#ffcc00')},
                'mouseout': function () {$(this).css('background', '')}
            })
            $(tr).click(trToInputFunc);
        }
    }
    )
    $('#show').append(table);
}
function trToInputFunc() {
    console.log($(this).children().eq(0).html());
    $('#id').val($(this).children().eq(0).html());
    $('#first_name').val($(this).children().eq(1).html());
    $('#last_name').val($(this).children().eq(2).html());
    $('#email').val($(this).children().eq(3).html());
}