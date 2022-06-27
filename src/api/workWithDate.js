export default function toISODate(datetime){
    let str = datetime.split(' ');
    let date = str[0].split('.');
    return date[2] + '-' + date[1] + '-' + date[1] + ' ' + str[1];
 }
