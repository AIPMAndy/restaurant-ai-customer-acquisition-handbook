'use strict';
(() => {
  const ids=['funnel-reach','funnel-visit','funnel-arrive','funnel-redeem'];
  const labels=['触达去重人数','活动页打开去重人数','实际到店去重人数','完成核销去重人数'];
  const inputs=ids.map(id=>document.getElementById(id));
  if (inputs.some(x=>!x)) return;
  const start=document.getElementById('funnel-start');
  const end=document.getElementById('funnel-end');
  const error=document.getElementById('funnel-error');
  const observation=document.getElementById('funnel-observation');
  const exportButton=document.querySelector('[data-export-funnel]');
  const resultIds=['funnel-r1','funnel-r2','funnel-r3','funnel-total'];
  let snapshot=null;
  const integer=s=>/^(0|[1-9][0-9]*)$/.test(s)&&Number.isSafeInteger(Number(s))&&Number(s)<=1000000000;
  const percent=(numerator,denominator)=>denominator===0?'—':(100*numerator/denominator).toFixed(1)+'%';
  function render(){
    const raw=inputs.map(el=>el.value.trim());
    let issue='';
    if(!start.value||!end.value) issue='请填写统计开始与结束日期。';
    else if(start.value>end.value) issue='结束日期不能早于开始日期。';
    else if(raw.some(s=>!integer(s))) issue='四项人数必须填写0至10亿之间的非负整数，空白和小数不可计算。';
    const n=issue?null:raw.map(Number);
    if(n&&(n[1]>n[0]||n[2]>n[1]||n[3]>n[2])) issue='同一批次的人数必须逐步不增加；请检查是否将曝光次数、订单笔数或不同渠道的人数混算。';
    snapshot=issue?null:{start:start.value,end:end.value,n};
    const values=snapshot?[percent(n[1],n[0]),percent(n[2],n[1]),percent(n[3],n[2]),percent(n[3],n[0])]:['—','—','—','—'];
    resultIds.forEach((id,i)=>{document.getElementById(id).textContent=values[i];});
    error.textContent=issue;
    exportButton.disabled=!snapshot;
    observation.textContent=!snapshot?'数据校验未通过，暂不输出比例。':n[0]===0?'触达人数为0，无法计算观察比例；请先核对数据来源。':'该批次记录已通过整数与包含关系检查；仅能说明观察比例，不能推断营销因果效果。';
  }
  function csvDownload(){
    render();
    if(!snapshot) return;
    const {n,start:from,end:to}=snapshot;
    const rows=[['字段','数值'],['开始日期',from],['结束日期',to],
      ...labels.map((label,i)=>[label,String(n[i])]),
      ['触达→打开',percent(n[1],n[0])],['打开→到店',percent(n[2],n[1])],
      ['到店→核销',percent(n[3],n[2])],['触达→核销',percent(n[3],n[0])],
      ['口径限制','仅同一批次和相互包含的去重人数；不混用曝光次数/订单笔数'],
      ['结果限制','观察性比例；不证明营销因果，不代表订单GMV、利润或真实收入归因'],
      ['数据处理','本地生成CSV，不向网站上传个人或经营记录'],
      ['作者及来源','AI 酋长 Andy；https://aipmandy.github.io/restaurant-ai-customer-acquisition-handbook/sources.html']];
    const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';
    const content='\uFEFF'+rows.map(row=>row.map(quote).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');
    a.href=url;a.download='餐饮到店核销漏斗核验.csv';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),5000);
  }
  inputs.concat([start,end]).forEach(el=>{el.addEventListener('input',render);el.addEventListener('change',render);});
  document.querySelector('[data-reset-funnel]').addEventListener('click',()=>{
    inputs.forEach(el=>{el.value='';});start.value='';end.value='';render();
  });
  exportButton.addEventListener('click',csvDownload);
  render();
})();
