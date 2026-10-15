"use client"

import { useMemo, useState } from "react"
import {
  Bell,
  Building2,
  Check,
  ChevronRight,
  Globe,
  KeyRound,
  LockKeyhole,
  Save,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react"

type SettingsSection =
  | "profile"
  | "organization"
  | "notifications"
  | "security"
  | "roles"
  | "clinical"

type ToggleSettingProps = {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}: ToggleSettingProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  )
}

const sections: {
  id: SettingsSection
  label: string
  description: string
  icon: typeof UserRound
}[] = [
  { id: "profile", label: "My profile", description: "Personal information", icon: UserRound },
  { id: "organization", label: "Organization", description: "Facility details", icon: Building2 },
  { id: "notifications", label: "Notifications", description: "Email and in-app alerts", icon: Bell },
  { id: "security", label: "Security & privacy", description: "Sign-in and session controls", icon: ShieldCheck },
  { id: "roles", label: "Roles & permissions", description: "Access by user role", icon: Users },
  { id: "clinical", label: "Clinical settings", description: "Workflow preferences", icon: Stethoscope },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")
  const [savedMessage, setSavedMessage] = useState("")
  const [profile, setProfile] = useState({
    fullName: "Ankur Singh",
    email: "ankur@example.com",
    phone: "+91 98765 43210",
    jobTitle: "System Administrator",
  })
  const [organization, setOrganization] = useState({
    name: "CarePoint Medical Center",
    email: "admin@carepoint.example",
    phone: "+91 20 4000 1234",
    timezone: "Asia/Kolkata",
    language: "English",
  })
  const [notifications, setNotifications] = useState({
    emailSecurity: true,
    clinicalOrders: true,
    patientUpdates: true,
    weeklySummary: false,
    productUpdates: false,
  })
  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionAlerts: true,
    autoLogout: true,
  })
  const [clinical, setClinical] = useState({
    requirePatientId: true,
    requireConsent: true,
    requireOrderApproval: true,
    safetyChecklist: true,
  })
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [defaultLanding, setDefaultLanding] = useState("dashboard")
  const [defaultRole, setDefaultRole] = useState("DOCTOR")
  const [permissions, setPermissions] = useState({
    viewPatients: true,
    editPatientRecords: false,
    manageClinicalOrders: true,
    manageUsers: false,
    viewAuditLogs: false,
  })

  const currentSection = useMemo(
    () => sections.find((section) => section.id === activeSection),
    [activeSection]
  )

  const updateProfile = (key: keyof typeof profile, value: string) =>
    setProfile((current) => ({ ...current, [key]: value }))
  const updateOrganization = (key: keyof typeof organization, value: string) =>
    setOrganization((current) => ({ ...current, [key]: value }))

  function saveSettings() {
    // Connect this handler to your authenticated settings API to persist changes.
    setSavedMessage("Your changes are ready. Connect the Save action to your settings API to persist them.")
    window.setTimeout(() => setSavedMessage(""), 4500)
  }

  return (
    <main className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Administration</span>
              <ChevronRight className="size-4" />
              <span className="text-slate-700">Settings</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your account, organization, security, and clinical workflows.
            </p>
          </div>
          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="size-4" />
            Save changes
          </button>
        </div>

        {savedMessage && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800"
          >
            <Check className="mt-0.5 size-4 shrink-0" />
            <span>{savedMessage}</span>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Preferences
            </p>
            <nav className="space-y-1" aria-label="Settings sections">
              {sections.map((section) => {
                const Icon = section.icon
                const active = activeSection === section.id
                return (
                  <button
                    type="button"
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg border-l-2 px-3 py-3 text-left transition ${
                      active
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`size-4 shrink-0 ${active ? "text-blue-600" : "text-slate-400"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{section.label}</span>
                      <span className={`mt-0.5 block text-xs ${active ? "text-blue-600/80" : "text-slate-400"}`}>
                        {section.description}
                      </span>
                    </span>
                    {active && <ChevronRight className="size-4 shrink-0" />}
                  </button>
                )
              })}
            </nav>
            <div className="mx-2 mb-2 mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                <LockKeyhole className="size-4" />
                Account protected
              </div>
              <p className="mt-1 text-xs leading-5 text-emerald-700">
                Keep access permissions and security preferences up to date.
              </p>
            </div>
          </aside>

          <section className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-slate-900">
                {currentSection?.label}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {currentSection?.description}
              </p>
            </div>

            <div className="divide-y divide-slate-100 px-5 sm:px-6">
              {activeSection === "profile" && (
                <div className="space-y-5 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                      {profile.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{profile.fullName}</p>
                      <p className="mt-1 text-sm text-slate-500">{profile.jobTitle}</p>
                      <p className="mt-1 text-xs text-slate-400">Profile photo upload can be connected to your file storage.</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" value={profile.fullName} onChange={(value) => updateProfile("fullName", value)} />
                    <Field label="Job title" value={profile.jobTitle} onChange={(value) => updateProfile("jobTitle", value)} />
                    <Field label="Email address" type="email" value={profile.email} onChange={(value) => updateProfile("email", value)} />
                    <Field label="Phone number" value={profile.phone} onChange={(value) => updateProfile("phone", value)} />
                  </div>
                </div>
              )}

              {activeSection === "organization" && (
                <div className="space-y-5 py-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Organization name" value={organization.name} onChange={(value) => updateOrganization("name", value)} />
                    <Field label="Contact email" type="email" value={organization.email} onChange={(value) => updateOrganization("email", value)} />
                    <Field label="Contact phone" value={organization.phone} onChange={(value) => updateOrganization("phone", value)} />
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">Time zone</span>
                      <select value={organization.timezone} onChange={(event) => updateOrganization("timezone", event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                        <option value="Asia/Kolkata">India Standard Time (IST)</option>
                        <option value="UTC">Coordinated Universal Time (UTC)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="Europe/London">United Kingdom (GMT/BST)</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">Language</span>
                      <select value={organization.language} onChange={(event) => updateOrganization("language", event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                        <option>English</option>
                        <option>Hindi</option>
                      </select>
                    </label>
                  </div>
                  <p className="text-xs text-slate-400">Organization details are sample values. Load these from your organization settings API in production.</p>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="divide-y divide-slate-100 py-1">
                  <div className="py-4">
                    <h3 className="text-sm font-semibold text-slate-800">Email and in-app notifications</h3>
                    <p className="mt-1 text-sm text-slate-500">Choose which events should generate notifications for your account.</p>
                  </div>
                  <ToggleSetting title="Security alerts" description="Sign-in attempts and important account changes." checked={notifications.emailSecurity} onChange={(checked) => setNotifications((s) => ({ ...s, emailSecurity: checked }))} />
                  <ToggleSetting title="Clinical order updates" description="When orders are submitted, approved, or change status." checked={notifications.clinicalOrders} onChange={(checked) => setNotifications((s) => ({ ...s, clinicalOrders: checked }))} />
                  <ToggleSetting title="Patient record updates" description="Relevant changes to patient records and care workflows." checked={notifications.patientUpdates} onChange={(checked) => setNotifications((s) => ({ ...s, patientUpdates: checked }))} />
                  <ToggleSetting title="Weekly activity summary" description="A weekly overview of activity and outstanding items." checked={notifications.weeklySummary} onChange={(checked) => setNotifications((s) => ({ ...s, weeklySummary: checked }))} />
                  <ToggleSetting title="Product announcements" description="New features and service announcements." checked={notifications.productUpdates} onChange={(checked) => setNotifications((s) => ({ ...s, productUpdates: checked }))} />
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-5 py-6">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="flex gap-3">
                      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-amber-700" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900">Security recommendations</p>
                        <p className="mt-1 text-sm leading-5 text-amber-800">Use multi-factor authentication and review access regularly. These switches are UI preferences until connected to your authentication service.</p>
                      </div>
                    </div>
                  </div>
                  <ToggleSetting title="Two-factor authentication" description="Require a second verification step at sign-in." checked={security.twoFactor} onChange={(checked) => setSecurity((s) => ({ ...s, twoFactor: checked }))} />
                  <ToggleSetting title="Sign-in alerts" description="Notify me about new or unusual sign-in activity." checked={security.sessionAlerts} onChange={(checked) => setSecurity((s) => ({ ...s, sessionAlerts: checked }))} />
                  <ToggleSetting title="Automatic session timeout" description="Sign out after a period of inactivity." checked={security.autoLogout} onChange={(checked) => setSecurity((s) => ({ ...s, autoLogout: checked }))} />
                  <label className="block max-w-sm">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Session timeout</span>
                    <select value={sessionTimeout} onChange={(event) => setSessionTimeout(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="120">2 hours</option>
                    </select>
                  </label>
                  <button type="button" onClick={() => setSavedMessage("Connect password changes to your authentication provider.")} className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    <KeyRound className="size-4" /> Change password
                  </button>
                </div>
              )}

              {activeSection === "roles" && (
                <div className="space-y-5 py-6">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <div className="flex gap-3">
                      <Users className="mt-0.5 size-5 shrink-0 text-blue-700" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">Role-based access control</p>
                        <p className="mt-1 text-sm leading-5 text-blue-800">Use these controls as a UI preview. Enforce all permissions on the backend; hiding a frontend control is not access control.</p>
                      </div>
                    </div>
                  </div>
                  <label className="block max-w-sm">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Preview role</span>
                    <select value={defaultRole} onChange={(event) => setDefaultRole(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option value="ADMIN">Admin</option>
                      <option value="DOCTOR">Doctor</option>
                      <option value="SUPERVISOR">Supervisor</option>
                      <option value="PATIENT">Patient</option>
                    </select>
                  </label>
                  <div className="rounded-lg border border-slate-200">
                    {([
                      ["viewPatients", "View patient records", "Read patient information."],
                      ["editPatientRecords", "Edit patient records", "Create or update patient information."],
                      ["manageClinicalOrders", "Manage clinical orders", "Create and update clinical orders."],
                      ["manageUsers", "Manage users", "Invite users and update their roles."],
                      ["viewAuditLogs", "View audit logs", "Review security and activity events."],
                    ] as const).map(([key, title, description]) => (
                      <div key={key} className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 last:border-b-0">
                        <div className="py-3">
                          <p className="text-sm font-medium text-slate-800">{title}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={permissions[key]}
                          onChange={(event) => setPermissions((s) => ({ ...s, [key]: event.target.checked }))}
                          aria-label={title}
                          className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">Selected role: {defaultRole}. Persist role assignments and permissions through a protected administrator API.</p>
                </div>
              )}

              {activeSection === "clinical" && (
                <div className="divide-y divide-slate-100 py-1">
                  <div className="py-4">
                    <h3 className="text-sm font-semibold text-slate-800">Clinical workflow safeguards</h3>
                    <p className="mt-1 text-sm text-slate-500">Configure workflow checks for your facility. Confirm clinical and regulatory requirements with your organization before enabling these in production.</p>
                  </div>
                  <ToggleSetting title="Require patient identification" description="Prompt staff to verify patient identifiers before recording care." checked={clinical.requirePatientId} onChange={(checked) => setClinical((s) => ({ ...s, requirePatientId: checked }))} />
                  <ToggleSetting title="Require consent confirmation" description="Include consent confirmation in applicable workflows." checked={clinical.requireConsent} onChange={(checked) => setClinical((s) => ({ ...s, requireConsent: checked }))} />
                  <ToggleSetting title="Require clinical order approval" description="Require an authorized review before an order proceeds." checked={clinical.requireOrderApproval} onChange={(checked) => setClinical((s) => ({ ...s, requireOrderApproval: checked }))} />
                  <ToggleSetting title="Safety checklist confirmation" description="Prompt staff to complete relevant patient-safety checks." checked={clinical.safetyChecklist} onChange={(checked) => setClinical((s) => ({ ...s, safetyChecklist: checked }))} />
                  <label className="block py-4">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Default landing page</span>
                    <select value={defaultLanding} onChange={(event) => setDefaultLanding(event.target.value)} className="h-10 w-full max-w-sm rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option value="dashboard">Dashboard</option>
                      <option value="patients">Patients</option>
                      <option value="clinical-orders">Clinical orders</option>
                      <option value="safety">Patient safety</option>
                    </select>
                  </label>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-slate-400">
                <Globe className="mr-1 inline size-3.5" />
                Settings shown here are local demo state.
              </p>
              <button
                type="button"
                onClick={saveSettings}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Save className="size-4" />
                Save changes
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
