# qr-generator

A tool to generate QR-Codes - all embedded in a static website.

Started as a small helper for the office and brand managers n my company, "evolved" into a "learn a bit more about vite"...

## How to use

- go to Releases
- download the latest release
- unpack the -zip file
- move the .html file to the location where you want to keep it
- (double) click the file to open it with your browser
- use it according to the displayed instructions

## How to build

- make sure you have an up to date (LTS) version of nodeJS
- clone the repository
- enter the `./builder/` directory in your terminal / command prompt
- run `npm install`
- run `npm run build`
- the generated file is `./builder/dist/index.html` - it contains everything you need to use the tool

## QR Code Standards

### Phone Number

`tel:+1234567890`

### SMS Message

`smsto:+1234567890:Message`

### WiFi Credentials

WPA/WPA2: `WIFI:S:ssid;T:WEP;P:password;;`  
WEP: `WIFI:S:ssid;T:WPA;P:password;;`  
No Encrption: `WIFI:S:ssid;T:nopass;P:password;;`

The H operand there appears to deal with hidden networks
`WIFI:S:<SSID>;T:<WEP|WPA|blank>;P:<PASSWORD>;H:<true|false|blank>;;`

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
