export default (filename, blob) => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    // Use special ms version if available to get it working on Edge.
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
    window.URL = window.URL||window.webkitURL;
    
    const url = window.URL.createObjectURL(blob);
    console.log(url);
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.type = blob.type;
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
};
