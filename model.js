export const areas = [
 {id:'body',name:'Body',subtitle:'Energia per ciò che conta',symbol:'◉',fields:[['sleep','Sonno','ore',8,0.5],['water','Acqua','litri',2,0.1],['steps','Passi','passi',8000,100]],habits:[['exercise','Ho fatto movimento'],['nutrition','Ho mangiato con cura']]},
 {id:'mind',name:'Mind',subtitle:'Coltiva il tuo spazio mentale',symbol:'✳',fields:[['reading','Lettura','min',20,1],['meditation','Meditazione','min',10,1]],habits:[['learning','Ho imparato qualcosa'],['offline','Tempo senza schermi']]},
 {id:'work',name:'Work',subtitle:'Meno rumore, più intenzione',symbol:'▦',fields:[['deepwork','Deep work','ore',4,0.5],['tasks','Task completati','task',3,1]],habits:[['plan','Ho pianificato la giornata'],['shutdown','Ho chiuso il lavoro in orario']]},
 {id:'money',name:'Money',subtitle:'Consapevolezza, ogni giorno',symbol:'↗',fields:[['expenses','Spese','€',null,0.01],['savings','Risparmio','€',null,0.01]],habits:[['tracked','Ho registrato le spese'],['intentional','Acquisti consapevoli']]},
 {id:'life',name:'Life',subtitle:'Le cose che rendono la vita tua',symbol:'◇',fields:[['connections','Tempo con le persone care','min',30,1]],habits:[['connection','Ho coltivato una relazione'],['joy','Ho fatto qualcosa per me'],['gratitude','Un momento di gratitudine']]}
];
export function blankDay(){return {values:{},habits:{},bigThing:'',bigDone:false,journal:''};}
export function areaScore(area,day){const parts=area.fields.filter(f=>f[3]!==null).map(f=>Math.min(1,Math.max(0,Number(day.values[f[0]])||0)/f[3]));parts.push(...area.habits.map(h=>day.habits[h[0]]?1:0));return Math.round(parts.reduce((a,b)=>a+b,0)/parts.length*100);}
export function dailyScore(day){return Math.round(areas.reduce((total,area)=>total+areaScore(area,day),0)/areas.length);}
export function localDate(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function shiftDate(date,offset){const value=new Date(date+'T12:00:00');value.setDate(value.getDate()+offset);return localDate(value);}
export function validDay(day){return day && typeof day.values==='object' && day.values!==null && typeof day.habits==='object' && day.habits!==null && typeof day.bigThing==='string' && typeof day.journal==='string' && typeof day.bigDone==='boolean';}
