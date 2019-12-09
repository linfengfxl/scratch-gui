export default (filename, blob) => {
    try {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        // Use special ms version if available to get it working on Edge.
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
            return;
        }
        
        const url = URL.createObjectURL(blob);
       
        log(url);
        downloadLink.href = url;
        //log(downloadLink.href);
        downloadLink.download = filename;
        downloadLink.type = blob.type;
        downloadLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
    } catch (err) {
        log.err(err);
        log.err(err.message);
        log.err(err.stack);
    }
};

function relplaceUrl(url) {
    if (url && url.indexOf('file:')) { 
        //return url.replace('file:///',window.location.href.replace('/index.html','/'));
        return url.replace('file:///', 'null/');

    } else {
        return url;
    }
}
function log(url) {
    console.log(url);
    console.log(window.location.href);
    console.log(window.location.protocol);
}

