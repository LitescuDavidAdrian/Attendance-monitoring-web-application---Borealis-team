import { text } from 'express';
import qr from 'qrcode';

export const generateQrCode = async (text)=>
{
    try{
        const qrCodeDataURL = await qr.qrCodeDataURL(text);
        return qrCodeDataURL;
    }
    catch (err){
        throw new Error('Failed to generate Qr code');
    }
}