import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableAllbooks from "../components/TableAllbooks";

export default function AllBooksPage() {


  return (
    <div className="min-h-screen bg-white p-8 text-white">
      <TableAllbooks />
    </div>
  );
}