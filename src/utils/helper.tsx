export default function generateDownloadFilename() : string {

    let newDate = new Date()

    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    let dateString = `${year}${month<10?`0${month}`:`${month}`}${date<10?`0${date}`:`${date}`}`

    let hour = newDate.getHours()
    let minutes = newDate.getMinutes()
    let seconds = newDate.getSeconds()
    let timeString = `${hour<10?`0${hour}`:`${hour}`}${minutes<10?`0${minutes}`:`${minutes}`}${seconds<10?`0${seconds}`:`${seconds}`}`

    return `ChatGPT-${dateString}-${timeString}.pdf`
}
