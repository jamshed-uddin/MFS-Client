"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Toggler from "./Toggler";

export default function UserFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL or set defaults
  const [role, setRole] = useState(searchParams.get("role") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [activeOnly, setActiveOnly] = useState(
    searchParams.get("activeOnly") === "true"
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (role) params.set("role", role);
    if (status) params.set("status", status);
    if (activeOnly) params.set("activeOnly", "true");

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [role, status, activeOnly, router]);

  // Clear all filters
  const clearFilters = () => {
    setRole("");
    setStatus("");
    setActiveOnly(false);
    router.push(window.location.pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-lg items-center">
      <div className="flex flex-col gap-2">
        <select
          className="select select-sm select-bordered w-full max-w-xs bg-inherit"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <select
          className="select select-sm select-bordered w-full max-w-xs bg-inherit"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex  gap-2">
        <label className="text-sm font-medium">Active Only</label>
        <div className="flex items-center gap-2">
          <Toggler
            isChecked={activeOnly}
            onToggle={(checked) => setActiveOnly(checked)}
          />
        </div>
      </div>

      <div className="flex flex-col justify-end">
        <button onClick={clearFilters} className="btn btn-sm btn-outline">
          Clear Filters
        </button>
      </div>
    </div>
  );
}
