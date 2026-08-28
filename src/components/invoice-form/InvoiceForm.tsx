// components/invoice-form/InvoiceForm.tsx
"use client";

import { BusinessInfoFields, ClientInfoFields } from "./PartyFields";
import { LineItemsFields } from "./LineItemsFields";
import { InvoiceMetaFields } from "./InvoiceMetaFields";
import { PaymentMethodFields } from "./PaymentMethodFields";

export function InvoiceForm() {
  return (
    <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
      <BusinessInfoFields />
      <ClientInfoFields />
      <LineItemsFields />
      <InvoiceMetaFields />
      <PaymentMethodFields />
      {/* TODO (step 3): "Download PDF" button goes here once @react-pdf/renderer export is wired up */}
    </form>
  );
}
