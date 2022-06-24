export default function toISODate(datetime){
    let str = datetime.split(' ');
    let date = str[0].split('.');
    return date[2] + '-' + date[1] + '-' + date[1] + ' ' + str[1];
 }

 export function parseDateQuery(data){
    let result = [];
 }

 export function msToTimemsToTime(duration) {
   let h,m,s;
   h = Math.floor(duration/1000/60/60);
   m = Math.floor((duration/1000/60/60 - h)*60);
   s = Math.floor(((duration/1000/60/60 - h)*60 - m)*60);

   s < 10 ? s = `0${s}`: s = `${s}`
   m < 10 ? m = `0${m}`: m = `${m}`
   h < 10 ? h = `0${h}`: h = `${h}`

   return `${h}:${m}:${s}`;
 }