# Zod/v4 schema for each RHF component

## RHFAutocomplete

    **_type_**: React.Key (string | number | bigint)

    **_callback(onSelectionChange)_**: (key: React.Key) => void

    **_schema_** = z.union([z.string(), z.coerce.number<number>()])

## RHFCalendar

    **_type_**: MappedDateValue<DateValue> (MappedDateValue<CalendarDate | CalendarDateTime | ZonedDateTime>)

    **_callback(onChange)_**: (value: MappedDateValue) => void

    **_schema_** = z.union([
      z.instanceof(CalendarDate),
      z.instanceof(CalendarDateTime),
      z.instanceof(ZonedDateTime),
    ])

## RHFCalendarRange

    **_type_**: RangeValue<DateValue> | null (RangeValue<CalendarDate | CalendarDateTime | ZonedDateTime> | null)

    value: {start: DateValue, end: DateValue}

    **_callback(onChange)_**: (value: RangeValue<DateValue> | null) => void

    **_schema_** = z.object({
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

## RHFDatePicker

    **_type_**: DateValue (CalendarDate | CalendarDateTime | ZonedDateTime)

    **_callback(onChange)_**: (value: DateValue) => void

    **_schema_** = z.union([
        z.instanceof(CalendarDate),
        z.instanceof(CalendarDateTime),
        z.instanceof(ZonedDateTime),
    ])

## RHFDateTimePicker

    **_type_**: DateValue (CalendarDate | CalendarDateTime | ZonedDateTime)

    **_callback(onChange)_**: (value: ZonedDateTime | CalendarDate | CalendarDateTime) => void

    **_schema_** = z.union([
        z.instanceof(CalendarDate),
        z.instanceof(CalendarDateTime),
        z.instanceof(ZonedDateTime),
    ])

## RHFDateRangePicker

    **_type_**: RangeValue<DateValue> (RangeValue<CalendarDate | CalendarDateTime | ZonedDateTime>)

    value: {start: DateValue, end: DateValue}

    **_callback(onChange)_**: (value: RangeValue<DateValue>) => void

    **_schema_** = z.object({
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

## RHFInput

    **_type_**: string

    **_callback(onValueChange)_**: (value: string) => void

    **_schema_** = z.string()

## RHFInput

    **_type_**: string

    **_callback(onValueChange)_**: (value: string) => void

    **_schema_** = z.string()

## RHFSwitch

    **_type_**: number

    **_callback(onValueChange)_**: (value: number) => void

    **_schema_** = z.number()

## RHFSlider

    **_type_**: SliderValue (number | number[])

    **_callback(onChange)_**: (value: SliderValue) => void

    **_schema_** = z.number().array()

## RHFSwitch

    **_type_**: boolean

    **_callback(onValueChange)_**: (isSelected: boolean) => void

    **_schema_** = z.boolean()

## RHFTextarea

    **_type_**: string

    **_callback(onValueChange)_**: (value: string) => void

    **_schema_** = z.string()

## RHFCheckbox

    **_type_**: boolean

    **_callback(onValueChange)_**: (isSelected: boolean) => void

    **_schema_** = z.boolean()

## RHFRadio

    **_type_**: (string | number)[]

    **_callback(onValueChange)_**: (value: T) => void

    **_schema_** = z.union([z.string(), z.coerce.number<number>()]).array()

## RHFRadio

    **_type_**: string

    **_callback(onValueChange)_**: (value: string) => void

    **_schema_** = z.union([z.string(), z.coerce.number<number>()])

## RHFSelect

    **_type_**: (string | number)[]

    **_callback(onSelectionChange)_**: (keys: "all" | Set<React.Key> & {anchorKey?: string currentKey?: string}) => void

    **_schema_** = z.union([z.string(), z.coerce.number<number>()]).array()
