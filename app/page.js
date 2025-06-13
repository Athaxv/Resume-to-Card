"use client"
import HomePage from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState()
  return (
    <div>
      <Navbar/>
      <HomePage/>
    </div>
  );
}
