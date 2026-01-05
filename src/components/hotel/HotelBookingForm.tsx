
import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

const hotelFormSchema = z.object({
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.string().min(1, "Number of guests is required"),
  rooms: z.string().min(1, "Number of rooms is required"),
  roomType: z.enum(["standard", "deluxe", "suite", "presidential"]),
});

export function HotelBookingForm() {
  const form = useForm({
    defaultValues: {
      checkIn: "",
      checkOut: "",
      guests: "1",
      rooms: "1",
      roomType: "standard" as "standard" | "deluxe" | "suite" | "presidential",
    },
    validators: {
      onSubmit: hotelFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Book Hotel:", value);
    },
  });

  return (
    <Card className="w-full max-w-md rounded-2xl border shadow-lg bg-white">
      <CardContent className="space-y-6 p-6">
        <h3 className="text-xl font-bold text-gray-900">Book Your Stay</h3>
        
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <form.Field
            name="checkIn"
            children={field => (
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check-In
                </FieldLabel>
                <Input
                  type="date"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className="rounded-lg"
                />
              </Field>
            )}
          />
          
          <form.Field
            name="checkOut"
            children={field => (
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check-Out
                </FieldLabel>
                <Input
                  type="date"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className="rounded-lg"
                />
              </Field>
            )}
          />
        </div>

        {/* Guests & Rooms */}
        <div className="grid grid-cols-2 gap-4">
          <form.Field
            name="guests"
            children={field => (
              <Field>
                <FieldLabel>Guests</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value: string) => field.handleChange(value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <form.Field
            name="rooms"
            children={field => (
              <Field>
                <FieldLabel>Rooms</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value: string) => field.handleChange(value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Room{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </div>

        {/* Room Type */}
        <form.Field
          name="roomType"
          children={field => (
            <Field>
              <FieldLabel>Room Type</FieldLabel>
              <Tabs
                value={field.state.value}
                onValueChange={(value: "standard" | "deluxe" | "suite" | "presidential") => 
                  field.handleChange(value)
                }
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 gap-2">
                  <TabsTrigger value="standard" className="text-sm py-2">
                    Standard
                  </TabsTrigger>
                  <TabsTrigger value="deluxe" className="text-sm py-2">
                    Deluxe
                  </TabsTrigger>
                  <TabsTrigger value="suite" className="text-sm py-2">
                    Suite
                  </TabsTrigger>
                  <TabsTrigger value="presidential" className="text-sm py-2">
                    Presidential
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Field>
          )}
        />

        {/* Book Button */}
        <Button
          className="w-full rounded-lg bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700"
          onClick={form.handleSubmit}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}