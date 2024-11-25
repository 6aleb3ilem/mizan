declare module 'html2pdf.js';
// Add this to the top of your component file or in a .d.ts file.
declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => void; // Simplified, adjust according to actual API
    }
  }
  declare module 'jspdf' {
    interface jsPDF {
      lastAutoTable: {
        finalY: number;
      };
    }
  }
  