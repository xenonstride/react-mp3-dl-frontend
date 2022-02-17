const socket = io('http://localhost:3001')

exports.startDownload = (data)=>{
    socket.emit('download',data)
}

// exports.onDownloading = ()=>{
//     socket.on('working',data=>console.log(data))
// }

// exports.onComplete = ()=>{
//     socket.on('done',data=>console.log(data))
// }
// console.log('running socket script')
socket.on('working',data=>console.log(data))
socket.on('done',data=>console.log(data))