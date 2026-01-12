import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Plane from "@/assets/plane.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchFlights } from "@/api/flight-booking/search-flights.ts";

const formSchema = z.object({
  type: z.enum(["round-trip", "one-way"]),
  from: z.string().min(3),
  to: z.string().min(3),
  departure_date: z.string(),
  passengers: z.string(),
});

export function FlightBookingForm() {
  const form = useForm({
    defaultValues: {
      type: "round-trip",
      from: "",
      to: "",
      departure_date: "",
      passengers: "1",
    },
    validators: {
      onBlur: formSchema,
      onSubmit: formSchema,
    },

    onSubmit: ({ value }) => {
      const payload = { ...value, passengers: Number(value.passengers) };
      searchFlights(payload);
    },
    // onSubmit: ({ value }) => {
    //   console.log("Search Flights:", value);
    //   searchFlights(value);
    // },
  });

  return (
    <div className="flex w-full items-center justify-center p-4 flex-column gap-30">
      <div className="hidden sm:flex">
        <img
          src={Plane}
          alt="plane"
        />
      </div>
      <Card className="w-full max-w-md rounded-2xl border-none shadow-none bg-transparent">
        <CardContent className="space-y-8 p-0">
          {/* Trip Type */}
          <form.Field
            name="type"
            children={field => (
              <Tabs
                value={field.state.value}
                onValueChange={v => field.handleChange(v as string)}
              >
                <TabsList className="grid grid-cols-3 rounded-full bg-color-none gap-5">
                  <TabsTrigger
                    value="round-trip"
                    className="rounded-full bg-muted data-[state=active]:bg-green-50 data-[state=active]:text-blue-600 p-4"
                  >
                    🔄 Round Trip
                  </TabsTrigger>

                  <TabsTrigger
                    value="one-way"
                    className="rounded-full bg-muted data-[state=active]:bg-green-50 data-[state=active]:text-blue-600 p-4"
                  >
                    ➡ One Way
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          />

          {/* Location */}
          <form.Field
            name="from"
            children={field => (
              <Field>
                <FieldLabel>Location</FieldLabel>
                <Input
                  placeholder="Montreal, Canada"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="rounded-sm"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          {/* Destination */}
          <form.Field
            name="to"
            children={field => (
              <Field>
                <FieldLabel>Destination</FieldLabel>
                <Input
                  placeholder="Tokyo, Japan"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="rounded-sm"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="departure_date"
              children={field => (
                <Field>
                  <FieldLabel>Departure</FieldLabel>
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    className="rounded-sm"
                  />
                </Field>
              )}
            />
          </div>

          {/* Passengers */}
          <form.Field
            name="passengers"
            children={field => (
              <Field>
                <FieldLabel>Passenger</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="rounded-sm">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* Button */}
          <Button
            className="w-full rounded-sm bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700"
            onClick={form.handleSubmit}
          >
            Search Flights
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
