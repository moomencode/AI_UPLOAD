"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/button";
import { FormField, Input, Select, Textarea } from "@/components/form";
import { Icon } from "@/components/icon";

export interface ReservationSectionProps {
  whatsappNumber?: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party: string;
  specialRequests: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
}

const defaultForm: FormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  party: "2",
  specialRequests: "",
};

const partyOptions = Array.from({ length: 10 }, (_, i) => i + 1);

export function ReservationSection({
  whatsappNumber = "+15551234567",
  className = "",
}: ReservationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const waNumber = whatsappNumber.replace(/[^0-9]/g, "");

  useEffect(() => {
    const el = sectionRef.current;
    if (el === null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting === true) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors] !== undefined) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const validate = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (form.email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^[0-9\s\-+()]{7,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (form.date === "") {
      newErrors.date = "Please select a date.";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(`${form.date}T00:00:00`);
      if (selected < today) {
        newErrors.date = "Date must be today or later.";
      }
    }

    if (form.time === "") {
      newErrors.time = "Please select a time.";
    }

    return newErrors;
  }, [form]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);

      const lines = [
        "Hi Garcia! I'd like to make a reservation:",
        "",
        `Name: ${form.name}`,
        `Email: ${form.email || "Not provided"}`,
        `Phone: ${form.phone}`,
        `Date: ${form.date}`,
        `Time: ${form.time}`,
        `Party: ${form.party} ${form.party === "1" ? "guest" : "guests"}`,
      ];

      if (form.specialRequests.trim() !== "") {
        lines.push(`Special Requests: ${form.specialRequests.trim()}`);
      }

      const message = encodeURIComponent(lines.join("\n"));

      window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank", "noopener,noreferrer");

      setIsSubmitting(false);
    },
    [form, validate, waNumber],
  );

  return (
    <section
      ref={sectionRef}
      className={`reservation section ${className}`}
      aria-labelledby="reservation-heading"
      id="reservations"
    >
      <div className="content-wrapper">
        <header
          className={`reservation-header ${hasEntered ? "reservation-header-enter-active" : "reservation-header-enter"}`}
        >
          <h2 id="reservation-heading" className="heading-1">
            Reserve Your Table
          </h2>
          <p
            className="body-base"
            style={{ color: "var(--garcia-text-secondary)", marginTop: "var(--garcia-spacing-3)" }}
          >
            Experience an unforgettable evening at Garcia.
          </p>
        </header>

        <div className="reservation-grid">
          <div
            className={`reservation-form-card ${hasEntered ? "reservation-card-enter-active" : "reservation-card-enter"}`}
            style={{ animationDelay: hasEntered ? "150ms" : "0ms" }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div className="reservation-form-fields">
                <FormField
                  label="Name"
                  required
                  state={errors.name !== undefined ? "error" : undefined}
                  error={errors.name}
                >
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </FormField>

                <FormField
                  label="Email"
                  state={errors.email !== undefined ? "error" : undefined}
                  error={errors.email}
                  helperText="Optional — for confirmation"
                >
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </FormField>

                <FormField
                  label="Phone"
                  required
                  state={errors.phone !== undefined ? "error" : undefined}
                  error={errors.phone}
                >
                  <Input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                  />
                </FormField>

                <div className="reservation-row">
                  <FormField
                    label="Date"
                    required
                    state={errors.date !== undefined ? "error" : undefined}
                    error={errors.date}
                  >
                    <Input type="date" name="date" value={form.date} onChange={handleChange} />
                  </FormField>

                  <FormField
                    label="Time"
                    required
                    state={errors.time !== undefined ? "error" : undefined}
                    error={errors.time}
                  >
                    <Input type="time" name="time" value={form.time} onChange={handleChange} />
                  </FormField>

                  <FormField label="Party" required>
                    <Select name="party" value={form.party} onChange={handleChange}>
                      {partyOptions.map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                </div>

                <FormField label="Special Requests">
                  <Textarea
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    placeholder="Allergies, seating preferences, special occasions…"
                    rows={3}
                  />
                </FormField>
              </div>

              <div className="reservation-submit">
                <Button type="submit" size="lg" icon="whatsapp" loading={isSubmitting}>
                  Confirm Reservation
                </Button>
                <p className="reservation-submit-note">
                  You&rsquo;ll confirm via WhatsApp &mdash; no payment required.
                </p>
              </div>
            </form>
          </div>

          <div
            className={`reservation-info ${hasEntered ? "reservation-card-enter-active" : "reservation-card-enter"}`}
            role="complementary"
            aria-label="Restaurant information"
            style={{ animationDelay: hasEntered ? "300ms" : "0ms" }}
          >
            <div className="reservation-info-content">
              <h3 className="reservation-info-heading">We Look Forward to Serving You</h3>
              <p className="reservation-info-text">
                Every reservation is an opportunity to create a memorable experience. Our team
                ensures every detail is attended to, from dietary preferences to seating
                arrangements.
              </p>

              <hr className="reservation-info-divider" />

              <div className="reservation-info-details">
                <div className="reservation-info-item">
                  <Icon name="info" size={16} />
                  <div>
                    <span className="reservation-info-label">Hours</span>
                    <span className="reservation-info-value">Mon–Sun: 5:00 PM – 11:00 PM</span>
                  </div>
                </div>
                <div className="reservation-info-item">
                  <Icon name="whatsapp" size={16} />
                  <div>
                    <span className="reservation-info-label">Contact</span>
                    <span className="reservation-info-value">{whatsappNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
