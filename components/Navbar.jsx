"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RainbowButton } from './magicui/rainbow-button'
import { useRouter } from 'next/navigation'

function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full fixed top-0  bg-black  z-50 backdrop-blur-md">
      <nav className="container mx-auto px-4 h-16 flex justify-between w-full p-2 items-center">
        <Link href="/">
          <Image
            src="/logo2.svg"
            alt="logo"
            height={200}
            width={200}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>
        <div className="flex  gap-3">
          {/* <SignedIn> */}
            {/* <Link href={"/dashboard"}>
              <Button>
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link> */}

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/resume"} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className=" md:block">Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    <span className=" md:block">Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/interview"} className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className=" md:block">Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          {/* </SignedIn> */}
          {/* <SignedOut> */}
            {/* <SignInButton> */}
              {/* <Button variant={"outline"}>Sign In</Button> */}
              <RainbowButton variant="outline" onClick={() => router.push('/resume')}>Start Creating</RainbowButton>
            {/* </SignInButton> */}
          {/* </SignedOut> */}
          {/* <SignedIn> */}
            {/* <UserButton /> */}
          {/* </SignedIn> */}
        </div>
      </nav>
    </div>
  )
}

export default Navbar