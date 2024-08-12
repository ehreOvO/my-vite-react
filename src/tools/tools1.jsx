function deal_timestamp_to_date(timestamp) {
    const date = new Date(parseInt(timestamp) * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    // console.log(formattedDate);
    // console.log(typeof(formattedDate));
    return formattedDate;
}


function deal_calculate_pr(actualDmg,actualWins,actualFrags) {

    const rDmg = actualDmg / expectedDmg
    const rWins = actualWins / expectedWins
    const rFrags = actualFrags / expectedFrags
     
    const nDmg = Math.max(0, (rDmg - 0.4) / (1 - 0.4))
    const nFrags = Math.max(0, (rFrags - 0.1) / (1 - 0.1))
    const nWins = Math.max(0, (rWins - 0.7) / (1 - 0.7))
 
    const PR = 700 * nDmg + 300 * nFrags + 150 * nWins
 
     return PR;
 }
function deal_pr_to_color(pr) {
    // 确保输入是数字
    if (typeof pr !== 'number' || isNaN(pr)) {
        return { skill: '未知', color: '#000000', lost: '' };
    }

    pr = Math.floor(pr); // 使用 Math.floor 明确向下取整

    let skill, color, lost;
    switch (true) {
        case pr >= 0 && pr <= 750:
            skill = '还需努力';
            color = '#FE0E00';
            lost = 750 - pr;
            break;
        case pr > 750 && pr <= 1100:
            skill = '低于平均';
            color = '#FE7903';
            lost = 1100 - pr;
            break;
        case pr > 1100 && pr <= 1350:
            skill = '平均水平';
            color = '#FFC71F';
            lost = 1350 - pr;
            break;
        case pr > 1350 && pr <= 1550:
            skill = '好';
            color = '#44B300';
            lost = 1550 - pr;
            break;
        case pr > 1550 && pr <= 1750:
            skill = '很好';
            color = '#318000';
            lost = 1750 - pr;
            break;
        case pr > 1750 && pr <= 2100:
            skill = '非常好';
            color = '#02C9B3';
            lost = '';
            break;
        case pr > 2100 && pr <= 2450:
            skill = '大佬平均';
            color = '#D042F3';
            lost = '';
            break;
        case pr > 2450 && pr <= 9999:
            skill = '神佬平均';
            color = '#A00DC5';
            lost = '';
            break;
        default:
            skill = '未知';
            color = '#000000';
            lost = '';
            break;
    }

    return { skill, color, lost };
}

export { deal_calculate_pr, deal_timestamp_to_date, deal_pr_to_color }