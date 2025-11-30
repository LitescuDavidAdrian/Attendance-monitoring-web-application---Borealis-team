export const getQRCode = async (req, res) => {
  try {

    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const qrCode = await generateQRCode(event.accessCode);
    res.json({ 
      qrCode: qrCode,  
      accessCode: event.accessCode 
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};