var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BCidOZ5dTOK0DkuKVs3z6FUwF91aHZEoAyAzwUJKNRjqxTKNflfdUMEh-LNHSx8-R3X0ewY6QC1wiHPOHtBA7Kk",
    "privateKey": "qYulJkSzHmnW-A7m38acqHcL7P8s3Cby9_Gmxok52Qw"
};

webPush.setVapidDetails(
    'mailto:rifqipratama9@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f2OlFFiPBQY:APA91bGHlnfATlVbBeIwpf0NchZD6_pmxpAKM0GUOttRNOrk6COMVUnUlInWeFTP1nkeaK0R4pXkawnDSzZXKei6hcIW8fWzXFddX0-RmYhWCF2o2hw8qoLn6uuJ72RqDjiLYesVZVxB",
    "keys": {
        "p256dh": "BIGXWX0qXRYp39SyfyJzt5/M2zdGrDgnd3LAqzqDL8hVSvxUpZ+AN2InEm3kzRwCR1g/1iFnWOvsj5rYeU40F38=",
        "auth": "oEvXishTmPxmhidJA9cBfA=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";
var options = {
    gcmAPIKey: '1076229439299',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);