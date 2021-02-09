
    
function fn(id){

    $.ajax({
    
        type:'GET',
        url:'https://www.tianqiapi.com/api',
        data:'https://tianqiapi.com/api?version=v1&appid=76469867&appsecret=RTeLD5bY&city='+id,
        dataType:'JSON',
        error:function(){
            alert('发生错误');
        },
        success:function(res){
            $('#box').append('<br>');
            $('#box').append('<li>Date: ' + res.update_time + ' ' + res.data[0].week + '</li>');
            $('#box').append('<li>City: ' + res.city + '</li>');
            $('#box').append('<li>Weather: ' + res.data[0].wea + '</li>');
            $('#box').append('<li>Tips: ' + res.data[0].air_tips + '</li>');
            
            //遍历数组
            for (var i = 0; i < res.data.length; i++) {
                $('#hours').append('<li>' + ' 时间: ' + res.data[i].day + ' 天气: ' + res.data[i].wea +' </li >');
            }
            $('#hours').append('<br>');
            var myChart = echarts.init(document.getElementById('weather'));
    
            var option = {
                title: {
                    text: '未来一周的气温',
                },
                tooltip: {},
                legend: {
                    data:['最高温度','最低温度']
                },
                xAxis: {
                    data: [res.data[0].day, res.data[1].day, res.data[2].day, res.data[3].day, res.data[4].day, res.data[5].day, res.data[6].day]
                },
                yAxis: {},
                //由于返回值带符号，使用parseInt截取数字部分
                series: [{
                    name: '最高温度',
                    type: 'line',
                    data: [parseInt(res.data[0].tem1), parseInt(res.data[1].tem1), parseInt(res.data[2].tem1), parseInt(res.data[3].tem1), parseInt(res.data[4].tem1), parseInt(res.data[5].tem1), parseInt(res.data[6].tem1)]   
                },{
                    name: '最低温度',
                    type: 'line',
                    data: [parseInt(res.data[0].tem2), parseInt(res.data[1].tem), parseInt(res.data[2].tem2), parseInt(res.data[3].tem2), parseInt(res.data[4].tem2), parseInt(res.data[5].tem2), parseInt(res.data[6].tem)]
                }]
            };
    
            myChart.setOption(option);
        },
        
    })
}

$('#btn').click(function(){
    
    var va = $('#city').val();
    fn(va);
    
});