// src/components/invoice-pdf/InvoiceDocument.tsx
import {
  Document,
  Image as PdfImage,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import type { Invoice } from "@/types/invoice";
import {
  calculateLineItemAmount,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "@/types/invoice";
import { formatCurrency } from "@/lib/format";
import { getWalletNetworkLabel } from "@/lib/wallet-networks";
import { styles } from "./styles";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface InvoiceDocumentProps {
  invoice: Invoice;
  // pre-generated so the doc component stays a pure sync render — see InvoicePreview for generation
  walletQrCodeDataUrl?: string | null;
}

export function InvoiceDocument({
  invoice,
  walletQrCodeDataUrl,
}: InvoiceDocumentProps) {
  const {
    business,
    client,
    lineItems,
    taxRate,
    currency,
    dueDate,
    notes,
    paymentMethods,
  } = invoice;
  const subtotal = calculateSubtotal(lineItems);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateTotal(lineItems, taxRate);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.businessName}>
              {business.name || "Your business"}
            </Text>
            <Text style={styles.mutedText}>{business.address}</Text>
            <Text style={styles.mutedText}>{business.email}</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.metaLabel}>Due date</Text>
            <Text style={styles.metaValue}>{formatDate(dueDate)}</Text>
          </View>
        </View>

        {/* Bill to */}
        <View style={styles.billTo}>
          <Text style={styles.sectionLabel}>Bill to</Text>
          <Text style={styles.clientName}>{client.name || "Client name"}</Text>
          <Text style={styles.mutedText}>{client.address}</Text>
          <Text style={styles.mutedText}>{client.email}</Text>
        </View>

        {/* Line items */}
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colDescription, styles.tableHeaderText]}>
              Description
            </Text>
            <Text style={[styles.colQty, styles.tableHeaderText]}>Qty</Text>
            <Text style={[styles.colRate, styles.tableHeaderText]}>Rate</Text>
            <Text style={[styles.colAmount, styles.tableHeaderText]}>
              Amount
            </Text>
          </View>
          {lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colDescription}>
                {item.description || "—"}
              </Text>
              <Text style={[styles.colQty, styles.mono]}>{item.quantity}</Text>
              <Text style={[styles.colRate, styles.mono]}>
                {formatCurrency(item.rate, currency)}
              </Text>
              <Text style={[styles.colAmount, styles.mono]}>
                {formatCurrency(calculateLineItemAmount(item), currency)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.mono}>
              {formatCurrency(subtotal, currency)}
            </Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Tax ({taxRate || 0}%)</Text>
            <Text style={styles.mono}>{formatCurrency(tax, currency)}</Text>
          </View>
          <View style={styles.totalsRowFinal}>
            <Text style={styles.totalsLabelFinal}>Total</Text>
            <Text style={[styles.mono, styles.totalsLabelFinal]}>
              {formatCurrency(total, currency)}
            </Text>
          </View>
        </View>

        {/* Payment methods */}
        {(paymentMethods.bank ||
          paymentMethods.link ||
          paymentMethods.wallet) && (
          <View style={styles.paymentSection}>
            <Text style={styles.sectionLabel}>Payment</Text>

            {paymentMethods.bank && (
              <View style={styles.paymentMethodBlock}>
                <Text style={styles.paymentMethodTitle}>Bank transfer</Text>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentRowLabel}>Bank</Text>
                  <Text>{paymentMethods.bank.bankName}</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentRowLabel}>Account name</Text>
                  <Text>{paymentMethods.bank.accountName}</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentRowLabel}>Account number</Text>
                  <Text style={styles.mono}>
                    {paymentMethods.bank.accountNumber}
                  </Text>
                </View>
                {paymentMethods.bank.routingOrSwift && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentRowLabel}>Routing / SWIFT</Text>
                    <Text style={styles.mono}>
                      {paymentMethods.bank.routingOrSwift}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {paymentMethods.link && (
              <View style={styles.paymentMethodBlock}>
                <Text style={styles.paymentMethodTitle}>
                  Pay via {paymentMethods.link.provider || "link"}
                </Text>
                <Text style={styles.mono}>{paymentMethods.link.url}</Text>
              </View>
            )}

            {paymentMethods.wallet && (
              <View style={styles.paymentMethodBlock}>
                <Text style={styles.paymentMethodTitle}>
                  Crypto ({getWalletNetworkLabel(paymentMethods.wallet.network)}
                  )
                </Text>
                <View style={styles.walletRow}>
                  <Text style={styles.mono}>
                    {paymentMethods.wallet.address}
                  </Text>
                  {paymentMethods.wallet.showQrCode && walletQrCodeDataUrl && (
                    <PdfImage
                      src={walletQrCodeDataUrl}
                      style={styles.qrImage}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Notes */}
        {notes && (
          <View style={styles.notes}>
            <Text>{notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
