"use client";

import * as React from "react";
import { RHFForm } from "./form";
import { RHFInput } from "./input";
import { RHFNumber } from "./number";
import { RHFTextArea } from "./textarea";
import { RHFCheckbox } from "./checkbox";
import { RHFSelect } from "./select";
import { RHFRadioGroup } from "./radio-group";
import { RHFCombobox } from "./combobox";
import { RHFSwitch } from "./switch";
import { RHFDatePicker } from "./date-picker";
import { RHFInputOTP } from "./input-otp";
import { type RHFItem } from "./types";
import { RHFTime } from "./time";
import { z } from "zod/v4";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Temporal } from "@js-temporal/polyfill";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  input: z.string().min(1, {
    error: "Value is required",
  }),
  number: z.number().min(1, {
    error: "Value is required",
  }),
  textarea: z.string().min(1, {
    error: "Value is required",
  }),
  checkbox: z.boolean().refine((val) => val === true, {
    error: "Value is required",
  }),
  switch: z.boolean().refine((val) => val === true, {
    error: "Value is required",
  }),
  checkboxGroup: z.string().array().min(1, {
    error: "Value is required",
  }),
  select: z.string().min(1, {
    error: "Value is required",
  }),
  radioGroup: z.string().min(1, {
    error: "Value is required",
  }),
  combobox: z.string().min(1, {
    error: "Value is required",
  }),
  datePicker: z.instanceof(Temporal.PlainDate, {
    error: "Value is required",
  }),
  inputOtp: z.string().length(6, {
    error: "Value is required",
  }),
  time: z.any(),
});

type FormData = z.infer<typeof formSchema>;

const sampleOptions: RHFItem[] = [
  { value: "option1", label: "First Option" },
  { value: "option2", label: "Second Option" },
  { value: "option3", label: "Third Option" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

const roleOptions: RHFItem[] = [
  { value: "admin", label: "Administrator" },
  { value: "user", label: "Regular User" },
  { value: "viewer", label: "Viewer Only", disabled: true },
];

const categoryOptions: RHFItem[] = [
  { value: "tech", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales", disabled: true },
];

export function RHFExample() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      number: 0,
      textarea: "",
      checkbox: false,
      switch: false,
      checkboxGroup: [],
      select: "",
      radioGroup: "",
      combobox: "",
      inputOtp: "",
      datePicker: Temporal.Now.plainDateISO(),
    },
  });

  const handleSubmit = (data: FormData) => {
    console.log(data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <RHFForm submitCallback={handleSubmit} {...form} showDebug>
      <div className="grid grid-cols-2 gap-6">
        {/* Basic Input Components */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold border-b pb-2">
            Basic Inputs
          </h2>
          <RHFInput
            name="input"
            label="Input"
            description="Input description"
            placeholder="Input placeholder..."
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
          <RHFNumber
            name="number"
            label="Number"
            description="Number description"
            isRequired
            variant="plusminus"
            formatOptions={{
              style: "currency",
              currency: "BRL",
              currencyDisplay: "symbol",
              currencySign: "standard",
            }}
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
          <RHFTextArea
            name="textarea"
            label="Text Area"
            description="Text area description"
            placeholder="Text area placeholder..."
            rows={4}
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
        </div>

        {/* Selection Components */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold border-b pb-2">
            Selection Components
          </h2>
          <RHFSelect
            name="select"
            label="Select"
            description="Select description"
            placeholder="Select placeholder..."
            items={sampleOptions}
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
              item: "text-pink-500",
            }}
          />
          <RHFCombobox
            name="combobox"
            label="Combobox"
            description="Combobox description"
            placeholder="Combobox placeholder..."
            searchPlaceholder="Busca..."
            emptyMessage="Nenhum item encontrado"
            items={categoryOptions}
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
              item: "text-pink-500",
            }}
          />
          <RHFRadioGroup
            name="radioGroup"
            label="Radio Group"
            description="Radio group description"
            items={roleOptions}
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
              item: "text-pink-500",
            }}
          />
        </div>

        {/* Boolean Components */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold border-b pb-2">
            Boolean Components
          </h2>
          <RHFCheckbox
            name="checkbox"
            label="Checkbox single"
            description="Checkbox single description"
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
          <RHFCheckbox
            name="checkboxGroup"
            label="Checkbox multiple"
            description="Checkbox multiple description"
            isRequired
            items={sampleOptions}
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
              item: "text-pink-500",
            }}
          />
          <RHFSwitch
            name="switch"
            label="Switch"
            description="Switch description"
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
        </div>

        {/* Advanced Components */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold border-b pb-2">
            Advanced Components
          </h2>
          <RHFDatePicker
            name="datePicker"
            label="DatePicker"
            description="DatePicker description"
            placeholder="DatePicker placeholder..."
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
          <RHFTime
            name="time"
            label="Time"
            description="Time description"
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
          <RHFInputOTP
            name="inputOtp"
            label="OTP"
            description="OTP description"
            maxLength={6}
            isRequired
            classNames={{
              wrapper: "border border-rose-500",
              label: "text-emerald-500",
              description: "text-orange-500",
              error: "text-purple-500",
            }}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset Form
        </Button>
        <Button type="submit">Submit Form</Button>
      </div>
    </RHFForm>
  );
}
