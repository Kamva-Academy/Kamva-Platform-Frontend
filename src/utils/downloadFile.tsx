const downloadFile = (fileUrl: string, filename: string, fileMimeType: string) => {
  var request = new XMLHttpRequest();
  request.open('GET', fileUrl, true);
  request.responseType = 'blob';

  request.onload = function () {
    if (request.status === 200) {
      var blob = new Blob([request.response], { type: fileMimeType });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  request.send();
}

export default downloadFile;