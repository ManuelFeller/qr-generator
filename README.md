# qr-generator

A tool to generate simple QR-Codes embedded in a static website

[Based on the qr-encoder library](https://github.com/pinchtools/qr-encoder)

## QR Code Standards

### Phone Number

`tel:+1234567890`

### SMS Message

`smsto:+1234567890:Message`

### WiFi Credentials

WPA/WPA2: `WIFI:S:ssid;T:WEP;P:password;;`  
WEP: `WIFI:S:ssid;T:WPA;P:password;;`  
No Encrption: `WIFI:S:ssid;T:nopass;P:password;;`

### GEO URL

`geo:--lat--,--lon--`

### Email Link

`mailto:test@test.net`

### Simple vCard

```
BEGIN:VCARD
VERSION:3.0
N:YOUR_NAME
TEL:+1234567890
EMAIL:your@email.net
URL:https://YOURWEBSIE.net
ADR:YOUR_ADDRESS_HERE YOUR_ADDRESS_2_HERE
ORG:YOUR_COMPANY
NOTE:YOURMEMO
END:VCARD
```

### Event

```
BEGIN:VEVENT
SUMMARY:EVENT_TITLE
DTSTART:20230131
DTEND:20230131
LOCATION:EVENT_LOCATION
DESCRIPTION:EVENT_DESCRIPTION
END:VEVENT
```
