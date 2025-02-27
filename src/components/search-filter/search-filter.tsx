"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

interface SearchAndFilterProps {
  initialUsers: User[];
}

export default function SearchAndFilter({
  initialUsers,
}: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return initialUsers.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (dateFilter === "all") return true;

      const today = new Date();
      const userDate = new Date(user.createdAt);

      switch (dateFilter) {
        case "today":
          return (
            userDate.getDate() === today.getDate() &&
            userDate.getMonth() === today.getMonth() &&
            userDate.getFullYear() === today.getFullYear()
          );
        case "thisWeek":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return userDate >= weekAgo;
        case "thisMonth":
          return (
            userDate.getMonth() === today.getMonth() &&
            userDate.getFullYear() === today.getFullYear()
          );
        default:
          return true;
      }
    });
  }, [initialUsers, searchTerm, dateFilter]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="search">Search Users</Label>
          <Input
            id="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Filter by Join Date</Label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select a date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {format(new Date(user.createdAt), "PPP")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center py-4 text-muted-foreground">
            No users found matching your criteria
          </p>
        )}
      </div>
    </div>
  );
}
