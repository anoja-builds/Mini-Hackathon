"use client";

export default function PickupTimeline({ status }) {
  const isPending = status === "Pending";
  const isScheduled = status === "Scheduled";
  const isCollected = status === "Collected";
  const isCancelled = status === "Cancelled";

  if (isCancelled) {
    return (
      <div
        style={{
          backgroundColor: "#fff1f2",
          border: "1px solid #fecdd3",
          borderRadius: "0.75rem",
          padding: "1rem",
          textAlign: "center",
          color: "#9f1239",
          fontSize: "0.85rem",
          fontWeight: "600"
        }}
      >
        ❌ <strong>Collection Cancelled</strong> — This pickup was marked as cancelled. Food was not retrieved.
      </div>
    );
  }

  const steps = [
    {
      id: 1,
      title: "Claimed",
      desc: "Donation claimed by org",
      done: true,
      active: isPending
    },
    {
      id: 2,
      title: "Scheduled",
      desc: "Driver & time slot locked",
      done: isScheduled || isCollected,
      active: isScheduled
    },
    {
      id: 3,
      title: "Collected",
      desc: "Food rescued & handed over",
      done: isCollected,
      active: isCollected
    }
  ];

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "0.75rem",
        padding: "1.25rem 1rem"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative"
        }}
      >
        {steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              textAlign: "center",
              position: "relative",
              zIndex: 2
            }}
          >
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "9999px",
                backgroundColor: step.done
                  ? "#059669"
                  : step.active
                  ? "#2563eb"
                  : "#cbd5e1",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "0.875rem",
                boxShadow: step.active ? "0 0 0 4px #dbeafe" : "none",
                marginBottom: "0.5rem",
                transition: "all 0.2s ease"
              }}
            >
              {step.done && !step.active ? "✓" : step.id}
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: step.active || step.done ? "700" : "500",
                color: step.active ? "#1e40af" : step.done ? "#065f46" : "#64748b"
              }}
            >
              {step.title}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#94a3b8",
                marginTop: "0.15rem",
                display: "none"
              }}
              className="timeline-subtext"
            >
              {step.desc}
            </span>
          </div>
        ))}

        {/* Connecting bar */}
        <div
          style={{
            position: "absolute",
            top: "1.125rem",
            left: "15%",
            right: "15%",
            height: "3px",
            backgroundColor: isCollected ? "#059669" : isScheduled ? "#60a5fa" : "#e2e8f0",
            zIndex: 1
          }}
        />
      </div>
    </div>
  );
}

