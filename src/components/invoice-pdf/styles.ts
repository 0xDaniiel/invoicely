// src/components/invoice-pdf/styles.ts
import { StyleSheet } from "@react-pdf/renderer";

// One ruleset shared by the live preview (PDFViewer) and the downloaded PDF —
// they render the exact same <InvoiceDocument>, so there's nothing to keep in sync.
export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#18181B", // zinc-900
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  businessName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  mutedText: {
    color: "#71717A", // zinc-500
    lineHeight: 1.4,
  },
  invoiceTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: 8,
    color: "#71717A",
    textAlign: "right",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 10,
    fontFamily: "Courier",
    textAlign: "right",
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 8,
    color: "#71717A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  billTo: {
    marginBottom: 28,
  },
  clientName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  table: {
    marginBottom: 20,
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottom: "1 solid #D4D4D8", // zinc-300
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottom: "1 solid #F4F4F5", // zinc-100
  },
  colDescription: { flex: 1 },
  colQty: { width: 50, textAlign: "right" },
  colRate: { width: 70, textAlign: "right" },
  colAmount: { width: 80, textAlign: "right" },
  tableHeaderText: {
    fontSize: 8,
    color: "#71717A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  mono: {
    fontFamily: "Courier",
  },
  totalsBlock: {
    alignSelf: "flex-end",
    width: 200,
    marginBottom: 28,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalsRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1 solid #D4D4D8",
    paddingTop: 6,
    marginTop: 2,
  },
  totalsLabel: {
    color: "#71717A",
  },
  totalsLabelFinal: {
    fontFamily: "Helvetica-Bold",
  },
  paymentSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#FAFAFA",
    borderRadius: 4,
  },
  paymentMethodBlock: {
    marginBottom: 10,
  },
  paymentMethodTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  paymentRowLabel: {
    width: 90,
    color: "#71717A",
  },
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qrImage: {
    width: 56,
    height: 56,
  },
  notes: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1 solid #F4F4F5",
    color: "#71717A",
    lineHeight: 1.5,
  },
});
