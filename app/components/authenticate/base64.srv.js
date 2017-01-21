define(['app'], function(app) {
    app.service('Base64', function() {
        var service = {};
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        service.encode = function(data) {
            var encryptedData = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = data.charCodeAt(i++);
                chr2 = data.charCodeAt(i++);
                chr3 = data.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                encryptedData = encryptedData +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < data.length);

            return encryptedData;
        };

        service.decode = function(encryptedData) {
            var decryptedData = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(encryptedData)) {
                window.alert("There were invalid base64 characters in the encryptedData text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            encryptedData = encryptedData.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(encryptedData.charAt(i++));
                enc2 = keyStr.indexOf(encryptedData.charAt(i++));
                enc3 = keyStr.indexOf(encryptedData.charAt(i++));
                enc4 = keyStr.indexOf(encryptedData.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                decryptedData = decryptedData + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    decryptedData = decryptedData + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    decryptedData = decryptedData + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < encryptedData.length);

            return decryptedData;
        };

        return service;
    });
});
