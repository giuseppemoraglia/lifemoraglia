import {localDate,shiftDate,validDay} from './model.js';
export {localDate,shiftDate};
export const AREA_NAMES=['Finance','Business','Health','Relationship','Family','Social','Growth','Lifestyle'];
export const GOAL_STATUS=['Idea','Planned','In progress','Blocked','Completed'];
export const PROJECT_STATUS=['Idea','Planned','Active','On Hold','Completed'];
export const SCORECARD=['Finance','Business / Work','Stress','Energy / Sleep','Fitness','Health / Food','Relationship','Family','Social Life','Experiences','Growth','Lifestyle','Time Freedom','Mental Freedom','Direction'];
export const NORTH_STAR='Scrivi la vita che vuoi costruire.';
export const field=(id,label,type='text',extra={})=>({id,label,type,...extra});
const n=(id,label,max,min=0)=>field(id,label,'number',{min,max,step:'any'});
const t=(id,label)=>field(id,label,'textarea');
export const DAILY_GROUPS=[
 ['Body','Fondamenta, senza perfezione',[n('sleep','Sleep · ore',24),n('sleepQuality','Sleep quality · /5',5,1),field('morningWorkout','Morning workout','checkbox'),field('pt','PT · target 3 sessioni/settimana','checkbox'),n('walking','Walking · minuti'),n('foodQuality','Food quality · /5',5,1),n('alcohol','Alcohol · drink')]],
 ['Mind','Osserva, senza giudicarti',[n('energy','Energy · /5',5,1),n('stress','Stress · /5',5,1),n('meditation','Meditation · minuti'),n('screenTime','Screen time · ore',24)]],
 ['Work','Lavoro di qualità, non presenza',[n('deepWork','Deep Work · minuti'),n('unproductive','Unproductive time · minuti'),n('workStress','Work stress · /5',5,1)]],
 ['Money','Spese personali, separate dal patrimonio',[n('spending','Total personal spending · €'),n('foodSpending','Food spending · €')]],
 ['Life / End of Day','La giornata mi ha avvicinato alla vita che voglio?',[field('closer','La mia risposta','select',{options:[['','Non ancora valutata'],['yes','Sì'],['no','No']]}),t('positive','Una cosa positiva di oggi'),t('improve','Una cosa da migliorare domani')]]
];
export const DAILY_FIELDS=DAILY_GROUPS.flatMap(g=>g[2]);
export const WEEKLY_GROUPS=[
 ['Goals & Projects',[t('advanced','Cosa è avanzato?'),t('stuck','Cosa è rimasto fermo?'),t('needsDecision','Goal o Project che richiedono una decisione?')]],
 ['What happened?',[t('good','Cosa è andato bene?'),t('bad','Cosa è andato male?'),t('surprise','Cosa mi ha sorpreso?')]],
 ['Patterns',[t('patterns','Pattern osservati · sonno/energia, stress/lavoro, screen time/focus, alcohol/sonno, deep work/produttività, movimento/energia')]],
 ['Next week',[t('more','Una cosa da fare di più'),t('less','Una cosa da fare di meno'),t('change','Una cosa da cambiare')]],
 ['Weekly Score',[n('weekScore','Questa settimana · /10',10,1),n('freedomScore','Freedom Score · /10',10,1),t('why','Perché?')]],
 ['One sentence',[t('sentence','Se dovessi riassumere questa settimana in una frase')]]
];
export const MONTHLY_GROUPS=[
 ['Goals',[t('goalsProgress','Progress'),t('goalsCompleted','Completed'),t('goalsBlocked','Blocked'),t('goalsUnimportant','Goal che non è più importante?')]],
 ['Projects',[t('projectsCompleted','Completed'),t('projectsActive','Active'),t('projectsStart','Da iniziare'),t('projectsHold','Da eliminare / mettere On Hold')]],
 ['Experiences & Life',[t('experiences','Le esperienze migliori del mese'),t('people','Persone / relazioni importanti'),t('bestMoment','Momento migliore del mese'),t('wantedMore','Cosa avrei voluto fare di più?')]],
 ['Lessons',[...Array.from({length:3},(_,i)=>t('better'+i,`${i+1}. Cosa migliorata`)),...Array.from({length:3},(_,i)=>t('problem'+i,`${i+1}. Problema`)),t('lessons','Cosa ho imparato su di me?')]],
 ['Direction',[t('direction','La vita che sto costruendo assomiglia di più o di meno alla mia North Star?')]],
 ['Next month',[...Array.from({length:3},(_,i)=>t('decision'+i,`${i+1}. Decisione più importante`)),t('focus','Focus del mese'),t('notPriority','Cosa NON sarà una priorità')]],
 ['One sentence',[t('sentence','Se dovessi ricordare questo mese con una sola frase')]]
];
export const MONEY_FIELDS=[n('freedomTarget','Obiettivo entrate mensili · €'),n('income','Income · totale netto del mese · €'),n('recurringIncome','Entrate nette ricorrenti mensili · €'),n('personalSpending','Personal spending · totale mensile confermato · €'),n('propertySpending','Property spending · €'),n('invested','Invested · €'),n('cash','Cash · saldo · €'),n('netWorth','Net Worth · saldo · €',undefined,-Number.MAX_VALUE),n('propertyIncome','Property income · €'),t('financialNote','Financial note')];
export function uid(){return globalThis.crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(36).slice(2)}`;}
export function makeEntity(type,name=''){return {id:uid(),name,areaId:'',goalId:'',priority:type==='goals'?'NEXT':'Medium',status:'Idea',deadline:'',progress:'',outcome:'',successCondition:'',why:'',currentSituation:'',milestones:[],nextAction:'',nextDone:false,blockers:'',notes:'',lastReview:{},history:[],archived:false};}
export function createState(){const state={version:2,northStar:{statement:NORTH_STAR,vision:'',decisionNotes:'',history:[]},areas:AREA_NAMES.map(name=>({id:name.toLowerCase(),name,desired:'',current:'',score:'',attention:'',notes:'',lastReview:{},history:[]})),goals:[],projects:[],actions:[],bills:[],daily:{},weekly:{},monthly:{},journals:[],plans:{},settings:{weekStart:1,scoreMode:'off',journalCriterion:'text',targets:{walking:20,sleep:7,foodQuality:3,meditation:5,deepWork:60}},legacyDays:{}};
 return state;}
export function emptyDaily(){return {bigThing:'',bigDone:null,projectId:'',actionId:'',journal:'',thoughts:'',journalDone:null,closer:'',values:{},habits:{}};}
export function migrateLegacy(state,legacy){if(!legacy)return state;if(legacy.version!==1||!legacy.days||Object.values(legacy.days).some(d=>!validDay(d)))throw Error('Archivio v1 non valido');state.legacyDays={...state.legacyDays,...structuredClone(legacy.days)};for(const [date,old] of Object.entries(legacy.days)){if(state.daily[date])continue;const d=emptyDaily();d.bigThing=old.bigThing;d.bigDone=old.bigDone;d.journal=old.journal;d.migrated=true;const mapping={sleep:'sleep',meditation:'meditation',expenses:'spending'};for(const [from,to] of Object.entries(mapping))if(old.values[from]!==undefined&&old.values[from]!=='')d.values[to]=old.values[from];if(old.values.deepwork!==undefined&&old.values.deepwork!=='')d.values.deepWork=Number(old.values.deepwork)*60;state.daily[date]=d;}return state;}
export function weekStart(date,start=1){const d=new Date(date+'T12:00:00');return shiftDate(date,-((d.getDay()-Number(start)+7)%7));}
export function monthEnd(month){const [y,m]=month.split('-').map(Number);return localDate(new Date(y,m,0,12));}
export function proposalScore(day,settings){const v=day.values||{},h=day.habits||{},t= settings.targets;const journal=settings.journalCriterion==='flag'?day.journalDone===true:Boolean((day.journal||'').trim()||(day.thoughts||'').trim());const checks=[h.morningWorkout===true,Number(v.walking||0)>=t.walking,Number(v.foodQuality||0)>=t.foodQuality,Number(v.sleep||0)>=t.sleep,Number(v.meditation||0)>=t.meditation,Number(v.deepWork||0)>=t.deepWork,day.bigDone===true,journal,day.closer==='yes'];return Math.round(checks.filter(Boolean).length/9*100);}
export const AGGREGATES=[['sleep','Sleep avg','avg','h'],['sleepQuality','Sleep quality avg','avg','/5'],['morningWorkout','Morning workout','count','sessioni'],['pt','PT','count','sessioni · target 3/settimana'],['walking','Walking','sum','min'],['foodQuality','Food quality avg','avg','/5'],['alcohol','Alcohol','sum','drink'],['energy','Energy avg','avg','/5'],['stress','Stress avg','avg','/5'],['meditation','Meditation','days','giorni con minuti > 0'],['screenTime','Screen time avg','avg','h/giorno'],['deepWork','Deep Work','hours','h'],['bigDone','One Big Thing completed','count','giorni'],['unproductive','Unproductive time','hours','h'],['workStress','Work stress avg','avg','/5'],['spending','Personal spending','sum','€'],['foodSpending','Food spending','sum','€']];
export function aggregate(daily,start,end){const entries=Object.entries(daily).filter(([date])=>date>=start&&date<=end);return {coverage:entries.length,metrics:AGGREGATES.map(([id,label,kind,unit])=>{const values=entries.map(([,d])=>id==='bigDone'?d.bigDone:kind==='count'?d.habits?.[id]:d.values?.[id]).filter(v=>v!==undefined&&v!==null&&v!==''&&(kind==='count'?typeof v==='boolean':Number.isFinite(Number(v))));const sum=values.reduce((a,v)=>a+Number(v),0);const value=!values.length?null:kind==='avg'?sum/values.length:kind==='hours'?sum/60:kind==='days'?values.filter(v=>Number(v)>0).length:sum;return {id,label,unit,value,coverage:values.length};})};}
export function freedomRatio(money){const income=money?.recurringIncome,target=Number(money?.freedomTarget);return income===undefined||income===null||income===''||!Number.isFinite(target)||target<=0?null:Number(income)/target*100;}
export function validateState(value){
 function scan(v){if(v&&typeof v==='object'){for(const key of Object.keys(v)){if(['__proto__','prototype','constructor'].includes(key))throw Error('Chiave non ammessa nel backup');scan(v[key]);}}}scan(value);
 const dateValid=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&localDate(new Date(d+'T12:00:00'))===d;

 const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 if(!object(value)||value.version!==2)throw Error('Versione backup non supportata');
 for(const key of ['northStar','daily','weekly','monthly','plans','settings','legacyDays'])if(!object(value[key]))throw Error(`Sezione ${key} non valida`);
 if(value.bills===undefined)value.bills=[];
 for(const key of ['areas','goals','projects','actions','journals','bills']){if(!Array.isArray(value[key]))throw Error(`Sezione ${key} non valida`);const ids=new Set();for(const e of value[key]){if(!object(e)||typeof e.id!=='string'||!e.id||ids.has(e.id))throw Error(`Identificatori ${key} non validi`);ids.add(e.id);}}
 if(typeof value.northStar.statement!=='string'||typeof value.northStar.vision!=='string')throw Error('North Star non valida');
 for(const key of ['areas','goals','projects','actions','journals'])for(const e of value[key]){if(typeof e.name!=='string'||(e.history!==undefined&&!Array.isArray(e.history)))throw Error('Nome o storico non valido');if(key==='journals'&&!dateValid(e.date))throw Error('Data Journal non valida');if(key==='actions'&&(typeof e.done!=='boolean'||typeof e.projectId!=='string'))throw Error('Azione non valida');if(['goals','projects'].includes(key)&&(typeof e.nextAction!=='string'||typeof e.areaId!=='string'||(e.deadline!==''&&!dateValid(e.deadline))))throw Error('Relazione o scadenza non valida');}
 if(![0,1].includes(Number(value.settings.weekStart))||!['off','proposal9'].includes(value.settings.scoreMode)||!['text','flag'].includes(value.settings.journalCriterion)||!object(value.settings.targets))throw Error('Impostazioni non valide');
 for(const key of ['walking','sleep','foodQuality','meditation','deepWork'])if(!Number.isFinite(Number(value.settings.targets[key]))||Number(value.settings.targets[key])<=0)throw Error('Target score non validi');
 for(const type of ['goals','projects'])for(const e of value[type]){if(typeof e.name!=='string'||!Array.isArray(e.milestones)||e.milestones.some(m=>!object(m)||typeof m.id!=='string'||typeof m.text!=='string'||typeof m.done!=='boolean'))throw Error('Entità non valida');if(!(type==='goals'?GOAL_STATUS:PROJECT_STATUS).includes(e.status)||!(type==='goals'?['NOW','NEXT','LATER']:['High','Medium','Low']).includes(e.priority))throw Error('Stato o priorità non valido');if(e.progress!==''&&(!Number.isFinite(Number(e.progress))||Number(e.progress)<0||Number(e.progress)>100))throw Error('Progresso non valido');}
 for(const [date,d] of Object.entries(value.daily)){if(!dateValid(date)||!object(d)||!object(d.values)||!object(d.habits)||typeof d.journal!=='string'||typeof d.bigThing!=='string')throw Error('Daily non valido');}
 for(const [date,d] of Object.entries(value.legacyDays))if(!dateValid(date)||!validDay(d))throw Error('Archivio v1 non valido');
 for(const key of ['weekly','monthly'])for(const [date,r] of Object.entries(value[key]))if(!object(r)||(key==='weekly'?!dateValid(date):!dateValid(date+'-01')))throw Error('Review non valida');
 for(const [date,p] of Object.entries(value.plans))if(!dateValid(date)||!Array.isArray(p)||p.length!==3||p.some(v=>typeof v!=='string'))throw Error('Priorità non valide');
 for(const b of value.bills){if(typeof b.name!=='string'||!['',1,2,3,6,12].includes(b.interval)||b.amount!==''&&(!Number.isFinite(b.amount)||b.amount<0)||b.due!==''&&!dateValid(b.due)||!Array.isArray(b.payments)||b.payments.some(p=>!object(p)||!dateValid(p.date)||!Number.isFinite(p.amount)||p.amount<0||p.due!==''&&!dateValid(p.due)))throw Error('Utenza o pagamento non valido');}
 for(const a of value.actions)if(a.reminder&&(typeof a.reminder!=='boolean'||!Number.isInteger(a.target)||a.target<1||!Number.isInteger(a.count)||a.count<0||a.count>a.target))throw Error('Promemoria non valido');
 return value;
}
export function mergeStates(current,incoming,preferIncoming=false){validateState(incoming);const result=structuredClone(current);for(const key of ['daily','weekly','monthly','plans','legacyDays'])for(const [id,v] of Object.entries(incoming[key]))if(preferIncoming||!Object.hasOwn(result[key],id))result[key][id]=structuredClone(v);for(const key of ['areas','goals','projects','actions','journals','bills'])for(const item of incoming[key]){const i=result[key].findIndex(v=>v.id===item.id);if(i<0)result[key].push(structuredClone(item));else if(preferIncoming)result[key][i]=structuredClone(item);}if(preferIncoming){result.northStar=structuredClone(incoming.northStar);result.settings=structuredClone(incoming.settings);}return validateState(result);}
