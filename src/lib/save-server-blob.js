export default (filename, blob) => {
    const data = new FormData();
    data.append('file',blob,filename);
    fetch('http://192.168.1.64:8086/corp/api/file/upload',{
        method:'post',
        body: data,
    }).then(response => {
        if(response.status===200){
            alert('文件保存成功')
        }else{
            alert('文件保存失败')
        }
    });
};
