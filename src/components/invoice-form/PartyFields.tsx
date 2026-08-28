// components/invoice-form/PartyFields.tsx
"use client";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { Field, Section, TextArea, TextInput } from "./FormPrimitives";

export function BusinessInfoFields() {
  const business = useInvoiceStore((s) => s.invoice.business);
  const setBusinessInfo = useInvoiceStore((s) => s.setBusinessInfo);

  return (
    <Section
      index="01"
      title="From"
      description="Your business details, shown at the top of the invoice."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Business name" htmlFor="business-name">
          <TextInput
            id="business-name"
            value={business.name}
            onChange={(e) => setBusinessInfo({ name: e.target.value })}
            placeholder="Acme Studio"
          />
        </Field>
        <Field label="Email" htmlFor="business-email">
          <TextInput
            id="business-email"
            type="email"
            value={business.email}
            onChange={(e) => setBusinessInfo({ email: e.target.value })}
            placeholder="hello@acmestudio.com"
          />
        </Field>
        <Field
          label="Address"
          htmlFor="business-address"
          className="sm:col-span-2"
        >
          <TextArea
            id="business-address"
            rows={2}
            value={business.address}
            onChange={(e) => setBusinessInfo({ address: e.target.value })}
            placeholder="Street, city, country"
          />
        </Field>
      </div>
    </Section>
  );
}

export function ClientInfoFields() {
  const client = useInvoiceStore((s) => s.invoice.client);
  const setClientInfo = useInvoiceStore((s) => s.setClientInfo);

  return (
    <Section
      index="02"
      title="Bill to"
      description="Who this invoice is being sent to."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Client name" htmlFor="client-name">
          <TextInput
            id="client-name"
            value={client.name}
            onChange={(e) => setClientInfo({ name: e.target.value })}
            placeholder="Client or company name"
          />
        </Field>
        <Field label="Email" htmlFor="client-email">
          <TextInput
            id="client-email"
            type="email"
            value={client.email}
            onChange={(e) => setClientInfo({ email: e.target.value })}
            placeholder="client@company.com"
          />
        </Field>
        <Field
          label="Address"
          htmlFor="client-address"
          className="sm:col-span-2"
        >
          <TextArea
            id="client-address"
            rows={2}
            value={client.address}
            onChange={(e) => setClientInfo({ address: e.target.value })}
            placeholder="Street, city, country"
          />
        </Field>
      </div>
      {/* TODO (step 7): "saved clients" — autocomplete this section from past invoices */}
    </Section>
  );
}
