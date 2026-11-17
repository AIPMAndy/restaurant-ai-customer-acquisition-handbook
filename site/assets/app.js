'use strict';
const calcIds = ['paid','food','fee','subsidy','fulfill','acquire'];
const amountLabels = ['顾客实际支付','食材/包装等可变成本','平台费及佣金','商家承担的优惠','新增履约成本','单笔获客成本'];
let calcSnapshot = null;

async function copyTextExactly(value) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try { await navigator.clipboard.writeText(value); return true; } catch (_) { /* try local fallback */ }
  }
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly','');
  field.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.appendChild(field);
  field.select();
  let success = false;
  try { success = document.execCommand('copy') === true; } catch (_) { success = false; }
  field.remove();
  return success;
}
function feedback(button, ok, value) {
  const note = button.parentElement.querySelector('[data-copy-feedback]') || document.createElement('span');
  note.dataset.copyFeedback = '';
  note.setAttribute('role','status');
  note.setAttribute('aria-live','polite');
  note.className = 'action-feedback';
  note.textContent = ok ? '已复制到剪贴板' : '复制失败，请手动选取：' + value;
  if (!note.parentElement) button.insertAdjacentElement('afterend',note);
  button.textContent = ok ? '已复制 ✓' : '复制失败 · 重试';
}
function updatePlan() {
  const checks = [...document.querySelectorAll('[data-day]')];
  if (!checks.length) return;
  let completed = 0;
  for (const input of checks) {
    try { input.checked = localStorage.getItem('restaurant-plan-' + input.dataset.day) === 'true'; }
    catch (_) { /* private browsing may block storage; interactive checkboxes still work */ }
    if (input.checked) completed++;
  }
  const counter = document.querySelector('#progress');
  const fill = document.querySelector('#fill');
  if (counter) counter.textContent = completed + '/' + checks.length + ' 天';
  if (fill) { fill.style.width = (100 * completed / checks.length) + '%'; fill.parentElement.setAttribute('role','progressbar'); fill.parentElement.setAttribute('aria-valuemin','0'); fill.parentElement.setAttribute('aria-valuemax',String(checks.length)); fill.parentElement.setAttribute('aria-valuenow',String(completed)); fill.parentElement.setAttribute('aria-label','30天任务完成进度'); }
}
function readAmounts() {
  const numbers = [];
  for (const id of calcIds) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) return null;
    const val = Number(el.value);
    if (!Number.isFinite(val) || val < 0 || val > 1e9) return null;
    numbers.push(val);
  }
  return numbers;
}
function calc() {
  const result = document.querySelector('#result');
  if (!result) return;
  const error = document.querySelector('#calc-error');
  const exportButton = document.querySelector('[data-export-calc]');
  const values = readAmounts();
  const fixedInput = document.getElementById('monthly-fixed');
  const fixedRaw = fixedInput ? fixedInput.value.trim() : '';
  const fixedCost = fixedRaw === '' ? null : Number(fixedRaw);
  const invalidFixed = fixedCost !== null && (!Number.isFinite(fixedCost) || fixedCost < 0 || fixedCost > 1e9);
  const breakEven = document.querySelector('#break-even');
  if (!values || invalidFixed) {
    calcSnapshot = null;
    result.textContent = '单单贡献：请检查输入';
    result.style.color = '#b42318';
    if (error) error.textContent = invalidFixed ? '每月固定成本必须是0至10亿元之间的有效金额，或留空。' : '请填写全部六项非负金额（单项不超过10亿元）；空白、负数或非数字不可计算。';
    if (breakEven) breakEven.textContent = '保本订单：请检查输入';
    if (exportButton) exportButton.disabled = true;
    return;
  }
  const contributionCents = Math.round(values[0]*100) - values.slice(1).reduce((sum,value)=>sum+Math.round(value*100),0);
  const contribution = contributionCents / 100;
  const breakEvenOrders = fixedCost === null ? null : fixedCost === 0 ? 0 : contributionCents > 0 ? Math.ceil(Math.round(fixedCost*100)/contributionCents) : null;
  calcSnapshot = {values,contribution,fixedCost,breakEvenOrders};
  if (breakEven) breakEven.textContent = fixedCost === null ? '填写月固定成本可估算保本订单量。' : fixedCost === 0 ? '月固定成本为0，无需额外订单覆盖固定成本。' : breakEvenOrders === null ? '单单贡献不大于0，无法通过增加同条件订单覆盖固定成本。' : '按当前单单贡献估算，每月至少 '+breakEvenOrders.toLocaleString('zh-CN')+' 单可覆盖填写的固定成本（未包含税费等）。';
  result.textContent = '单单贡献：¥' + contribution.toFixed(2);
  result.style.color = contribution >= 0 ? '#116455' : '#b42318';
  if (error) error.textContent = '';
  if (exportButton) exportButton.disabled = false;
}
function downloadText(name,text,type='text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text],{type}));
  const anchor = document.createElement('a');
  anchor.href=url;
  anchor.download=name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(()=>URL.revokeObjectURL(url),5000);
}
document.addEventListener('click',async event=>{
  const copy = event.target.closest('[data-copy]');
  if (copy) { const value=copy.dataset.copy; feedback(copy,await copyTextExactly(value),value); return; }
  if (event.target.closest('[data-reset-calc]')) {
    for (const id of calcIds) { const el=document.getElementById(id); if (el) el.value='0'; }
    const fixedInput=document.getElementById('monthly-fixed'); if (fixedInput) fixedInput.value='';
    calc();
    return;
  }
  if (event.target.closest('[data-export-calc]')) {
    calc();
    if (!calcSnapshot) return;
    const rows=[['项目','数值'],...amountLabels.map((label,i)=>[label,calcSnapshot.values[i].toFixed(2)]),['单单贡献(元)',calcSnapshot.contribution.toFixed(2)]];
    if (calcSnapshot.fixedCost !== null) rows.push(['每月固定成本(元)',calcSnapshot.fixedCost.toFixed(2)],['估算每月保本订单数',calcSnapshot.breakEvenOrders===null?'不可覆盖':String(calcSnapshot.breakEvenOrders)]);
    rows.push(['说明','教学估算：按每单贡献不变，未覆盖税费、订单波动及未填写的成本，不是净利润或真实业绩']);
    const escapeCsv=v=>'"'+String(v).replace(/"/g,'""')+'"';
    downloadText('餐饮单单贡献测算.csv','\uFEFF'+rows.map(r=>r.map(escapeCsv).join(',')).join('\r\n'),'text/csv;charset=utf-8');
    return;
  }
  if (event.target.closest('[data-export-plan]')) {
    const rows=[...document.querySelectorAll('[data-day]')].map(el=>(el.checked?'[x] ':'[ ] ')+el.closest('label').innerText.trim());
    downloadText('餐饮30天执行记录.txt','餐饮30天计划（浏览器本地导出）\n说明：勾选仅表明已执行打卡，不证明真实经营效果。\n\n'+rows.join('\n'));
    return;
  }
  if (event.target.closest('[data-reset-plan]')) {
    if (!window.confirm('确定清空本设备的30天打卡？此操作无法恢复，建议先导出记录。')) return;
    for (const el of document.querySelectorAll('[data-day]')) {
      el.checked=false;
      try { localStorage.removeItem('restaurant-plan-'+el.dataset.day); } catch (_) {}
    }
    updatePlan();
  }
});
document.addEventListener('change',event=>{
  if (event.target.matches('[data-day]')) {
    try { localStorage.setItem('restaurant-plan-'+event.target.dataset.day,String(event.target.checked)); } catch (_) {}
    updatePlan();
  }
});
document.addEventListener('input',event=>{if(event.target.matches('[data-calc]'))calc();});
document.addEventListener('DOMContentLoaded',()=>{
  updatePlan();
  calc();
  const nav=document.querySelector('.top nav');
  if (!nav) return;
  const prefix=location.pathname.includes('/guide/')?'../':'';
  if (!nav.querySelector('a[href$="contact.html"]')) {
    const contact=document.createElement('a');
    contact.href=prefix+'contact.html'; contact.textContent='联系合作'; nav.appendChild(contact);
  }
  if (!nav.querySelector('a[href="https://www.a6no1.cn/"]')) {
    const company=document.createElement('a');
    company.href='https://www.a6no1.cn/'; company.textContent='企业官网';
    company.target='_blank'; company.rel='noopener noreferrer'; nav.appendChild(company);
  }
});
