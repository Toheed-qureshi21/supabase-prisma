"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TodoSkeleton() {
  return (
    <Table className="table-auto border border-gray-300 w-full">
      <TableHeader>
        <TableRow className="bg-gray-100 border-b border-gray-300">
          <TableHead className="w-[200px] border-r border-gray-300 px-4 py-2">
            Title
          </TableHead>
          <TableHead className="border-r border-gray-300 px-4 py-2">
            Description
          </TableHead>
          <TableHead className="border-r border-gray-300 px-4 py-2">
            Status
          </TableHead>
          <TableHead className="text-center border-r border-gray-300 px-4 py-2">
            Date
          </TableHead>
          <TableHead className="text-center px-4 py-2">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 4 }).map((_, index) => (
          <TableRow
            key={index}
            className="border-t border-gray-300 animate-pulse"
          >
            <TableCell className="px-4 py-2 border-r border-gray-300">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </TableCell>
            <TableCell className="px-4 py-2 border-r border-gray-300">
              <div className="h-4 w-full bg-gray-200 rounded" />
            </TableCell>
            <TableCell className="px-4 py-2 border-r border-gray-300">
              <div className="h-8 w-[130px] bg-gray-200 rounded" />
            </TableCell>
            <TableCell className="px-4 py-2 text-center text-gray-600 border-r border-gray-300">
              <div className="space-y-1">
                <div className="h-3 w-1/2 bg-gray-200 mx-auto rounded" />
                <div className="h-3 w-2/3 bg-gray-200 mx-auto rounded" />
                <div className="h-3 w-1/3 bg-gray-200 mx-auto rounded" />
              </div>
            </TableCell>
            <TableCell className="text-center px-4 py-2">
              <div className="flex justify-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded" />
                <div className="h-8 w-8 bg-gray-200 rounded" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
