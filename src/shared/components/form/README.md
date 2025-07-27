## How to use

### Define `useForm` init

`const methods = useForm<ZodSchema>({
    resolver: zodResolver(zodSchema),
    defaultValues: {...}
});`

### Define submit callback

`const handleFormSubmit = (data: ZodSchema) => {...};`

### Create a `<RHFForm />` instance with form methods

```
<RHFForm submitCallback={handleFormSubmit} {...methods}>

    <RHFAutocomplete.Root<FormCreate> name="autocomplete" label="Autocomplete" >
        <RHFAutocomplete.Item key={1}>Item 1</RHFAutocomplete.Item>
        <RHFAutocomplete.Item key={2}>Item 2</RHFAutocomplete.Item>
        <RHFAutocomplete.Item key={3}>Item 3</RHFAutocomplete.Item>
    </RHFAutocomplete.Root>

    <RHFCalendar<FormCreate> name="calendar" />

    <RHFCheckbox<FormCreate> name="checkbox" />

    <RHFDateInput<FormCreate> name="dateInput" label="Date Input" />

    <RHFDatePicker<FormCreate> name="datePicker" label="Date Picker" />

    <RHFInput<FormCreate> name="input" label="Input" />

    <RHFNumber<FormCreate> name="number" label="Number" />

    <RHFSlider<FormCreate> name="slider" label="Slider" />

    <RHFSwitch<FormCreate> name="switch" />

    <RHFTextArea<FormCreate> name="textArea" label="Text Area" />

    <RHFCheckboxGroup.Root<FormCreate> name="checkboxGroup" label="Checkbox Group" >
        <RHFCheckboxGroup.Checkbox value="1">Item 1</RHFCheckboxGroup.Checkbox>
        <RHFCheckboxGroup.Checkbox value="2">Item 2</RHFCheckboxGroup.Checkbox>
        <RHFCheckboxGroup.Checkbox value="3">Item 3</RHFCheckboxGroup.Checkbox>
    </RHFCheckboxGroup.Root>

    <RHFRadioGroup.Root<FormCreate> name="radioGroup">
        <RHFRadioGroup.Radio value="1">Item 1</RHFRadioGroup.Radio>
        <RHFRadioGroup.Radio value="2">Item 2</RHFRadioGroup.Radio>
        <RHFRadioGroup.Radio value="3">Item 3</RHFRadioGroup.Radio>
    </RHFRadioGroup.Root>

    <RHFInputOtp<FormCreate> name="inputOtp" length={6} />

    <RHFDateRangePicker<FormCreate> name="dateRangePicker" />

    <RHFCalendarRange<FormCreate> name="calendarRange" />

    <RHFSelect.Root<FormCreate> name="select" >
        <RHFSelect.Item key={1}>Item 1</RHFSelect.Item>
        <RHFSelect.Item key={2}>Item 2</RHFSelect.Item>
        <RHFSelect.Item key={3}>Item 3</RHFSelect.Item>
    </RHFSelect.Root>
</RHFForm>
```

## Zod/v4 schema for each RHF component

### RHFAutocomplete

**_type_**

`React.Key (string | number | bigint)`

**_callback(onSelectionChange)_**

`(key: React.Key) => void`

**_schema_**

`z.union([z.string(), z.coerce.number<number>()])`

### RHFCalendar

**_type_**

`MappedDateValue<DateValue> (MappedDateValue<CalendarDate | CalendarDateTime | ZonedDateTime>)`

**_callback(onChange)_**

`(value: MappedDateValue) => void`

**_schema_**

```
z.union([
    z.instanceof(CalendarDate),
    z.instanceof(CalendarDateTime),
    z.instanceof(ZonedDateTime),
])
```

### RHFCalendarRange

**_type_**

`RangeValue<DateValue> | null (RangeValue<CalendarDate | CalendarDateTime | ZonedDateTime> | null)`

**_value_**

`{start: DateValue, end: DateValue}`

**_callback(onChange)_**

`(value: RangeValue<DateValue> | null) => void`

**_schema_**

```
z.object({
    start: z.union([
        z.instanceof(CalendarDate),
        z.instanceof(CalendarDateTime),
        z.instanceof(ZonedDateTime),
    ]),
    end: z.union([
        z.instanceof(CalendarDate),
        z.instanceof(CalendarDateTime),
        z.instanceof(ZonedDateTime),
    ]),
})
```

### RHFDateInput

**_type_**

`DateValue (CalendarDate | CalendarDateTime | ZonedDateTime)`

**_callback(onChange)_**

`(value: DateValue) => void`

**_schema_**

```
z.union([
    z.instanceof(CalendarDate),
    z.instanceof(CalendarDateTime),
    z.instanceof(ZonedDateTime),
])
```

### RHFDatePicker

**_type_**

`DateValue (CalendarDate | CalendarDateTime | ZonedDateTime)`

**_callback(onChange)_**

`(value: DateValue) => void`

**_schema_**

```
z.union([
    z.instanceof(CalendarDate),
    z.instanceof(CalendarDateTime),
    z.instanceof(ZonedDateTime),
])
```

### RHFDateRangePicker

**_type_**

`RangeValue<DateValue> (RangeValue<CalendarDate | CalendarDateTime | ZonedDateTime>)`

**_value_**

`{start: DateValue, end: DateValue}`

**_callback(onChange)_**

`(value: RangeValue<DateValue>) => void`

**_schema_**

```
z.object({
    start: z.union([
        z.instanceof(CalendarDate),
        z.instanceof(CalendarDateTime),
        z.instanceof(ZonedDateTime),
    ]),
    end: z.union([
        z.instanceof(CalendarDate),
        z.instanceof(CalendarDateTime),
        z.instanceof(ZonedDateTime),
    ]),
})
```

### RHFInput

**_type_**

`string`

**_callback(onValueChange)_**

`(value: string) => void`

**_schema_**

`z.string()`

### RHFInputOtp

**_type_**

`string`

**_callback(onValueChange)_**

`(value: string) => void`

**_schema_**

`z.string()`

### RHFNumber

**_type_**

`number`

**_callback(onValueChange)_**

`(value: number) => void`

**_schema_**

`z.number()`

### RHFSlider

**_type_**

`SliderValue (number | number[])`

**_callback(onChange)_**

`(value: SliderValue) => void`

**_schema_**

`z.number().array()`

### RHFSwitch

**_type_**

`boolean`

**_callback(onValueChange)_**

`(isSelected: boolean) => void`

**_schema_**

`z.boolean()`

### RHFTextarea

**_type_**

`string`

**_callback(onValueChange)_**

`(value: string) => void`

**_schema_**

`z.string()`

### RHFCheckbox

**_type_**

`boolean`

**_callback(onValueChange)_**

`(isSelected: boolean) => void`

**_schema_**

`z.boolean()`

### RHFCheckboxGroup

**_type_**

`(string | number)[]`

**_callback(onValueChange)_**

`(value: T) => void`

**_schema_**

`z.union([z.string(), z.coerce.number<number>()]).array()`

### RHFRadioGroup

**_type_**

`string`

**_callback(onValueChange)_**

`(value: string) => void`

**_schema_**

`z.union([z.string(), z.coerce.number<number>()])`

### RHFSelect

**_type_**

`(string | number)[]`

**_callback(onSelectionChange)_**

`(keys: "all" | Set<React.Key> & {anchorKey?: string currentKey?: string}) => void`

**_schema_**

`z.union([z.string(), z.coerce.number<number>()]).array()`
