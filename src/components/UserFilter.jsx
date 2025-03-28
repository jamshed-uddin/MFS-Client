"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Toggler from "./Toggler";

export default function UserFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Clear all filters
  const clearFilters = () => {
    window.history.replaceState(null, "", `/wallet/users`);
  };

  const setQueryToUrl = (e) => {
    const params = new URLSearchParams(searchParams);
    const { name, value } = e.target;

    if (name === value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    window.history.replaceState(null, "", `/wallet/users?${params.toString()}`);
  };
  const setActiveOnly = (checked) => {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set("isActive", checked);
    } else {
      params.delete("isActive");
    }

    window.history.replaceState(null, "", `/wallet/users?${params.toString()}`);
  };

  return (
    <div className="flex  gap-4 flex-nowrap overflow-x-auto items-center">
      <div className="flex flex-col gap-2">
        <select
          className="selectStyle"
          name="role"
          onChange={setQueryToUrl}
          defaultValue={searchParams.get("role")}
        >
          <option value="role">Select Role</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        <select
          className="selectStyle"
          name="status"
          onChange={setQueryToUrl}
          defaultValue={searchParams.get("status")}
        >
          <option value="status">Select Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex  gap-2 shrink-0">
        <label className="text-sm font-medium">Active Only</label>
        <div className="flex items-center gap-2">
          <Toggler
            isChecked={searchParams.get("isActive") === "true"}
            onToggle={(checked) => setActiveOnly(checked)}
          />
        </div>
      </div>

      <div className="flex flex-col justify-end shrink-0">
        <button
          onClick={clearFilters}
          className="rounded-lg font-medium px-3 py-[3px] border border-blue-600"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
