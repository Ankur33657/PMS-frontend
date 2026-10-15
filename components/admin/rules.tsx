"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  FileText,
  HeartPulse,
  Info,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Syringe,
  UserRound,
  X,
} from "lucide-react";

type RuleItem = {
  id: string;
  title: string;
  description: string;
  critical?: boolean;
};

type RuleSection = {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof ShieldCheck;
  items: RuleItem[];
};

const ruleSections: RuleSection[] = [
  {
    id: "identity",
    title: "Patient identification & consent",
    subtitle: "Complete before assessment, medication, testing, or a procedure.",
    icon: UserRound,
    items: [
      {
        id: "id-two-identifiers",
        title: "Verify identity using two approved identifiers",
        description:
          "For example, full name and date of birth or medical record number. Do not use room or bed number as an identifier.",
        critical: true,
      },
      {
        id: "id-wristband",
        title: "Check patient identification band and record",
        description:
          "Resolve any mismatch before proceeding. Follow the facility process for patients who cannot identify themselves.",
        critical: true,
      },
      {
        id: "id-explain",
        title: "Explain the care, test, or procedure in understandable language",
        description:
          "Check understanding and provide an interpreter or communication aid when needed.",
      },
      {
        id: "id-consent",
        title: "Confirm valid consent when required",
        description:
          "Document consent according to facility policy. Consent does not replace clinical assessment or a required time-out.",
        critical: true,
      },
      {
        id: "id-privacy",
        title: "Protect privacy and confidentiality",
        description:
          "Use appropriate draping, a private discussion area, and approved access to patient records.",
      },
    ],
  },
  {
    id: "assessment",
    title: "Initial safety assessment",
    subtitle: "Assess current condition and identify risks before routine care.",
    icon: HeartPulse,
    items: [
      {
        id: "assess-airway",
        title: "Assess immediate clinical stability",
        description:
          "Look for airway or breathing difficulty, severe bleeding, altered consciousness, or other signs of deterioration.",
        critical: true,
      },
      {
        id: "assess-vitals",
        title: "Measure and document observations as indicated",
        description:
          "Common observations include blood pressure, pulse, respiratory rate, temperature, oxygen saturation, pain, and level of consciousness. Select measurements according to clinical need and local protocol.",
      },
      {
        id: "assess-allergy",
        title: "Check allergies and previous adverse reactions",
        description:
          "Verify the record and ask the patient or caregiver when possible. Record the reaction and distinguish unknown status from no known allergy.",
        critical: true,
      },
      {
        id: "assess-history",
        title: "Review relevant history and current medicines",
        description:
          "Consider diagnoses, recent procedures, anticoagulants, pregnancy possibility when relevant, implants, and previous reactions.",
      },
      {
        id: "assess-falls",
        title: "Assess falls, mobility, pressure-injury, and infection risks",
        description:
          "Use the facility's approved risk-assessment tools and put appropriate precautions in place.",
      },
      {
        id: "assess-escalation",
        title: "Escalate abnormal observations or clinical concern",
        description:
          "Follow the local early-warning and emergency-response pathway. Do not delay urgent care to complete a routine checklist.",
        critical: true,
      },
    ],
  },
  {
    id: "infection",
    title: "Infection prevention & environment",
    subtitle: "Use standard precautions for every patient and task-based precautions as indicated.",
    icon: ShieldCheck,
    items: [
      {
        id: "inf-hand-hygiene",
        title: "Perform hand hygiene at the appropriate moments",
        description:
          "Follow current facility guidance before and after patient contact and aseptic tasks, and after exposure risk.",
        critical: true,
      },
      {
        id: "inf-ppe",
        title: "Select and use appropriate PPE",
        description:
          "Choose gloves, gown, mask, eye protection, or other PPE according to anticipated exposure and transmission-based precautions.",
      },
      {
        id: "inf-equipment",
        title: "Check equipment cleanliness and function",
        description:
          "Use reprocessed equipment only when released for use; clean shared equipment between patients according to policy.",
        critical: true,
      },
      {
        id: "inf-aseptic",
        title: "Maintain aseptic technique where required",
        description:
          "Check packaging integrity, expiry, sterility indicators where applicable, and the condition of the sterile field.",
        critical: true,
      },
      {
        id: "inf-sharps",
        title: "Dispose of sharps and clinical waste safely",
        description:
          "Use approved containers and segregation procedures. Never recap a used needle unless an approved safety procedure specifically requires it.",
      },
      {
        id: "inf-environment",
        title: "Prepare a safe environment",
        description:
          "Ensure adequate lighting, clean surfaces, safe access, working call bell, and emergency equipment appropriate to the setting.",
      },
    ],
  },
  {
    id: "medication",
    title: "Medication safety",
    subtitle: "For authorized personnel administering or checking medicines.",
    icon: Syringe,
    items: [
      {
        id: "med-order",
        title: "Confirm a complete, authorized medication order",
        description:
          "Clarify missing, illegible, unusual, or conflicting instructions with the authorized prescriber before administration.",
        critical: true,
      },
      {
        id: "med-rights",
        title: "Use the facility's medication-administration checks",
        description:
          "Verify the patient, medicine, dose, route, time, documentation, indication, and other checks required by local policy.",
        critical: true,
      },
      {
        id: "med-allergy",
        title: "Recheck allergies, contraindications, and interactions",
        description:
          "Check relevant observations, laboratory results, weight-based calculations, and renal or hepatic considerations when applicable.",
        critical: true,
      },
      {
        id: "med-label",
        title: "Check label, concentration, expiry, and integrity",
        description:
          "Use approved storage and preparation processes. Label prepared medicines and syringes according to policy.",
      },
      {
        id: "med-double",
        title: "Obtain an independent double-check when required",
        description:
          "Apply local requirements for high-alert medicines and other designated medicines; a double-check does not replace individual accountability.",
      },
      {
        id: "med-document",
        title: "Document administration and monitor response",
        description:
          "Record omissions or refusals with reasons and monitor for therapeutic effect or adverse reactions.",
      },
    ],
  },
  {
    id: "tests",
    title: "Basic tests & specimen collection",
    subtitle: "Use only tests indicated by an authorized clinical plan and local procedure.",
    icon: ClipboardList,
    items: [
      {
        id: "test-order",
        title: "Verify the test request and clinical indication",
        description:
          "Confirm the requested test, specimen, timing, preparation, and any required fasting or medication instructions.",
        critical: true,
      },
      {
        id: "test-id",
        title: "Identify the patient and label specimens at collection",
        description:
          "Use the required identifiers and label at the point of collection in the patient's presence according to policy.",
        critical: true,
      },
      {
        id: "test-equipment",
        title: "Check test equipment and quality-control status",
        description:
          "Follow manufacturer instructions, calibration and quality-control requirements, and point-of-care testing authorization.",
      },
      {
        id: "test-specimen",
        title: "Collect, store, and transport the correct specimen",
        description:
          "Use the correct container, volume, technique, infection precautions, and transport conditions.",
      },
      {
        id: "test-results",
        title: "Review and escalate critical or unexpected results",
        description:
          "Document results and communication. Follow the approved critical-result escalation pathway and do not rely on an unreviewed result.",
        critical: true,
      },
    ],
  },
  {
    id: "procedure",
    title: "Procedure & equipment safety",
    subtitle: "For invasive procedures, use the full procedure-specific checklist.",
    icon: Stethoscope,
    items: [
      {
        id: "proc-site",
        title: "Confirm the correct procedure, patient, and site",
        description:
          "Mark the site when applicable and required. Resolve discrepancies before starting.",
        critical: true,
      },
      {
        id: "proc-timeout",
        title: "Complete a team time-out immediately before the procedure",
        description:
          "Confirm patient, procedure, site, consent, relevant images, equipment, and anticipated risks with the team as required.",
        critical: true,
      },
      {
        id: "proc-equipment",
        title: "Check equipment, accessories, and alarms",
        description:
          "Verify suitability, function, electrical safety where relevant, alarm settings, and availability of backup equipment.",
      },
      {
        id: "proc-monitor",
        title: "Confirm monitoring and emergency readiness",
        description:
          "Ensure monitoring and emergency support are appropriate for the patient's condition and procedure.",
      },
      {
        id: "proc-after",
        title: "Complete post-procedure checks and handover",
        description:
          "Assess the patient, document the procedure, label specimens, provide recovery instructions, and communicate outstanding risks.",
      },
    ],
  },
  {
    id: "documentation",
    title: "Documentation & handover",
    subtitle: "Keep the record accurate, timely, and traceable.",
    icon: FileText,
    items: [
      {
        id: "doc-record",
        title: "Record assessment, care, results, and decisions promptly",
        description:
          "Use the approved patient record. Include date, time, author identity, and relevant findings.",
      },
      {
        id: "doc-handover",
        title: "Provide a structured handover",
        description:
          "Communicate current condition, risks, allergies, pending tests, medicines, escalation plan, and next actions.",
      },
      {
        id: "doc-understanding",
        title: "Confirm instructions and follow-up arrangements",
        description:
          "Use teach-back where appropriate and document patient or caregiver understanding and follow-up needs.",
      },
      {
        id: "doc-incident",
        title: "Report incidents, near misses, and hazards",
        description:
          "Make the patient safe first, notify the responsible team, and use the facility's incident-reporting process.",
      },
    ],
  },
];

const sectionDescriptions: Record<string, string> = {
  identity: "Patient identity, consent, and privacy",
  assessment: "Stability, observations, allergies, and risks",
  infection: "Hand hygiene, PPE, equipment, and environment",
  medication: "Medication order and administration checks",
  tests: "Test request, specimen, equipment, and results",
  procedure: "Procedure time-out, equipment, and recovery",
  documentation: "Records, handover, and incident reporting",
};

export default function PatientSafetyRulesPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    identity: true,
    assessment: true,
  });
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("all");
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [encounterType, setEncounterType] = useState("Initial assessment");
  const [showFinalize, setShowFinalize] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [notice, setNotice] = useState("");

  const allItems = ruleSections.flatMap((section) =>
    section.items.map((item) => ({ ...item, sectionId: section.id }))
  );
  const criticalItems = allItems.filter((item) => item.critical);
  const completedCount = allItems.filter((item) => checked[item.id]).length;
  const criticalComplete = criticalItems.every((item) => checked[item.id]);
  const progress = Math.round((completedCount / allItems.length) * 100);

  const visibleSections = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ruleSections
      .filter((section) => activeSection === "all" || section.id === activeSection)
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const matchesSearch =
            !query ||
            `${item.title} ${item.description} ${section.title}`
              .toLowerCase()
              .includes(query);
          return matchesSearch && (!showCriticalOnly || item.critical);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [search, activeSection, showCriticalOnly]);

  const toggleItem = (id: string, value: boolean) => {
    setChecked((current) => ({ ...current, [id]: value }));
    setFinalized(false);
  };

  const resetChecklist = () => {
    setChecked({});
    setFinalized(false);
    setNotice("Checklist reset. Start a new review when ready.");
  };

  const finalizeChecklist = () => {
    if (!patientName.trim() || !patientId.trim() || !reviewer.trim()) {
      setNotice("Enter the patient name, patient ID, and reviewer before completing the checklist.");
      setShowFinalize(false);
      return;
    }

    if (!criticalComplete) {
      setNotice("Complete all critical safety checks before signing off, or follow your facility's documented exception and escalation process.");
      setShowFinalize(false);
      return;
    }

    if (completedCount !== allItems.length) {
      setNotice("Some checklist items remain incomplete. Review them before sign-off.");
      setShowFinalize(false);
      return;
    }

    setFinalized(true);
    setShowFinalize(false);
    setNotice("Checklist marked complete for this demo session.");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Heading */}
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Clinical Operations</span>
              <span>/</span>
              <span className="font-medium text-emerald-700">Patient Safety Rules</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Patient Safety & Procedure Checklist
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              A structured safety reminder for patient identification, initial assessment,
              infection prevention, medication checks, basic tests, procedures, and handover.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={resetChecklist}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Reset checklist
            </button>
            <button
              type="button"
              onClick={() => setShowFinalize(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <BadgeCheck className="h-4 w-4" />
              Review & sign off
            </button>
          </div>
        </header>

        {notice && (
          <div
            role="status"
            className="flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          >
            <span className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {notice}
            </span>
            <button type="button" onClick={() => setNotice("")} aria-label="Dismiss notice">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {finalized && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
            <div>
              <p className="font-semibold text-emerald-900">Checklist completed</p>
              <p className="mt-1 text-sm text-emerald-800">
                {patientName} · {patientId} · Reviewed by {reviewer}. This demo does not save a permanent clinical record.
              </p>
            </div>
          </div>
        )}

        {/* Safety disclaimer */}
        <section className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div className="space-y-1">
            <h2 className="font-semibold text-amber-950">Use alongside approved clinical protocols</h2>
            <p className="text-sm leading-6 text-amber-900">
              This is a general checklist template, not a clinical decision tool or a substitute for
              training, professional judgment, emergency response, manufacturer instructions, or your
              facility's approved policies. Adapt it with the clinical governance and infection-prevention
              teams before real-world use. In an emergency, activate the local emergency pathway immediately.
            </p>
          </div>
        </section>

        {/* Patient / encounter details */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <UserRound className="h-5 w-5 text-emerald-700" />
            <div>
              <h2 className="font-bold">Patient & review details</h2>
              <p className="text-xs text-slate-500">Fill these in before checklist sign-off.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              Patient name
              <input
                value={patientName}
                onChange={(event) => setPatientName(event.target.value)}
                placeholder="Enter patient name"
                className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              Patient ID / MRN
              <input
                value={patientId}
                onChange={(event) => setPatientId(event.target.value)}
                placeholder="Enter medical record ID"
                className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              Encounter type
              <select
                value={encounterType}
                onChange={(event) => setEncounterType(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option>Initial assessment</option>
                <option>Medication administration</option>
                <option>Specimen collection / test</option>
                <option>Procedure</option>
                <option>Transfer / handover</option>
                <option>Equipment use</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              Reviewer / staff member
              <input
                value={reviewer}
                onChange={(event) => setReviewer(event.target.value)}
                placeholder="Enter reviewer name"
                className="rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Encounter selected: <span className="font-medium text-slate-700">{encounterType}</span>
          </p>
        </section>

        {/* Progress and stats */}
        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Checklist completion</p>
                <p className="mt-1 text-3xl font-bold">{completedCount} <span className="text-base font-medium text-slate-400">/ {allItems.length} checks</span></p>
              </div>
              <span className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${criticalComplete ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
                {criticalItems.filter((item) => checked[item.id]).length}/{criticalItems.length} critical checks
              </span>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>{progress}% completed</span>
              <span>{allItems.length - completedCount} remaining</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                <span className="text-xs font-medium">Critical checks</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{criticalItems.length}</p>
              <p className="mt-1 text-xs text-slate-500">Highlighted in each section</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <ClipboardCheck className="h-4 w-4 text-emerald-700" />
                <span className="text-xs font-medium">Sections</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{ruleSections.length}</p>
              <p className="mt-1 text-xs text-slate-500">Safety and procedure areas</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search a rule or procedure..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <select
            aria-label="Filter by section"
            value={activeSection}
            onChange={(event) => setActiveSection(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"
          >
            <option value="all">All sections</option>
            {ruleSections.map((section) => (
              <option key={section.id} value={section.id}>{section.title}</option>
            ))}
          </select>
          <label className="flex shrink-0 items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={showCriticalOnly}
              onChange={(event) => setShowCriticalOnly(event.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Critical checks only
          </label>
        </section>

        {/* Checklist sections */}
        <div className="space-y-4">
          {visibleSections.map((section) => {
            const Icon = section.icon;
            const completed = section.items.filter((item) => checked[item.id]).length;
            const isExpanded = expanded[section.id] ?? true;

            return (
              <section key={section.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((current) => ({
                      ...current,
                      [section.id]: !isExpanded,
                    }))
                  }
                  className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                  aria-expanded={isExpanded}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold">{section.title}</span>
                      <span className="mt-1 block text-sm leading-5 text-slate-500">{section.subtitle}</span>
                    </span>
                  </div>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      {completed}/{section.items.length}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </span>
                </button>

                {isExpanded && (
                  <div className="divide-y divide-slate-100 border-t border-slate-100">
                    {section.items.map((item) => (
                      <label
                        key={item.id}
                        className={`flex cursor-pointer items-start gap-3 px-4 py-4 transition hover:bg-slate-50 sm:px-5 ${checked[item.id] ? "bg-emerald-50/40" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(checked[item.id])}
                          onChange={(event) => toggleItem(item.id, event.target.checked)}
                          className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className={`text-sm font-semibold ${checked[item.id] ? "text-slate-500 line-through" : "text-slate-800"}`}>
                              {item.title}
                            </span>
                            {item.critical && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700">
                                <AlertTriangle className="h-3 w-3" />
                                Critical
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-slate-500">
                            {item.description}
                          </span>
                        </span>
                        {checked[item.id] && (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {visibleSections.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-3 font-semibold">No matching rules</p>
              <p className="mt-1 text-sm text-slate-500">Try another search or clear the filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveSection("all");
                  setShowCriticalOnly(false);
                }}
                className="mt-3 text-sm font-semibold text-emerald-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer reminder */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
            <div>
              <h3 className="font-semibold">Privacy & access control</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Restrict patient information to authorized staff, follow local privacy requirements, and avoid displaying identifiable patient data where it is not needed.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <Activity className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
            <div>
              <h3 className="font-semibold">Escalation always takes priority</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                A checklist must never delay urgent assessment or treatment. Escalate deterioration, uncertainty, equipment failure, or a mismatch using your facility's approved pathway.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Sign-off review dialog */}
      {showFinalize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b p-5">
              <div>
                <h2 className="text-lg font-bold">Review checklist</h2>
                <p className="mt-1 text-sm text-slate-500">Verify completion before sign-off.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowFinalize(false)}
                aria-label="Close sign-off dialog"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">All checklist items</span>
                  <strong>{completedCount}/{allItems.length}</strong>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Critical safety items</span>
                  <strong className={criticalComplete ? "text-emerald-700" : "text-red-700"}>
                    {criticalItems.filter((item) => checked[item.id]).length}/{criticalItems.length}
                  </strong>
                </div>
              </div>

              {!criticalComplete && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-800">
                  Some critical checks remain incomplete. Do not use this demo to bypass a required safety check. Follow the facility's escalation and exception process.
                </p>
              )}

              {completedCount !== allItems.length && (
                <p className="text-sm text-slate-500">
                  {allItems.length - completedCount} item(s) remain unchecked.
                </p>
              )}

              <p className="text-sm leading-6 text-slate-600">
                Sign-off records completion only in this page's current browser state. It does not verify that care was performed or save an auditable clinical record.
              </p>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowFinalize(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Go back
                </button>
                <button
                  type="button"
                  onClick={finalizeChecklist}
                  disabled={!criticalComplete || completedCount !== allItems.length}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Check className="h-4 w-4" />
                  Complete checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
