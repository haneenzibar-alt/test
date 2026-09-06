"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosDelete, axiosGet, axiosPost } from "@/lib/axios";
import type { Appointment, Nutritionist } from "./data";

const CLIENT_USER_ID = "123";

const areaFilters = [
  { id: "all", label: "All Areas" },
  { id: "tripoli", label: "Tripoli" },
  { id: "beirut", label: "Beirut" },
];

function formatRate(hourlyRate: number | null): string | null {
  if (hourlyRate === null) return null;
  return `$${hourlyRate}/hour`;
}

function formatAppointmentTime(value: string): string {
  return new Date(value).toLocaleString();
}

export default function NutritionistsPage() {
  const queryClient = useQueryClient();
  const [areaFilter, setAreaFilter] = useState("all");
  const [selectedNutritionist, setSelectedNutritionist] =
    useState<Nutritionist | null>(null);
  const [actionMessage, setActionMessage] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingValues, setBookingValues] = useState({
    scheduledAt: "",
    duration: "30",
    notes: "",
  });
  const [bookingError, setBookingError] = useState("");

  const {
    data: nutritionists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["nutritionists"],
    queryFn: () => axiosGet<Nutritionist[]>("/nutritionists"),
  });

  const {
    data: appointments,
    isLoading: appointmentsLoading,
  } = useQuery({
    queryKey: ["appointments", CLIENT_USER_ID],
    queryFn: () =>
      axiosGet<Appointment[]>(`/appointments?clientId=${CLIENT_USER_ID}`),
    enabled: Boolean(selectedNutritionist),
  });

  const selectedAppointments =
    appointments?.filter(
      (appointment) =>
        appointment.nutritionistId === selectedNutritionist?.user.id,
    ) ?? [];

  const refreshAppointments = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["appointments", CLIENT_USER_ID],
    });
  };

  const bookMutation = useMutation({
    mutationFn: (values: {
      nutritionistId: string;
      scheduledAt: string;
      duration: number;
      notes?: string;
    }) =>
      axiosPost<
        {
          clientId: string;
          nutritionistId: string;
          scheduledAt: string;
          duration: number;
          notes?: string;
        },
        Appointment
      >("/appointments", {
        clientId: CLIENT_USER_ID,
        nutritionistId: values.nutritionistId,
        scheduledAt: values.scheduledAt,
        duration: values.duration,
        notes: values.notes,
      }),
    onSuccess: async () => {
      setShowBookingForm(false);
      setBookingValues({ scheduledAt: "", duration: "30", notes: "" });
      setBookingError("");
      setActionMessage("Appointment booked successfully.");
      await refreshAppointments();
    },
    onError: () => {
      setBookingError("Unable to book appointment. Please try again.");
    },
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: (id: string) => axiosDelete<Appointment>(`/appointments/${id}`),
    onSuccess: async () => {
      setActionMessage("Appointment cancelled.");
      await refreshAppointments();
    },
    onError: () => {
      setActionMessage("Unable to cancel appointment. Please try again.");
    },
  });

  if (selectedNutritionist) {
    const name = selectedNutritionist.user.name ?? "Nutritionist";
    const rate = formatRate(selectedNutritionist.hourlyRate);

    return (
      <div className="min-h-full bg-[#fafaf7]">
        <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-10 md:px-6 md:py-12">
          <div className="mx-auto w-full max-w-2xl">
            <button
              type="button"
              onClick={() => {
                setSelectedNutritionist(null);
                setActionMessage("");
                setShowBookingForm(false);
                setBookingError("");
              }}
              className="text-sm font-medium text-emerald-100"
            >
              ← Back to Nutritionists
            </button>
            <h1 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Verified Nutritionists
            </h1>
          </div>
        </section>

        <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-64 bg-emerald-900">
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-[#1a5c38] px-3 py-1 text-xs font-semibold text-white">
                ✓ Verified
              </span>
              <div className="absolute right-4 bottom-4 left-4 text-white">
                <h2 className="font-serif text-2xl font-bold">{name}</h2>
                <p className="mt-1 text-sm text-white/85">
                  {selectedNutritionist.specialty}
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6">
              {rate && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-xl border border-gray-200 bg-[#fafaf7] p-3 text-center">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Price
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {rate}
                    </p>
                  </div>
                </div>
              )}

              {selectedNutritionist.bio && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    About
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {selectedNutritionist.bio}
                  </p>
                </div>
              )}

              {selectedNutritionist.availability && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Availability
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {selectedNutritionist.availability}
                  </p>
                </div>
              )}

              {selectedNutritionist.credentials.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Credentials
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedNutritionist.credentials.map((credential) => (
                      <span
                        key={credential}
                        className="rounded-full bg-[#dcf0e5] px-3 py-1 text-xs font-medium text-[#1a5c38]"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingForm((current) => !current);
                    setBookingError("");
                    setActionMessage("");
                  }}
                  className="rounded-xl bg-[#1a5c38] px-4 py-3 text-sm font-semibold text-white"
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActionMessage(`Contact for ${name} is not connected yet.`)
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800"
                >
                  Contact
                </button>
              </div>

              {showBookingForm && (
                <form
                  className="mt-4 rounded-xl border border-gray-100 bg-[#fafaf7] p-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setBookingError("");
                    const scheduledAt = new Date(bookingValues.scheduledAt);
                    if (Number.isNaN(scheduledAt.getTime())) {
                      setBookingError("Please choose a valid date and time.");
                      return;
                    }
                    bookMutation.mutate({
                      nutritionistId: selectedNutritionist.user.id,
                      scheduledAt: scheduledAt.toISOString(),
                      duration: Number(bookingValues.duration) || 30,
                      notes: bookingValues.notes.trim() || undefined,
                    });
                  }}
                >
                  <p className="text-sm font-semibold text-[#1a5c38]">
                    Book Appointment
                  </p>
                  <label className="mt-3 block text-sm text-gray-700">
                    Date & Time
                    <input
                      type="datetime-local"
                      required
                      value={bookingValues.scheduledAt}
                      onChange={(event) =>
                        setBookingValues((current) => ({
                          ...current,
                          scheduledAt: event.target.value,
                        }))
                      }
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="mt-3 block text-sm text-gray-700">
                    Duration
                    <input
                      type="number"
                      min="15"
                      step="15"
                      required
                      value={bookingValues.duration}
                      onChange={(event) =>
                        setBookingValues((current) => ({
                          ...current,
                          duration: event.target.value,
                        }))
                      }
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="mt-3 block text-sm text-gray-700">
                    Notes
                    <textarea
                      value={bookingValues.notes}
                      onChange={(event) =>
                        setBookingValues((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                      rows={2}
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  {bookingError && (
                    <p className="mt-3 text-sm text-red-600">{bookingError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={bookMutation.isPending}
                    className="mt-4 rounded-xl bg-[#1a5c38] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {bookMutation.isPending ? "Booking..." : "Confirm booking"}
                  </button>
                </form>
              )}

              {actionMessage && (
                <p className="mt-3 text-sm text-[#1a5c38]">{actionMessage}</p>
              )}

              <section className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  My Appointments
                </h3>
                {appointmentsLoading && (
                  <p className="mt-3 text-sm text-gray-500">
                    Loading appointments...
                  </p>
                )}
                {!appointmentsLoading && selectedAppointments.length === 0 && (
                  <p className="mt-3 text-sm text-gray-500">
                    No appointments with this nutritionist yet.
                  </p>
                )}
                {!appointmentsLoading && selectedAppointments.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {selectedAppointments.map((appointment) => (
                      <li
                        key={appointment.id}
                        className="rounded-xl border border-gray-100 bg-[#fafaf7] p-4 text-sm text-gray-700"
                      >
                        <p>{formatAppointmentTime(appointment.scheduledAt)}</p>
                        <p className="mt-1">{appointment.duration} minutes</p>
                        <p className="mt-1">Status: {appointment.status}</p>
                        {appointment.notes && (
                          <p className="mt-1">{appointment.notes}</p>
                        )}
                        {(appointment.status === "PENDING" ||
                          appointment.status === "CONFIRMED") && (
                          <button
                            type="button"
                            onClick={() =>
                              cancelAppointmentMutation.mutate(appointment.id)
                            }
                            className="mt-3 rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                          >
                            Cancel Appointment
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#fafaf7]">
      <section className="bg-linear-to-br from-emerald-900 to-emerald-800 px-4 py-10 md:px-6 md:py-12">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Verified Nutritionists
          </h1>
          <p className="mt-2 text-emerald-100">
            Certified professionals near you
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {areaFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setAreaFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  areaFilter === filter.id
                    ? "bg-white text-[#1a5c38]"
                    : "border border-white/30 bg-white/10 text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
        {isLoading && (
          <p className="text-center text-sm text-gray-500">
            Loading nutritionists...
          </p>
        )}

        {isError && (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <p className="text-gray-700">
              Unable to load nutritionists. Please try again.
            </p>
          </section>
        )}

        {!isLoading &&
          !isError &&
          nutritionists &&
          nutritionists.length === 0 && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-gray-700">
                No nutritionists are available yet.
              </p>
            </section>
          )}

        {!isLoading &&
          !isError &&
          nutritionists &&
          nutritionists.length > 0 &&
          areaFilter !== "all" && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-gray-700">
                No nutritionists found in this area.
              </p>
              <button
                type="button"
                onClick={() => setAreaFilter("all")}
                className="mt-4 rounded-xl bg-[#1a5c38] px-4 py-2 text-sm font-semibold text-white"
              >
                Show All Areas
              </button>
            </section>
          )}

        {!isLoading &&
          !isError &&
          nutritionists &&
          nutritionists.length > 0 &&
          areaFilter === "all" && (
            <div className="space-y-4">
              {nutritionists.map((nutritionist) => {
                const name = nutritionist.user.name ?? "Nutritionist";
                const rate = formatRate(nutritionist.hourlyRate);

                return (
                  <button
                    key={nutritionist.id}
                    type="button"
                    onClick={() => setSelectedNutritionist(nutritionist)}
                    className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-semibold text-[#1a5c38]">
                        {name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="font-serif text-lg font-bold text-gray-900">
                            {name}
                          </h2>
                          <span className="shrink-0 rounded-full bg-[#dcf0e5] px-2 py-1 text-xs font-semibold text-[#1a5c38]">
                            ✓
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {nutritionist.specialty}
                        </p>
                        {nutritionist.availability && (
                          <p className="mt-1 text-sm text-gray-500">
                            {nutritionist.availability}
                          </p>
                        )}
                        {rate && (
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                            <span>{rate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}
