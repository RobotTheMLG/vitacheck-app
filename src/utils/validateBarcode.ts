export function validateBarcode(barcode: string) {
    const upcEanIsbnRegex = /^[0-9]{8,13}$/; // 8-13 digit barcodes
    return upcEanIsbnRegex.test(barcode);
  }
  