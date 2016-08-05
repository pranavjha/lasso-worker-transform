'use strict';

module.exports = {
    id: __filename,
    stream: false,
    createTransform(transformConfig) {
        return function lassoBabelTransform(code, lassoContext) {
            if(!(/\.worker\.js$/).test(lassoContext.filename)){
              return code;
            }
            return `
                function b64toBlob(b64Data) {
                    var sliceSize = 512;
                    var byteCharacters = atob(b64Data);
                    var byteArrays = [];
                    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                      var slice = byteCharacters.slice(offset, offset + sliceSize);
                      var byteNumbers = new Array(slice.length);
                      for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                      }
                      var byteArray = new Uint8Array(byteNumbers);
                      byteArrays.push(byteArray);
                    }
                    return new Blob(byteArrays, {type: 'text/javascript'});
                }
                var codeBlob = b64toBlob('${new Buffer(code).toString('base64')}');
                module.exports = new Worker(URL.createObjectURL(codeBlob));
            `;
        }
    }
};
