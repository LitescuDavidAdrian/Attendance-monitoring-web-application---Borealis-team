import qr from 'qrcode';

export const generateQrCode = async (text)=>
{
    try{
        const qrCodeDataURL = await qr.toDataURL(text);
        return qrCodeDataURL;
    }
    catch (err){
        throw new Error('Failed to generate Qr code');
    }
}