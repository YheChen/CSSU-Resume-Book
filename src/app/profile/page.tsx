"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "../../components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, FileText, Upload } from "lucide-react"
import { mockCurrentUserProfile } from "../../lib/mock-data"

export default function Profile() {
  const [formData, setFormData] = useState({
    name: mockCurrentUserProfile.name,
    university: mockCurrentUserProfile.university,
    program: mockCurrentUserProfile.program,
    year: mockCurrentUserProfile.year,
    email: mockCurrentUserProfile.email,
    phone: mockCurrentUserProfile.phone || "",
    resumeUrl: mockCurrentUserProfile.resumeUrl,
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeFileName, setResumeFileName] = useState<string | null>("resume.pdf")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file type
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB")
        return
      }

      setResumeFile(file)
      setResumeFileName(file.name)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Simulate saving
    setLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Profile Information</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile information and resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500 text-green-500">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Profile updated successfully</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University *</Label>
              <Input
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                disabled
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Program *</Label>
              <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Computer Science (AI)">Computer Science (AI)</SelectItem>
                  <SelectItem value="Computer Science (Software Engineering)">
                    Computer Science (Software Engineering)
                  </SelectItem>
                  <SelectItem value="Computer Science (Theory)">Computer Science (Theory)</SelectItem>
                  <SelectItem value="Computer Science (HCI)">Computer Science (HCI)</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Bioinformatics">Bioinformatics</SelectItem>
                  <SelectItem value="Mathematics and Computer Science">Mathematics and Computer Science</SelectItem>
                  <SelectItem value="Statistics and Computer Science">Statistics and Computer Science</SelectItem>
                  <SelectItem value="Cognitive Science">Cognitive Science</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year of Study *</Label>
              <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                  <SelectItem value="5+">5+ Year</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF) *</Label>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" onClick={() => document.getElementById("resume")?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  {resumeFileName ? "Change Resume" : "Upload Resume"}
                </Button>
                <input id="resume" type="file" accept=".pdf" onChange={handleResumeChange} className="hidden" />
                {resumeFileName && (
                  <div className="flex items-center text-sm">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{resumeFileName}</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Max file size: 5MB. PDF format only.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  )
}
