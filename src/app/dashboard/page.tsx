"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "../../components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, User } from "lucide-react"
import Link from "next/link"
import { mockCurrentUserProfile } from "../../lib/mock-data"

export default function Dashboard() {
  const [profileData, setProfileData] = useState(mockCurrentUserProfile)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const profileComplete = profileData && profileData.name && profileData.program && profileData.resumeUrl

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Status</CardTitle>
            <CardDescription>Your profile information and resume status</CardDescription>
          </CardHeader>
          <CardContent>
            {!profileComplete && (
              <Alert className="mb-4">
                <AlertDescription>
                  Your profile is incomplete. Please complete your profile and upload your resume to be visible to
                  sponsors.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Profile Information</span>
                </div>
                <span className={profileData?.name ? "text-green-500" : "text-amber-500"}>
                  {profileData?.name ? "Complete" : "Incomplete"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Resume</span>
                </div>
                <span className={profileData?.resumeUrl ? "text-green-500" : "text-amber-500"}>
                  {profileData?.resumeUrl ? "Uploaded" : "Not Uploaded"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/profile">{profileComplete ? "Update Profile" : "Complete Profile"}</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume Visibility</CardTitle>
            <CardDescription>Who can see your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Your resume is visible to approved sponsors from companies looking to hire University of Toronto Computer
              Science students.
            </p>

            {profileComplete ? (
              <Alert>
                <AlertDescription className="text-green-500">
                  Your resume is currently visible to sponsors.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <AlertDescription className="text-amber-500">
                  Your resume will be visible to sponsors once you complete your profile.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            {profileData?.resumeUrl ? (
              <Button variant="outline" asChild className="w-full">
                <Link href="/profile">
                  <Upload className="mr-2 h-4 w-4" />
                  Update Resume
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/profile">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
