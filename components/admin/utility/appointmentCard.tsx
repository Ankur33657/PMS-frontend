
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Video,
  UserRound,
} from "lucide-react";

type AppointmentStatus =
  | "COMPLETED"
  | "VIRTUAL"
  | "WAIT"
  | "IN SESSION"
  | "ONLINE";

type Appointment = {
  id: number;
  patient: string;
  age?: string;
  status: AppointmentStatus;
  detail: string;
  room?: string;
  start: string;
};

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  initials: string;
  color: string;
  patients: number;
  appointments: Appointment[];
};

const statusStyles: Record<AppointmentStatus, string> = {
  COMPLETED: "bg-slate-100 text-slate-600",
  VIRTUAL: "bg-blue-100 text-blue-700",
  WAIT: "bg-amber-100 text-amber-700",
  "IN SESSION": "bg-teal-100 text-teal-700",
  ONLINE: "bg-emerald-100 text-emerald-700",
};

const times = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30"
];

const START_MINUTES = 10 * 60;
const END_MINUTES = 20 * 60;
const HEADER_HEIGHT = 88;
const SLOT_HEIGHT = 130;

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Vance, MD",
    specialty: "Cardiology",
    initials: "SV",
    color: "bg-blue-100 text-blue-700",
    patients: 16,
    appointments: [
      {
        id: 101,
        patient: "Eleanor Vance",
        age: "62F",
        status: "COMPLETED",
        detail: "Routine Follow-up",
        room: "Pod 181",
        start: "10:00",
      },
      {
        id: 102,
        patient: "Warren Douglas",
        age: "58M",
        status: "COMPLETED",
        detail: "Post-Angioplasty Stent Follow-up",
        room: "Pod 182",
        start: "10:30",
      },
      {
        id: 103,
        patient: "Marcus Vance",
        age: "44M",
        status: "IN SESSION",
        detail: "Chest tightness with exertion",
        room: "Exam 124",
        start: "11:00",
      },
      {
        id: 104,
        patient: "Thomas Albright",
        age: "49M",
        status: "WAIT",
        detail: "New Patient Cardiology",
        room: "Lounge A",
        start: "11:30",
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Marcus Brody, MD",
    specialty: "Electrophysiology",
    initials: "MB",
    color: "bg-sky-100 text-sky-700",
    patients: 14,
    appointments: [
      {
        id: 201,
        patient: "Harold Finch",
        age: "71M",
        status: "COMPLETED",
        detail: "Pacemaker Interrogation",
        room: "Pod 184",
        start: "11:00",
      },
      {
        id: 202,
        patient: "Liam O'Connor",
        age: "39M",
        status: "VIRTUAL",
        detail: "Telehealth Follow-up",
        start: "11:30",
      },
      {
        id: 203,
        patient: "Evelyn Ross",
        age: "58F",
        status: "IN SESSION",
        detail: "Atrial Fibrillation Ablation Follow-up",
        room: "Pod 184",
        start: "12:00",
      },
      {
        id: 204,
        patient: "Nora Montgomery",
        age: "64F",
        status: "WAIT",
        detail: "Syncope Workup",
        room: "Lounge A",
        start: "12:30",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Anita Chen, MD",
    specialty: "Vascular Surgery",
    initials: "AC",
    color: "bg-teal-100 text-teal-700",
    patients: 12,
    appointments: [
      {
        id: 301,
        patient: "Carla Gomez",
        age: "45F",
        status: "COMPLETED",
        detail: "Pre-op Carotid Ultrasound",
        room: "Pod 187",
        start: "2:00",
      },
      {
        id: 302,
        patient: "Clinic Prep",
        status: "WAIT",
        detail: "Clinic Prep & Ward Rounds",
        start: "2:30",
      },
      {
        id: 303,
        patient: "George Bennett",
        age: "72M",
        status: "IN SESSION",
        detail: "Aortic Stent Graft Surveillance",
        room: "Duplex CT",
        start: "3:00",
      },
      {
        id: 304,
        patient: "Danielle Cooper",
        age: "41F",
        status: "ONLINE",
        detail: "Post-op Wound Image Review",
        room: "Room 3",
        start: "3:30",
      },
    ],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Internal Medicine",
    initials: "JW",
    color: "bg-violet-100 text-violet-700",
    patients: 18,
    appointments: [
      {
        id: 401,
        patient: "Arthur Day",
        status: "COMPLETED",
        detail: "Annual Health Exam",
        start: "2:00",
      },
      {
        id: 402,
        patient: "Mira Patel",
        status: "VIRTUAL",
        detail: "Virtual Follow-up",
        start: "11:30",
      },
      {
        id: 403,
        patient: "Lucas Kane",
        age: "31M",
        status: "IN SESSION",
        detail: "Intake Lab",
        start: "12:00",
      },
      {
        id: 404,
        patient: "Samir Khan",
        age: "51M",
        status: "WAIT",
        detail: "Diabetes Follow-up",
        start: "12:30",
      },
    ],
  },
    {
    id: 5,
    name: "Dr. Sarah Vance, MD",
    specialty: "Cardiology",
    initials: "SV",
    color: "bg-blue-100 text-blue-700",
    patients: 16,
    appointments: [
      {
        id: 101,
        patient: "Eleanor Vance",
        age: "62F",
        status: "COMPLETED",
        detail: "Routine Follow-up",
        room: "Pod 181",
        start: "10:00",
      },
      {
        id: 102,
        patient: "Warren Douglas",
        age: "58M",
        status: "COMPLETED",
        detail: "Post-Angioplasty Stent Follow-up",
        room: "Pod 182",
        start: "10:30",
      },
      {
        id: 103,
        patient: "Marcus Vance",
        age: "44M",
        status: "IN SESSION",
        detail: "Chest tightness with exertion",
        room: "Exam 124",
        start: "11:00",
      },
      {
        id: 104,
        patient: "Thomas Albright",
        age: "49M",
        status: "WAIT",
        detail: "New Patient Cardiology",
        room: "Lounge A",
        start: "11:30",
      },
    ],
  },
];

function AppointmentCard({
  appointment,
}: {
  appointment: Appointment;
}) {
  const active = appointment.status === "IN SESSION";

  return (
    <button
      type="button"
      onClick={() =>
        console.log("Selected appointment:", appointment.id)
      }
      className={`flex h-full w-full min-w-0 flex-col gap-2 overflow-hidden rounded-md border p-2 text-left transition hover:shadow-md ${
        active
          ? "border-teal-600 bg-teal-50/60"
          : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="break-words text-xs font-semibold leading-4 text-slate-800">
            {appointment.patient}
            {appointment.age && `, ${appointment.age}`}
          </p>

          {appointment.room && (
            <p className="mt-1 text-[10px] text-slate-500">
              {appointment.room}
            </p>
          )}
        </div>

        {appointment.status === "VIRTUAL" && (
          <Video className="h-3.5 w-3.5 shrink-0 text-blue-600" />
        )}
      </div>

      <span
        className={`w-fit max-w-full rounded-sm px-1.5 py-0.5 text-[9px] font-semibold ${
          statusStyles[appointment.status]
        }`}
      >
        {appointment.status}
      </span>

      <p className="line-clamp-3 break-words text-[11px] leading-4 text-slate-600">
        {appointment.detail}
      </p>
    </button>
  );
}

export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Track the browser's local time.
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());

    updateTime();

    const interval = window.setInterval(updateTime, 6*10_000);

    return () => window.clearInterval(interval);
  }, []);

  const shiftDate = (days: number) => {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    setSelectedDate(`${year}-${month}-${day}`);
  };

  // Calculate the current time in minutes since midnight.
  const currentMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  const minutesFromStart = currentMinutes - START_MINUTES;

  // Each 30-minute slot is exactly 130px high.
  const linePosition =
    (minutesFromStart / 30) * SLOT_HEIGHT;

  const today = [
    currentTime.getFullYear(),
    String(currentTime.getMonth() + 1).padStart(2, "0"),
    String(currentTime.getDate()).padStart(2, "0"),
  ].join("-");

  const showTimeLine =
    selectedDate === today &&
    currentMinutes >= START_MINUTES &&
    currentMinutes <= END_MINUTES;

  const allAppointments = doctors.flatMap(
    (doctor) => doctor.appointments
  );

  const visibleAppointments = allAppointments.filter(
    (appointment) =>
      selectedStatus === "ALL" ||
      appointment.status === selectedStatus
  );

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <section className="flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-xl bg-slate-50 p-4">
      {/* Toolbar */}
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Appointment Schedule
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage doctors and patient visits
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => shiftDate(-1)}
            aria-label="Previous day"
            className="rounded-lg border bg-white p-2 hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <label className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
            <CalendarDays className="h-4 w-4 text-slate-500" />
            <input
              aria-label="Schedule date"
              type="date"
              value={selectedDate}
              onChange={(event) =>
                setSelectedDate(event.target.value)
              }
              className="w-32 bg-transparent text-sm outline-none"
            />
          </label>

          <button
            type="button"
            onClick={() => shiftDate(1)}
            aria-label="Next day"
            className="rounded-lg border bg-white p-2 hover:bg-slate-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Summary */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-3">
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-blue-600" />
            <strong>{doctors.length}</strong> Doctors
          </span>

          <span className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-teal-600" />
            <strong>{visibleAppointments.length}</strong> Appointments
          </span>
        </div>

        <select
          aria-label="Filter appointments by status"
          value={selectedStatus}
          onChange={(event) =>
            setSelectedStatus(event.target.value)
          }
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="ALL">All statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="VIRTUAL">Virtual</option>
          <option value="WAIT">Waiting</option>
          <option value="IN SESSION">In session</option>
          <option value="ONLINE">Online</option>
        </select>
      </div>

      {/* Scrollable schedule */}
      <div className="min-h-0 flex-1 overflow-auto rounded-lg border bg-white">
        <div
          className="relative grid min-w-[900px] gap-px bg-slate-200"
          style={{
            gridTemplateColumns: `64px repeat(${doctors.length}, minmax(190px, 1fr))`,
          }}
        >
          {/* Current time line */}
          {showTimeLine && (
            <div
              className="pointer-events-none absolute left-0 right-0 z-40 border-t-2 border-red-500"
              style={{
                top: `${HEADER_HEIGHT + linePosition}px`,
              }}
            >
              <span className="absolute -left-0.5 -top-3 rounded-sm bg-red-500 px-1 py-0.5 text-[9px] font-bold text-white shadow-sm">
                {formattedTime} NOW
              </span>
            </div>
          )}

          {/* Fixed-height header */}
          <div className="sticky left-0 top-0 z-30 flex h-[88px] items-center justify-center bg-slate-100 p-2 text-[10px] font-semibold text-slate-500">
            TIME
          </div>

          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="sticky top-0 z-20 h-[88px] bg-white p-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${doctor.color}`}
                >
                  {doctor.initials}
                </div>

                <div className="min-w-0">
                  <h2 className="break-words text-xs font-bold text-slate-800">
                    {doctor.name}
                  </h2>

                  <p className="text-[10px] text-slate-500">
                    {doctor.specialty}
                  </p>

                  <p className="mt-1 text-[10px] text-blue-600">
                    {doctor.patients} patients
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Appointment rows */}
          {times.map((time) => (
            <div key={time} className="contents">
              <div className="sticky left-0 z-10 flex h-[130px] items-start justify-center bg-white p-2 pt-4 text-[11px] font-medium text-slate-500">
                {time}
              </div>

              {doctors.map((doctor) => {
                const appointment = doctor.appointments.find(
                  (item) =>
                    item.start === time &&
                    (selectedStatus === "ALL" ||
                      item.status === selectedStatus)
                );

                return (
                  <div
                    key={`${doctor.id}-${time}`}
                    className="h-[130px] min-w-0 bg-white p-1.5"
                  >
                    {appointment ? (
                      <AppointmentCard
                        appointment={appointment}
                      />
                    ) : (
                      <div className="h-full rounded-md border border-dashed border-slate-100 bg-slate-50/50" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
