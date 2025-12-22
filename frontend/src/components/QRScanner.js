import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function QRScanner({ onScanSuccess }) {
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCodeRef.current = new Html5Qrcode('qr-reader');

        html5QrCodeRef.current
            .start(
                { facingMode: 'environment' },
                config,
                (decodedText) => {
                    onScanSuccess(decodedText);
                    html5QrCodeRef.current.stop();
                },
                (errorMessage) => {
                    // Ignore errors during scanning
                }
            )
            .catch((err) => {
                console.error('Error starting QR scanner:', err);
            });

        return () => {
            if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                html5QrCodeRef.current.stop().catch((err) => {
                    console.error('Error stopping QR scanner:', err);
                });
            }
        };
    }, [onScanSuccess]);

    return (
        <div className="qr-scanner-container">
            <div
                id="qr-reader"
                ref={scannerRef}
                style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
            />
        </div>
    );
}

export default QRScanner;
