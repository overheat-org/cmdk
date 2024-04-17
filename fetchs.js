fetch("https://discord.com/api/v9/applications/933068535293435954/delete", {
  "headers": {
    "accept": "*/*",
    "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "authorization": "NjA3OTk5OTM0NzI1MzU3NTc4.GJrPVJ.Cd35FmynYnI0pTWpMocRj-sFVgU_gboQzZl7OI",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-track": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6InB0LUJSIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMy4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMjMuMC4wLjAiLCJicm93c2VyX3ZlcnNpb24iOiIxMjMuMC4wLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiaHR0cHM6Ly93d3cuYmluZy5jb20vIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50Ijoid3d3LmJpbmcuY29tIiwic2VhcmNoX2VuZ2luZV9jdXJyZW50IjoiYmluZyIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjM4MTIyLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
    "cookie": "OptanonAlertBoxClosed=2023-10-04T18:23:14.359Z; _ga_Q149DFWHT7=GS1.1.1696443795.1.0.1696443947.0.0.0; __dcfduid=98e1cf00977411ee99fd3fef0fbc2d01; __sdcfduid=98e1cf01977411ee99fd3fef0fbc2d01a13650a9ec88ec9e3a5793dea613275f4b964a120f76cc214bbbf79582677a6b; __stripe_mid=6cb3acbe-16a7-4eec-8930-c6ca2a3e9c88edd339; OptanonConsent=isIABGlobal=false&datestamp=Tue+Mar+26+2024+20%3A41%3A29+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=6.33.0&hosts=&consentId=de37a4e2-d17c-4ea3-b415-ad65a93f69c5&interactionCount=2&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0&AwaitingReconsent=false&geolocation=BR%3BSP; cf_clearance=PQReMmiRq9ATbnrJmi94_zAJKdFnSo4uO9gp.PJP3G8-1711940681-1.0.1.1-zvm09s3X.QjcIccLZ9AIdFr7TYK05qNk_iMpS_tb8yz3rCdFbf9BFw1FVpTngha9lyQXkWSNWziPKoH5rfdDxw; __cfruid=eded5922a6ad05daf70f0cb1120c4877db1d8d25-1711940681; _cfuvid=jE4Q6wrM25MZ0.JqveE3PB1E1EQix4SToanP6BtTH90-1711940681912-0.0.1.1-604800000; _ga=GA1.1.142345412.1668120004; _ga_5CWMJQ1S0X=GS1.1.1711941876.1.1.1711942011.0.0.0",
    "Referer": "https://discord.com/developers/applications/933068535293435954/information",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "POST"
});
/*
401 
{
	"message":"Verifica\u00e7\u00e3o de dois fatores \u00e9 necess\u00e1ria para esta opera\u00e7\u00e3o",
	"code":60003,
	"mfa":{"ticket":"NjA3OTk5OTM0NzI1MzU3NTc4.HMo29F.bs5_pzSVnk2V0i3w0Y516AEBcpkKGrbOZxQ_B8",
	"methods":[{"type":"password"}]}}
*/

fetch("https://discord.com/api/v9/mfa/finish", {
  "headers": {
    "accept": "*/*",
    "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "authorization": "NjA3OTk5OTM0NzI1MzU3NTc4.GJrPVJ.Cd35FmynYnI0pTWpMocRj-sFVgU_gboQzZl7OI",
    "content-type": "application/json",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-track": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6InB0LUJSIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMy4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMjMuMC4wLjAiLCJicm93c2VyX3ZlcnNpb24iOiIxMjMuMC4wLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiaHR0cHM6Ly93d3cuYmluZy5jb20vIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50Ijoid3d3LmJpbmcuY29tIiwic2VhcmNoX2VuZ2luZV9jdXJyZW50IjoiYmluZyIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjM4MTIyLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
    "cookie": "OptanonAlertBoxClosed=2023-10-04T18:23:14.359Z; _ga_Q149DFWHT7=GS1.1.1696443795.1.0.1696443947.0.0.0; __dcfduid=98e1cf00977411ee99fd3fef0fbc2d01; __sdcfduid=98e1cf01977411ee99fd3fef0fbc2d01a13650a9ec88ec9e3a5793dea613275f4b964a120f76cc214bbbf79582677a6b; __stripe_mid=6cb3acbe-16a7-4eec-8930-c6ca2a3e9c88edd339; OptanonConsent=isIABGlobal=false&datestamp=Tue+Mar+26+2024+20%3A41%3A29+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=6.33.0&hosts=&consentId=de37a4e2-d17c-4ea3-b415-ad65a93f69c5&interactionCount=2&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0&AwaitingReconsent=false&geolocation=BR%3BSP; cf_clearance=PQReMmiRq9ATbnrJmi94_zAJKdFnSo4uO9gp.PJP3G8-1711940681-1.0.1.1-zvm09s3X.QjcIccLZ9AIdFr7TYK05qNk_iMpS_tb8yz3rCdFbf9BFw1FVpTngha9lyQXkWSNWziPKoH5rfdDxw; __cfruid=eded5922a6ad05daf70f0cb1120c4877db1d8d25-1711940681; _cfuvid=jE4Q6wrM25MZ0.JqveE3PB1E1EQix4SToanP6BtTH90-1711940681912-0.0.1.1-604800000; _ga=GA1.1.142345412.1668120004; _ga_5CWMJQ1S0X=GS1.1.1711941876.1.1.1711942011.0.0.0",
    "Referer": "https://discord.com/developers/applications/933068535293435954/information",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"ticket\":\"NjA3OTk5OTM0NzI1MzU3NTc4.HMo29F.bs5_pzSVnk2V0i3w0Y516AEBcpkKGrbOZxQ_B8\",\"mfa_type\":\"password\",\"data\":\"ONNFHistoria#2023\"}",
  "method": "POST"
});
/**
 * 200
 * {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTE5NDIyOTEsIm5iZiI6MTcxMTk0MjI5MSwiZXhwIjoxNzExOTQyNTkxLCJpc3MiOiJ1cm46ZGlzY29yZC1hcGkiLCJhdWQiOiJ1cm46ZGlzY29yZC1tZmEtcmVwcm9tcHQiLCJ1c2VyIjo2MDc5OTk5MzQ3MjUzNTc1Nzh9.oGGcKZbj7Z19MQaGjRAcyaqXkhcDBSMBNfzzEwiPPsE1UPTgizAR8_31BhiAJnwZr0UXvnru-g1cefXxtVNAVg"}
 */