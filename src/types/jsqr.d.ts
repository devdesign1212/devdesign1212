declare module 'jsQR' {
  export interface QRCode {
    data: string;
    location: {
      topLeftCorner: { x: number; y: number };
      topRightCorner: { x: number; y: number };
      bottomLeftCorner: { x: number; y: number };
      bottomRightCorner: { x: number; y: number };
      topLeftFinderPattern: { x: number; y: number };
      topRightFinderPattern: { x: number; y: number };
      bottomLeftFinderPattern: { x: number; y: number };
    };
  }

  export default function jsQR(
    imageData: Uint8ClampedArray,
    width: number,
    height: number,
    options?: {
      inversionAttempts?: 'dontInvert' | 'onlyInvert' | 'attemptBoth' | 'invertFirst';
    }
  ): QRCode | null;
}
